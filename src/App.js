import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { sendCartData, fetchCartData } from "./store/cart-actions";
import { uiActions } from "./store/ui-slice";
import Bill from "./components/UI/Bill";

let isInitial = true;

const App = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const showBill = useSelector((state) => state.ui.billIsVisible);
  const [ordNo, setOrdNo] = useState(0);
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

    if (cart.sendOrder) {
      const fetchData = async () => {
        const ordRes = await fetch(
          "https://react-http-b5104-default-rtdb.asia-southeast1.firebasedatabase.app/order.json"
        );

        if (!ordRes.ok) {
          throw new Error("Could not fetch order data!");
        }
        const data = await ordRes.json();
        let ordArr = Object.values(data);
        let sort = ordArr.sort((a, b) => b.ordNo - a.ordNo);
        setOrdNo(
          sort[0].ordNo.substring(
            sort[0].ordNo.length - 3,
            sort[0].ordNo.length
          )
        );
      };

      fetchData();

      dispatch(uiActions.showBill());

      setTimeout(() => {
        dispatch(uiActions.hideBill());
      }, 5000);
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
      setMenu(data);
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Layout>
        {showCart && <Cart />}
        <Products menu={menu} />
        {showBill && <Bill ordNo={ordNo} />}
      </Layout>
    </Fragment>
  );
};

export default App;
