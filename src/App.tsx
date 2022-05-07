import { useEffect, useState } from "react";
import { useQuery } from "react-query";
// Components
import Item from "./components/Items/Item";
import { 
  Drawer,
  LinearProgress,
  Grid,
  Badge
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Wrapper, StyledButton } from "./assets/styles/App.styles";
import { getProductsRequest } from "./api/products";
import { CartItemType } from "./helpers/types/App";


const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const [data, setData] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
  },[])

  const getProducts = async () => {
    try {
      let products = await getProductsRequest();
      setData(products);
    } catch(err) {
      setIsLoading(false)
      setError(true);
    } finally {
      setIsLoading(false)
    }
  }

  const getTotalItems = (items: CartItemType[]) => null;

  const handleAddToCart = (clickedItem: CartItemType) => null ;

  const handleRemoveFromCard = () => null;

  if(isLoading) return <LinearProgress/>;
  if(error) return <div>Something went wrong ...</div>


  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart goes here
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)} >
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart/>
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;