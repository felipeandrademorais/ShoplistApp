import { useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { AppContext } from "../../context";
import { sortItemsByChecked } from "../../util/DataUtil";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export function useSupabase() {
    const fetchData = async (tableName, queryOptions) => {
        const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .match(queryOptions);
        if (error) throw new Error(error.message);
        return sortItemsByChecked(data);
    };

    const saveData = async (tableName, data) => {
        const { error } = await supabase.from(tableName).insert([data]);
        if (error) throw new Error(error.message);
    };

    const updateData = async (tableName, data, id) => {
        const { error } = await supabase
            .from(tableName)
            .update(data)
            .match({ id });
        if (error) throw new Error(error.message);
    };

    const removeData = async (tableName, id) => {
        const { error } = await supabase.from(tableName).delete().match({ id });
        if (error) throw new Error(error.message);
    };

    const subscribeToData = async (tableName, setItens) => {
        return supabase
            .channel(tableName)
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public" },
                (payload) => {
                    setItens((currentItems) =>
                        sortItemsByChecked([...currentItems, payload.new])
                    );
                }
            )
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public" },
                (payload) => {
                    setItens((currentItems) =>
                        sortItemsByChecked(
                            currentItems.map((item) =>
                                item.id === payload.new.id ? payload.new : item
                            )
                        )
                    );
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "public" },
                (payload) => {
                    setItens((currentItems) =>
                        sortItemsByChecked(
                            currentItems.filter(
                                (item) => item.id !== payload.old.id
                            )
                        )
                    );
                }
            )
            .subscribe();
    };

    const unsubscribe = async (subscription) => {
        supabase.removeSubscription(subscription);
    };

    return {
        saveData,
        updateData,
        fetchData,
        subscribeToData,
        removeData,
        unsubscribe,
    };
}
