import { TouchableOpacity, View } from "react-native";
import { Check } from "lucide-react-native";
import PropTypes from "prop-types";
import { updateData } from "../../services/SupabaseService";

export const Checkbox = ({ item }) => {
    const handleCheckbox = async () => {
        try {
            await updateData("lists", item.id, { checked: !item.checked });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity
            onPress={handleCheckbox}
            className={`w-6 h-6 mr-5 border-2 ${
                item.checked
                    ? "border-success bg-success"
                    : "border-purple-light"
            } rounded-md`}
        >
            <View className="flex-1 justify-center items-center">
                {item.checked && (
                    <Check size={12} strokeWidth="4" className="text-white" />
                )}
            </View>
        </TouchableOpacity>
    );
};

Checkbox.propTypes = {
    item: PropTypes.object.isRequired,
};
