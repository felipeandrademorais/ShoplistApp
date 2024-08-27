import { SQLiteProvider } from "expo-sqlite/next";
import { MenuProvider } from "react-native-popup-menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { AppProvider } from "./src/context/provider";
import { initializeDatabase } from "./src/database/initializeDatabase";
import Routes from "./src/routes";

export default function App() {
    return (
        <GestureHandlerRootView className="flex-1">
            <SQLiteProvider
                databaseName="database.db"
                onInit={initializeDatabase}
            >
                <AppProvider>
                    <MenuProvider>
                        <NavigationContainer>
                            <Routes />
                        </NavigationContainer>
                    </MenuProvider>
                </AppProvider>
            </SQLiteProvider>
        </GestureHandlerRootView>
    );
}
