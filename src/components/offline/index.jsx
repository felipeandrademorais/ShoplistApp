import { useContext } from "react";
import { View, Text } from "react-native";
import { AppContext } from "../../context";

const OfflineMessage = () => {
    const { isConnected } = useContext(AppContext);

    if (isConnected) {
        return null;
    }

    return (
        <View className="w-full bg-gray-500 py-1">
            <Text className="text-md text-center text-red-500 font-bold">
                Você está offline!
            </Text>
        </View>
    );
};

export default OfflineMessage;
