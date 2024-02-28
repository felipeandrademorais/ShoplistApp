import { useContext } from "react";
import { View } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import { PropTypes } from "prop-types";
import { AppContext } from "../../context";

export const OptionMenu = ({ item }) => {
    const { setItens } = useContext(AppContext);

    const onDelete = (title) => {
        setItens((prev) => prev.filter((i) => i.title !== title));
    };

    return (
        <Menu>
            <MenuTrigger>
                <View className=" px-2 gap-1 flex-column content-center items-center">
                    <View className="w-1 h-1 bg-purple-light rounded-full" />
                    <View className="w-1 h-1 bg-purple-light rounded-full" />
                    <View className="w-1 h-1 bg-purple-light rounded-full" />
                </View>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={{ padding: 5 }}>
                <MenuOption
                    onSelect={() => onDelete(item.title)}
                    text="Excluir"
                />
            </MenuOptions>
        </Menu>
    );
};

OptionMenu.propTypes = {
    item: PropTypes.object,
};
