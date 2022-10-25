import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const [tab, setTab] = useState("kb");
  const [menu, setMenu] = useState([]);

  const kbShow = () => {
    setTab("kb");
  };
  const snackShow = () => {
    setTab("snack");
  };
  const mealShow = () => {
    setTab("meal");
  };

  useEffect(() => {
    setMenu(props.menu.filter((pd) => pd.category === tab));
  }, [props.menu, tab]);
  return (
    <section className={classes.products}>
      <div className={classes.tabs}>
        <span
          className={`${classes.subtab} ${tab === "kb" ? classes.on : null}`}
          onClick={kbShow}
        >
          김밥류
        </span>
        <span
          className={`${classes.subtab} ${tab === "snack" ? classes.on : null}`}
          onClick={snackShow}
        >
          분식류
        </span>
        <span
          className={`${classes.subtab} ${tab === "meal" ? classes.on : null}`}
          onClick={mealShow}
        >
          식사류
        </span>
      </div>
      <ul>
        {menu.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            img={product.img}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
