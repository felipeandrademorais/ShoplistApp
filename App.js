import Main from "./src/main";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "./src/context/provider";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {
    return (
        <GestureHandlerRootView className="flex-1">
            <AppProvider>
                <MenuProvider>
                    <Main />
                </MenuProvider>
            </AppProvider>
        </GestureHandlerRootView>
    );
}
