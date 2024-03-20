import { useEffect, useState, useContext } from "react";
import {
    FlatList,
    ActivityIndicator,
    View,
    RefreshControl,
} from "react-native";
import { useDatabase } from "../../services/DatabaseService";
import { Item, EmptyItens } from "../item";
import { AppContext } from "../../context";

export const ListItens = () => {
    const { itens, setItens } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const { fetchData, subscribeToData } = useDatabase();

    useEffect(() => {
        fetchItens();
        subscribeToData("lists", setItens);
    }, []);

    const fetchItens = async () => {
        setIsLoading(true);
        try {
            await fetchData("lists", {});
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
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={fetchItens}
                            progressBackgroundColor="#FBF9FE"
                            titleColor="#FBF9FE"
                            title="Refresh..."
                        />
                    }
                    className="flex-1"
                />
            )}
        </View>
    );
};
