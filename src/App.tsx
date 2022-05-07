import { useEffect, useState } from "react";
import { useQuery } from "react-query";
// Components
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

  const [data, setData] = useState([{}]);
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
      console.log("ok")
      setIsLoading(false)
    }
  }

  const getTotalItems = () => null;

  const handleAddToCart =() => null;

  const handleRemoveFromCard = () => null;

  if(isLoading) return <LinearProgress/>;
  if(error) return <div>Something went wrong ...</div>


  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;