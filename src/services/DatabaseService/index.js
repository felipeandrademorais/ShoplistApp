import { useContext } from "react";
import { AppContext } from "../../context";
import { useLocal } from "../LocalService";

export function useDatabase() {
    const local = useLocal();
    const { itens, setItens } = useContext(AppContext);

    const fetchData = async (tableName, queryOptions) => {
        const data = await local.fetchData(tableName, queryOptions);
        setItens(data);
    };

    const saveData = async (tableName, data) => {
        const lastItemId = itens.reduce(
            (maxId, item) => Math.max(maxId, item.id),
            0
        );
        const newData = { ...data, id: lastItemId + 1 };
        setItens([...itens, newData]);
        return await local.saveData(tableName, data);
    };

    const updateData = async (tableName, data, id) => {
        setItens(
            itens.map((item) => (item.id === id ? { ...item, ...data } : item))
        );
        return await local.updateData(tableName, data, id);
    };

    const removeData = async (tableName, id) => {
        setItens(itens.filter((item) => item.id !== id));
        return await local.removeData(tableName, id);
    };

    return {
        saveData,
        updateData,
        fetchData,
        removeData,
    };
}
