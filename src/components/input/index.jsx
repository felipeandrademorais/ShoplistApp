import React from "react";
import PropTypes from "prop-types";
import { TextInput, View, Text } from "react-native";

export const InputComponent = ({
    label,
    value,
    onChangeText,
    placeholder,
    validator,
    keyboardType = "default",
}) => {
    const [error, setError] = React.useState("");

    const handleTextChange = (text) => {
        if (validator) {
            const validationResult = validator(text);
            setError(validationResult);
        }
        onChangeText(text);
    };

    return (
        <View className="w-1/2 mr-2">
            <Text className="text-white mb-2">{label}</Text>
            <TextInput
                className="h-12 text-white border rounded-lg text-sm p-2 border-gray-400/50 bg-gray-500"
                value={value}
                onChangeText={handleTextChange}
                placeholder={placeholder}
                placeholderTextColor="#454545"
                keyboardType={keyboardType}
            />
            {error ? <Text className="text-red">{error}</Text> : null}
        </View>
    );
};

InputComponent.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    validator: PropTypes.func,
    keyboardType: PropTypes.string,
};
