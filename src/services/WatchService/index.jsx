import { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { watchEvents } from "react-native-watch-connectivity";

export const WatchService = () => {
    const [messageFromWatch, setMessageFromWatch] = useState("Waiting...");

    const messageListener = () =>
        watchEvents.on("message", (message) => {
            setMessageFromWatch(message.watchMessage);
            console.log(message.watchMessage);
        });

    useEffect(() => {
        messageListener();
    }, []);

    return (
        <SafeAreaView>
            <Text>Received from Watch App!</Text>
            <Text>{messageFromWatch}</Text>
        </SafeAreaView>
    );
};
