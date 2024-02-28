import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";
import { AppContext } from "../../context";

export const Add = () => {
    const { openModal } = useContext(AppContext);

    return (
        <TouchableOpacity
            onPress={openModal}
            className="w-[55px] h-[55px] absolute bg-purple rounded-full flex items-center justify-center right-8 bottom-10 z-10"
        >
            <Plus className="text-gray-100" width={30} height={30} />
        </TouchableOpacity>
    );
};
