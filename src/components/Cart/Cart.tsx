import { CartItem } from "../CartItem/CartItem"
import { Wrapper } from "./Cart.styles"
import { CartItemType } from "../../helpers/types/App"

type Props = {
    cartItems: CartItemType[],
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCard: (id: number) => void;
}

const Cart = ({cartItems, addToCart, removeFromCard} : Props)  => {

    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems?.map(item => (
                <CartItem/>
            ))};
        </Wrapper>
    )
}

export default Cart;