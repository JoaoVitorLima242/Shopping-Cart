import { CardItemType } from "../helpers/types/App";

export const getProducts = async () => {
    try {
        let products: CardItemType[] = await (await fetch('https://fakestoreapi.com/products')).json()

        return products;
    } catch (err){
        console.log(err)
    }
};