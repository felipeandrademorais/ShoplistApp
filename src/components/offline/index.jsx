import React from "react";
import { View, Text } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

const OfflineMessage = () => {
    const netInfo = useNetInfo();

    if (netInfo.isConnected && netInfo.isInternetReachable) {
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
