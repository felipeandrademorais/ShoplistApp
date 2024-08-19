import Main from "./src/main";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "./src/context/provider";
import { MenuProvider } from "react-native-popup-menu";
import { SQLiteProvider } from "expo-sqlite/next";
import { initializeDatabase } from "./src/database/initializeDatabase";

export default function App() {
    return (
        <GestureHandlerRootView className="flex-1">
            <SQLiteProvider
                databaseName="database.db"
                onInit={initializeDatabase}
            >
                <AppProvider>
                    <MenuProvider>
                        <Main />
                    </MenuProvider>
                </AppProvider>
            </SQLiteProvider>
        </GestureHandlerRootView>
    );
}
