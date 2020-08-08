import React, { useContext } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles } from "@material-ui/core/styles";

import OrdersList from "./components/OrdersList";
import OrderBody from "./components/OrderBody";
import context from "../rootContext/context";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function Swiper({ component }) {
  const classes = useStyles();
  const rootContext = useContext(context);

  const { orders } = rootContext.order;

  const [value, setValue] = React.useState(0);
  const [currentItem, setCurrentItem] = React.useState();

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const selectItem = (current) => {
    setCurrentItem(current);
    setValue(1);
  };

  const backhandle = async () => {
    await setCurrentItem(undefined);
    setValue(0);
  };

  return (
    <div className={classes.root}>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <div>
          <OrdersList
            orders={orders}
            handleClick={(value) => selectItem(value)}
          />
        </div>

        <div>
          {currentItem !== undefined && (
            <OrderBody order={currentItem} backHandle={backhandle} />
          )}
        </div>
      </SwipeableViews>
    </div>
  );
}
