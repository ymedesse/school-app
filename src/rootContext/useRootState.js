import React from "react";
import context from "./context";

const useRootState = (statesKeys = []) => {
  const rootContext = React.useContext(context);
  const getState = (element) => {
    return element ? rootContext[`${element}`] : rootContext;
  };
  
  return getState;
};

export default useRootState;
