import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

const App = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-b5104-default-rtdb.asia-southeast1.firebasedatabase.app/menu.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await response.json();
      console.log(data);
      setMenu(data);
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Layout>
        {showCart && <Cart />}
        <Products menu={menu} />
      </Layout>
    </Fragment>
  );
};

export default App;
