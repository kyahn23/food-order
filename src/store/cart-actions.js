import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-b5104-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
          totalCharge: cartData.totalCharge,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-b5104-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
            totalCharge: cart.totalCharge,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendOrdData = (cart) => {
  let ordNo = "1";
  const today = new Date().toISOString().substring(0, 10).replace(/-/g, "");

  return async (dispatch) => {
    const sendRequest = async () => {
      const ordRes = await fetch(
        "https://react-http-b5104-default-rtdb.asia-southeast1.firebasedatabase.app/order.json"
      );

      if (!ordRes.ok) {
        throw new Error("Could not fetch order data!");
      }
      const data = await ordRes.json();
      let ordArr = Object.values(data);
      let sort = ordArr.sort((a, b) => b.ordNo - a.ordNo);
      if (sort[0].ordNo.substring(0, 8) === today) {
        ordNo =
          parseInt(
            sort[0].ordNo.substring(
              sort[0].ordNo.length - 3,
              sort[0].ordNo.length
            )
          ) + 1;
      }
      ordNo = ordNo.toString().padStart(3, "0");

      const response = await fetch(
        "https://react-http-b5104-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
        {
          method: "POST",
          body: JSON.stringify({ ...cart, ordNo: today + ordNo }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending order failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
