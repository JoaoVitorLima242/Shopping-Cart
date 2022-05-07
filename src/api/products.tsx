export const getProducts = async () => {
    await (await fetch('https://fakestoreapi.com/products')).json();
};