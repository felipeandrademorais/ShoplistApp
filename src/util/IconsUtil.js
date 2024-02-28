import { View } from "react-native";
import { Milk, Beef, Carrot, Sandwich, Apple } from "lucide-react-native";

export const IconsUtil = (name, disabled) => {
    const icons = {
        Apple: (
            <View className="bg-orange/10 rounded-full mx-4 p-2">
                <Apple
                    size={20}
                    className={`text-orange ${
                        disabled ?? "shadow shadow-orange"
                    }`}
                />
            </View>
        ),
        Milk: (
            <View className="bg-blue/10 rounded-full mx-4 p-2">
                <Milk
                    size={20}
                    className={`text-blue ${disabled ?? "shadow shadow-blue"}`}
                />
            </View>
        ),

        Carrot: (
            <View className="bg-green/10 rounded-full mx-4 p-2">
                <Carrot
                    size={20}
                    className={`text-green ${
                        disabled ?? "shadow shadow-green"
                    }`}
                />
            </View>
        ),
        Beef: (
            <View className="bg-pink/10 rounded-full mx-4 p-2">
                <Beef
                    size={20}
                    className={`text-pink ${disabled ?? "shadow shadow-pink"}`}
                />
            </View>
        ),
        Sandwich: (
            <View className="bg-yellow/10 rounded-full mx-4 p-2">
                <Sandwich
                    size={20}
                    className={`text-yellow ${
                        disabled ?? "shadow shadow-yellow"
                    }`}
                />
            </View>
        ),
    };

    return icons[name] || icons.Carrot;
};
