import { useMemo, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useNetInfo } from "@react-native-community/netinfo";
import { AppContext } from "..";

export const AppProvider = ({ children }) => {
    const modalRef = useRef(null);
    const openModal = useCallback(() => modalRef.current?.open(), []);
    const closeModal = useCallback(() => modalRef.current?.close(), []);
    const [form, setForm] = useState({
        title: "",
        quantity: "1",
        category: "Carrot",
        valor: "",
    });
    const [itens, setItens] = useState([]);
    const netInfo = useNetInfo();
    const isConnected = netInfo.isConnected && netInfo.isInternetReachable;

    const value = useMemo(
        () => ({
            openModal,
            closeModal,
            modalRef,
            itens,
            setItens,
            form,
            setForm,
            isConnected,
        }),
        [openModal, closeModal, form, itens, isConnected]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
