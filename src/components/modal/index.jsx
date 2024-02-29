import { useContext } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import { Picker } from "@react-native-picker/picker";
import { AppContext } from "../../context";
import { InputComponent } from "../input";
import { MoneyInput } from "../moneyInput";
import { saveData, updateData } from "../../services/SupabaseService";

export const Modal = () => {
    const { modalRef, closeModal, form, setForm } = useContext(AppContext);
    const total =
        parseFloat(form.quantity || 1) * parseFloat(form.valor || 0).toFixed(2);

    const clearForm = () => {
        setForm({
            title: "",
            quantity: "",
            category: "",
            valor: "",
        });
    };

    const validateForm = () => {
        if (form.id == "") {
            delete form.id;
        }
        if (!form.title) {
            return "O campo item é obrigatório";
        }
        if (!form.valor) {
            return "O campo valor é obrigatório";
        }
        if (!form.quantity) {
            setForm({ ...form, quantity: 1 });
        }
        return "";
    };

    const handleSubmit = async () => {
        const newItem = {
            ...form,
            total: total,
        };

        const validation = validateForm();
        if (validation !== "") {
            return alert(validation);
        }

        closeModal();

        try {
            if (!form.id) {
                await saveData("lists", newItem);
            } else {
                await updateData("lists", newItem, form.id);
            }
        } catch (error) {
            console.log(error);
        }

        clearForm();
    };

    return (
        <Modalize
            ref={modalRef}
            modalHeight={800}
            scrollViewProps={{ showsVerticalScrollIndicator: false }}
            snapPoint={600}
            closeSnapPointStraightEnabled={false}
            modalStyle={{
                backgroundColor: "#1E1E1E",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
            onClosed={() => clearForm()}
        >
            <View className="flex-1 pt-10 px-5">
                <View className="flex-row justify-between items-center">
                    <InputComponent
                        label="Item"
                        placeholder="Ex: Banana"
                        value={form.title}
                        onChangeText={(text) =>
                            setForm({ ...form, title: text })
                        }
                    />
                    <MoneyInput
                        label="Valor Unitário"
                        placeholder="Ex: 3,50"
                        keyboardType="numeric"
                        value={form.valor}
                        onChangeText={(text) =>
                            setForm({ ...form, valor: text })
                        }
                    />
                </View>
                <View className="flex-row justify-between mt-4">
                    <View className="w-1/2 mr-3">
                        <View>
                            <Text className="text-white mb-2">Quantidade</Text>
                            <TextInput
                                className="h-12 text-white border rounded-lg text-sm p-2 border-gray-400/50 bg-gray-500"
                                placeholder="Ex: 2"
                                placeholderTextColor="#454545"
                                keyboardType="numeric"
                                value={form.quantity}
                                onChangeText={(text) =>
                                    setForm({ ...form, quantity: text })
                                }
                            />
                        </View>
                        <View className="mt-3">
                            <Text className="text-white mb-2">Total</Text>
                            <View className="h-12 rounded-lg p-2 bg-gray-500 items-center justify-center">
                                <Text className="text-white text-lg">
                                    {`R$ ${total.toFixed(2).replace(".", ",")}`}{" "}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className="w-1/2">
                        <Text className="text-white mb-2">Categoria</Text>

                        <Picker
                            selectedValue={form.category}
                            onValueChange={(itemValue, itemIndex) =>
                                setForm({ ...form, category: itemValue })
                            }
                            defaultValue="Carrot"
                            style={{
                                color: "white",
                                borderRadius: 5,
                            }}
                            itemStyle={{ color: "white" }}
                        >
                            <Picker.Item label="Legumes" value="Carrot" />
                            <Picker.Item label="Frutas" value="Apple" />
                            <Picker.Item label="Laticinios" value="Milk" />
                            <Picker.Item label="Carnes" value="Beef" />
                            <Picker.Item label="Outros" value="Sandwich" />
                        </Picker>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="h-12 bg-purple mt-4 p-3 rounded-lg"
                >
                    <Text className="text-white text-center font-bold my-auto">
                        {form.id ? "Editar" : "Adicionar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </Modalize>
    );
};
