import { useMemo, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
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

    const value = useMemo(
        () => ({
            openModal,
            closeModal,
            modalRef,
            itens,
            setItens,
            form,
            setForm,
        }),
        [openModal, closeModal, form, itens]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
