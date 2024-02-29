import { useContext } from "react";
import { View, Alert } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import { PropTypes } from "prop-types";
import { removeData } from "../../services/SupabaseService";
import { AppContext } from "../../context";

export const OptionMenu = ({ item }) => {
    const { setForm, openModal } = useContext(AppContext);

    const onDelete = (id) => {
        Alert.alert(
            "Confirmação",
            "Tem certeza de que deseja excluir este item?",
            [
                {
                    text: "Cancelar",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    onPress: () => removeData("lists", id),
                    style: "destructive",
                },
            ],
            { cancelable: false }
        );
    };

    const onEdit = (item) => {
        const { title, quantity, category, valor } = item;
        setForm({
            id: item.id,
            title,
            quantity: quantity.toString(),
            category,
            valor: valor.toString(),
        });
        openModal();
    };

    const optionTextStyles = {
        color: "#FBF9FE",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        marginTop: 10,
        marginBottom: 10,
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
                    borderRadius: 6,
                    backgroundColor: "#252525",
                }}
            >
                {!item.checked && (
                    <MenuOption
                        customStyles={{
                            optionText: optionTextStyles,
                        }}
                        onSelect={() => onEdit(item)}
                        text="Editar"
                    />
                )}
                <MenuOption
                    customStyles={{
                        optionText: { ...optionTextStyles, color: "#cc3300" },
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
