import { useContext } from "react";
import { useSQLiteContext } from "expo-sqlite/next";
import { AppContext } from "../../context";

export function useLocal() {
    const { itens, setItens } = useContext(AppContext);
    const database = useSQLiteContext();

    const fetchData = async (tableName, queryOptions) => {
        let query = `SELECT * FROM items`;
        try {
            const response = await database.getAllAsync(query);
            if (response) {
                return response;
            }
        } catch (error) {
            throw error;
        }
    };

    const saveData = async (tableName, data) => {
        const lastItemId = itens.reduce(
            (maxId, item) => Math.max(maxId, item.id),
            0
        );
        const newData = { ...data, id: lastItemId + 1 };
        setItens([...itens, newData]);

        const statement = await database.prepareAsync(
            `INSERT INTO items (title, quantity, valor, total, category) VALUES ($title, $quantity, $valor, $total, $category)`
        );

        try {
            const response = await statement.executeAsync({
                $title: data.title,
                $quantity: data.quantity,
                $valor: data.valor,
                $total: data.total,
                $category: data.category,
            });

            const insertedId = response.lastInsertRowId.toLocaleString();
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const updateData = async (tableName, data, id) => {
        setItens(
            itens.map((item) => (item.id === id ? { ...item, ...data } : item))
        );

        const statement = await database.prepareAsync(
            `UPDATE items SET checked = $checked WHERE id = $id`
        );

        try {
            await statement.executeAsync({
                $checked: data.checked,
                $id: id,
            });
        } catch (error) {
            throw error;
        }
    };

    const removeData = async (tableName, id) => {
        setItens(itens.filter((item) => item.id !== id));
        const statement = await database.prepareAsync(
            `DELETE FROM items WHERE id = $id`
        );

        try {
            await statement.executeAsync({ $id: id });
        } catch (error) {
            throw error;
        }
    };

    return {
        saveData,
        updateData,
        fetchData,
        removeData,
    };
}
