import React, { useContext } from "react";
import RootContext from "./context";
const useRootContext = () => {
  const rootContext = useContext(RootContext);
  return rootContext;
};
export { useRootContext };
