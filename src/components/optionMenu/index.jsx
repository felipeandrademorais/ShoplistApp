import { View } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import { PropTypes } from "prop-types";
import { removeData } from "../../services/SupabaseService";

export const OptionMenu = ({ item }) => {
    const onDelete = (id) => {
        removeData("lists", id);
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
            <MenuOptions
                optionsContainerStyle={{
                    width: 130,
                    marginTop: 10,
                    padding: 5,
                    height: 45,
                    borderRadius: 6,
                    backgroundColor: "#252525",
                }}
            >
                <MenuOption
                    customStyles={{
                        optionText: {
                            color: "#FBF9FE",
                            fontSize: 18,
                            fontWeight: "bold",
                            textAlign: "left",
                            marginTop: "auto",
                        },
                    }}
                    onSelect={() => onDelete(item.id)}
                    text="Excluir"
                />
            </MenuOptions>
        </Menu>
    );
};

OptionMenu.propTypes = {
    item: PropTypes.object,
};
