import { useEffect, useState, useContext } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import { fetchData, subscribeToData } from "../../services/SupabaseService";
import { Item, EmptyItens } from "../item";
import { AppContext } from "../../context";

export const ListItens = () => {
    const { itens, setItens } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchItens();
        subscribeToData("lists", setItens);
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
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Item {...item} />}
                    ListEmptyComponent={<EmptyItens />}
                    className="flex-1"
                />
            )}
        </View>
    );
};
