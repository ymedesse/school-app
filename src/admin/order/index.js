import React from "react";
// import { getProductsApi } from "./container/api";
import Paper from "@material-ui/core/Paper";
import Orders from "./components/Orders";

const Order = ({
  setCurrentViewTitle,
  setCurrentViewAction,
  addNextComponent,
  importComponentNativeState,
  setCurrentViewerTitleAndAction,
  alertState,
  previous,
  isAuthenticatedUser,
}) => {
  return (
    <Paper>
      <Orders
        setCurrentViewTitle={setCurrentViewTitle}
        setCurrentViewAction={setCurrentViewAction}
        addNextComponent={addNextComponent}
        importComponentNativeState={importComponentNativeState}
        setCurrentViewerTitleAndAction={setCurrentViewerTitleAndAction}
        alertState={alertState}
        previous={previous}
        isAuthenticatedUser={isAuthenticatedUser}
      />
    </Paper>
  );
};

export default Order;
