export const sortItemsByChecked = (items) => {
    return items.sort((a, b) => {
        return a.checked === false ? -1 : b.checked === false ? 1 : 0;
    });
};
