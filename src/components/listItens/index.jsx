import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import {
    fetchData,
    subscribeToData,
    unsubscribe,
} from "../../services/SupabaseService";
import { Item, EmptyItens } from "../item";

export const ListItens = () => {
    const [itens, setItens] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchItens();
        const subscription = subscribeToData("lists", setItens);
        // return () => {
        //     unsubscribe(subscription);
        // };
    }, []);

    const fetchItens = async () => {
        setIsLoading(true);
        try {
            const data = await fetchData("lists", {});
            setItens(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-1 mt-6">
            {isLoading ? (
                <ActivityIndicator size="large" color="#FBF9FE" />
            ) : (
                <FlatList
                    data={itens}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Item {...item} />}
                    ListEmptyComponent={<EmptyItens />}
                    className="flex-1"
                />
            )}
        </View>
    );
};
