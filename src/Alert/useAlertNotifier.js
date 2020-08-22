import React from "react";
import context from "../rootContext/context";

const useAlertNotifier = () => {
  const rootContext = React.useContext(context);
  const values = rootContext.alert;

  return values;
};

export default useAlertNotifier;
