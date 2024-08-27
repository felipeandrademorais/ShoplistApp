import { ImageBackground, Text, View, SafeAreaView } from "react-native";
import { Add } from "../../components/add";
import { Modal } from "../../components/modal";
import { Somatorio } from "../../components/somatorio";
import { ListItens } from "../../components/listItens";
import OfflineMessage from "../../components/offline";
import Cover from "../../../assets/cover.png";

export default function Main() {
    return (
        <ImageBackground
            className="flex-1 bg-gray-600"
            source={Cover}
            resizeMode="contain"
        >
            <SafeAreaView className="flex-1">
                <View className="flex-1 px-4 relative">
                    <OfflineMessage />
                    <Text className="w-100 mt-5 text-2xl font-bold text-gray-100">
                        Lista de Compras
                    </Text>
                    <Somatorio />
                    <Add />
                    <ListItens />
                </View>
                <Modal />
            </SafeAreaView>
        </ImageBackground>
    );
}
