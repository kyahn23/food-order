import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { title, price, id, img } = props;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: id,
        title: title,
        price: price,
      })
    );
  };

  return (
    <li className={classes.item} onClick={addToCartHandler}>
      <Card>
        <header>
          <div className={classes.image}>
            <img src={img} alt="이미지" />
          </div>
        </header>
        <p>{title}</p>
        <div className={classes.price}>{price.toLocaleString() + "원"}</div>
      </Card>
    </li>
  );
};

export default ProductItem;
