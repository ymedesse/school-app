import React, { useContext } from "react";
import AdminContext from "./AdminContext";
const useAdminContext = () => {
  const adminContext = useContext(AdminContext);
  return adminContext;
};
export { useAdminContext };
