import { Fragment } from "react";

import classes from "./Bill.module.css";

const Bill = (props) => {
  return (
    <Fragment>
      <div className={classes.overlay}></div>
      <div className={classes.bill}>
        <h2>주문이 완료되었습니다.</h2>
        <h2 className={classes.ordNo}>{"주문번호 : " + props.ordNo}</h2>
        <div className={classes.txt}>
          이용해주셔서 감사합니다.
          <br />
          주문번호를 확인해주세요.
        </div>
      </div>
    </Fragment>
  );
};

export default Bill;
