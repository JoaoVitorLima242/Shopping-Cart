import { CartItemType } from "../helpers/types/App";

export const getProductsRequest = async (): Promise<CartItemType[]> => {
    try {
        let products: CartItemType[] = await (await fetch('https://fakestoreapi.com/products')).json()
        return products;
    } catch (err){
        console.log(err)
        throw(err)
    }
};