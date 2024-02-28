import { useMemo, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { AppContext } from "..";

export const AppProvider = ({ children }) => {
    const modalRef = useRef(null);
    const openModal = useCallback(() => modalRef.current?.open(), []);
    const closeModal = useCallback(() => modalRef.current?.close(), []);
    const [itens, setItens] = useState([]);

    const value = useMemo(
        () => ({ openModal, closeModal, modalRef, itens, setItens }),
        [openModal, closeModal, itens]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
