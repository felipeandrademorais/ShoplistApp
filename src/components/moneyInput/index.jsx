import { useState } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { TextInputMask } from "react-native-masked-text";

export const MoneyInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    validator,
    keyboardType = "default",
}) => {
    const [error, setError] = useState("");
    const handleTextChange = (text) => {
        const cleanText = text.replace("R$ ", "").replace(",", ".");
        if (validator) {
            const validationResult = validator(cleanText);
            setError(validationResult);
        }
        onChangeText(cleanText);
    };

    return (
        <View className="w-1/2 mr-2">
            <Text className="text-white mb-2">{label}</Text>
            <TextInputMask
                className="h-12 text-white border rounded-lg text-sm p-2 border-gray-400/50 bg-gray-500"
                value={value}
                type={"money"}
                options={{
                    precision: 2,
                    separator: ",",
                    delimiter: ".",
                    unit: "R$ ",
                    suffixUnit: "",
                }}
                onChangeText={(text) => {
                    handleTextChange(text);
                }}
                placeholder={placeholder}
                placeholderTextColor="#454545"
                keyboardType={keyboardType}
            />
            {error ? <Text className="text-red">{error}</Text> : null}
        </View>
    );
};

MoneyInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    validator: PropTypes.func,
    keyboardType: PropTypes.string,
};
