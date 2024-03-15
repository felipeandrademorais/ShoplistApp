import { useContext } from "react";
import { useSupabase } from "../SupabaseService";
import { AppContext } from "../../context";

export function useDatabase() {
    const supabase = useSupabase();
    const { itens, setItens } = useContext(AppContext);

    const fetchData = async (tableName, queryOptions) => {
        const data = await supabase.fetchData(tableName, queryOptions);
        setItens(data);
    };

    const saveData = async (tableName, data) => {
        const lastItemId = itens.reduce(
            (maxId, item) => Math.max(maxId, item.id),
            0
        );
        const newData = { ...data, id: lastItemId + 1 };
        setItens([...itens, newData]);
        return await supabase.saveData(tableName, data);
    };

    const updateData = async (tableName, data, id) => {
        setItens(
            itens.map((item) => (item.id === id ? { ...item, ...data } : item))
        );
        return await supabase.updateData(tableName, data, id);
    };

    const removeData = async (tableName, id) => {
        setItens(itens.filter((item) => item.id !== id));
        return await supabase.removeData(tableName, id);
    };

    const subscribeToData = async (tableName, setItens) => {
        return await supabase.subscribeToData(tableName, setItens);
    };

    const unsubscribe = async (subscription) => {
        return await supabase.unsubscribe(subscription);
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
