import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOrdData } from "../../store/cart-actions";
import { uiActions } from "../../store/ui-slice";
import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cart = useSelector((state) => state.cart);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  const sendOrderHandler = () => {
    dispatch(sendOrdData(cart));
    dispatch(cartActions.emptyCart());
    dispatch(uiActions.toggle());
  };

  return (
    <Fragment>
      <div className={classes.overlay} onClick={toggleCartHandler}></div>
      <Card className={classes.cart}>
        <h2>주문하기</h2>
        <ul>
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={{
                  id: item.id,
                  title: item.title,
                  quantity: item.quantity,
                  total: item.totalPrice,
                  price: item.price,
                }}
              />
            ))}
        </ul>
        {cartItems.length > 0 && (
          <div>
            <div className={classes.total}>
              <h3>총 수량 </h3>
              <h3>{cart.totalQuantity}개</h3>
              <h3>총 결제금액 </h3>
              <h3 className={classes.totalCharge}>{cart.totalCharge}원</h3>
            </div>
            <div className={classes.btnArea}>
              <button className={classes.cnclBtn} onClick={toggleCartHandler}>
                <span>돌아가기</span>
              </button>
              <button className={classes.ordBtn} onClick={sendOrderHandler}>
                <span>주문하기</span>
              </button>
            </div>
          </div>
        )}
        {cartItems.length === 0 && (
          <div className={classes.btnArea}>주문할 음식이 없습니다.</div>
        )}
      </Card>
    </Fragment>
  );
};
export default Cart;
