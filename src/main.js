import { useContext } from "react";
import {
    ImageBackground,
    Text,
    View,
    FlatList,
    SafeAreaView,
} from "react-native";
import { AppContext } from "./context";
import { Add } from "./components/add";
import { Item, EmptyItens } from "./components/item";
import { Modal } from "./components/modal";
import { Somatorio } from "./components/somatorio";
import Cover from "../assets/cover.png";

export default function Main() {
    const { itens } = useContext(AppContext);
    return (
        <ImageBackground
            className="flex-1 bg-gray-600"
            source={Cover}
            resizeMode="contain"
        >
            <SafeAreaView className="flex-1">
                <View className="flex-1 px-4 relative">
                    <Text className="w-100 mt-5 text-2xl font-bold text-gray-100">
                        Lista de Compras
                    </Text>
                    <Somatorio />
                    <Add />
                    <View className="flex-1 mt-6">
                        <FlatList
                            data={itens}
                            renderItem={({ item }) => <Item {...item} />}
                            keyExtractor={(item) => item.title}
                            ListEmptyComponent={<EmptyItens />}
                            className="flex-1"
                        />
                    </View>
                </View>
                <Modal />
            </SafeAreaView>
        </ImageBackground>
    );
}
