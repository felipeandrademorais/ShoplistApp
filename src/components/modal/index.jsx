import { useContext, useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import { Picker } from "@react-native-picker/picker";
import { AppContext } from "../../context";
import { InputComponent } from "../input";
import { MoneyInput } from "../moneyInput";
import { saveData } from "../../services/SupabaseService";

export const Modal = () => {
    const { modalRef, closeModal } = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState();
    const [form, setForm] = useState({
        title: "",
        quantity: "",
        category: "",
        valor: "",
    });

    const total = parseFloat(form.quantity || 0) * parseFloat(form.valor || 0);

    const handleSubmit = async () => {
        const newItem = { ...form, total: total.toFixed(2) };
        closeModal();
        try {
            await saveData("lists", newItem);
        } catch (error) {
            console.log(error);
        }
        setForm({
            title: "",
            quantity: "",
            category: "",
            valor: "",
        });
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
        >
            <View className="flex-1 pt-10 px-5">
                <View className="flex-row justify-between items-center">
                    <InputComponent
                        label="Item"
                        placeholder="Ex: Banana"
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
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue, itemIndex) => (
                                setSelectedCategory(itemValue),
                                setForm({ ...form, category: itemValue })
                            )}
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
                        Adicionar
                    </Text>
                </TouchableOpacity>
            </View>
        </Modalize>
    );
};
