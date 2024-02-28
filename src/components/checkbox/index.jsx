import { TouchableOpacity, View } from "react-native";
import { Check } from "lucide-react-native";
import PropTypes from "prop-types";

export const Checkbox = ({ disabled, setDisabled }) => {
    const handleCheckbox = () => {
        setDisabled(!disabled);
    };

    return (
        <TouchableOpacity
            onPress={handleCheckbox}
            className={`w-6 h-6 mr-5 border-2 ${
                disabled ? "border-success bg-success" : "border-purple-light"
            } rounded-md`}
        >
            <View className="flex-1 justify-center items-center">
                {disabled && (
                    <Check size={12} strokeWidth="4" className="text-white" />
                )}
            </View>
        </TouchableOpacity>
    );
};

Checkbox.propTypes = {
    disabled: PropTypes.bool.isRequired,
    setDisabled: PropTypes.func.isRequired,
};
