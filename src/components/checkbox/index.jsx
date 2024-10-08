import { TouchableOpacity, View } from "react-native";
import { Check } from "lucide-react-native";
import PropTypes from "prop-types";
import { useDatabase } from "../../services/DatabaseService";

export const Checkbox = ({ item }) => {
    const { updateData } = useDatabase();

    const handleCheckbox = async () => {
        try {
            await updateData(
                "lists",
                { checked: item.checked ? 0 : 1 },
                item.id
            );
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
                {item.checked === 1 && (
                    <Check size={12} strokeWidth="4" className="text-white" />
                )}
            </View>
        </TouchableOpacity>
    );
};

Checkbox.propTypes = {
    item: PropTypes.object.isRequired,
};
