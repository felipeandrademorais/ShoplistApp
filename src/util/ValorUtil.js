export const formatarValor = (valor) => {
    const valorNumerico = Number(valor);
    return `R$ ${valorNumerico.toFixed(2).replace(".", ",")}`;
};
