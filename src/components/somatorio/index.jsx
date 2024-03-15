import { useContext } from "react";
import { View, Text } from "react-native";
import { AppContext } from "../../context";
import { formatarValor } from "../../util/ValorUtil";

export const Somatorio = () => {
    const { itens } = useContext(AppContext);
    const total =
        Array.isArray(itens) && itens.length > 0
            ? itens.reduce((acc, item) => acc + Number(item.total), 0)
            : 0;

    if (total > 0) {
        return (
            <View className="flex-row justify-between mt-4">
                <Text className="text-white">Total</Text>
                <Text className="text-white">{formatarValor(total)}</Text>
            </View>
        );
    }
};
