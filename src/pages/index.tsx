import { useEffect, useState } from "react";
import { useQuery } from "react-query";
// Components
import Item from "../components/Items/Item";
import { 
  Drawer,
  LinearProgress,
  Grid,
  Badge
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Wrapper, StyledButton } from "../assets/styles/App.styles";
// Api Funcs
import { getProductsRequest } from "../api/products";
// types
import { CartItemType } from "../helpers/types/App";
import Cart from "../components/Cart/Cart";
import { GetServerSideProps } from "next";


type HomeProps = {
  products: CartItemType[]
}

const Home = ({products} : HomeProps) => {


  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const getTotalItems = (items: CartItemType[]) => 
  items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1}
            : item
        ))
      };

      return [...prev, {...clickedItem, amount: 1}]
    })
  } ;

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if(item.id === id) {
          if(item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount - 1}]
        } else {
          return [...ack, item];
        }
      },[] as CartItemType[])
    ))
  };



  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart 
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)} >
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart/>
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {products?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProductsRequest();

  return {
    props: {
      products
    }
  }
}

export default Home;