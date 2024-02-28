import { View, Text } from "react-native";
import { Checkbox } from "../checkbox";
import { IconsUtil } from "../../util/IconsUtil";
import { OptionMenu } from "../optionMenu";
import { formatarValor } from "../../util/ValorUtil";

export const Item = (item) => {
    return (
        <View
            className={`justify-between items-center flex-row border  rounded-lg px-4 py-3 my-1 ${
                item.checked
                    ? "bg-gray-500 border-gray-200/10"
                    : "bg-gray-400 border-gray-200/20"
            }`}
        >
            <Checkbox item={item} />
            <View className="flex-auto">
                <Text
                    className={`text-lg font-bold ${
                        item.checked
                            ? "line-through text-gray-200"
                            : "text-white"
                    }`}
                >
                    {item.title}
                </Text>
                <Text className={`text-xs text-white `}>
                    {item.quantity +
                        (item.quantity > 1 ? " unidades " : " unidade ")}
                    x {formatarValor(item.valor)}
                </Text>
            </View>
            <View className="flex-auto">
                <Text className={`text-xs text-white text-right`}>
                    {formatarValor(item.total)}
                </Text>
            </View>
            {IconsUtil(item.category, item.checked)}
            <OptionMenu item={item} />
        </View>
    );
};

export const EmptyItens = () => {
    return (
        <View className="flex-1 justify-between items-center flex-row rounded-lg px-4 py-3 my-2">
            <Text className="text-white text-center">
                Nenhum item adicionado até o momento
            </Text>
        </View>
    );
};
