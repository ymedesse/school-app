import React from "react";
// import { getProductsApi } from "./container/api";
import Paper from "@material-ui/core/Paper";
import Products from "./components/Products";

const Dashboard = ({
  setCurrentViewTitle,
  setCurrentViewAction,
  addNextComponent,
  importComponentNativeState,
  setCurrentViewerTitleAndAction,
  alertState,
  previous
}) => {
  return (
    <Paper>
      <Products
        setCurrentViewTitle={setCurrentViewTitle}
        setCurrentViewAction={setCurrentViewAction}
        addNextComponent={addNextComponent}
        importComponentNativeState={importComponentNativeState}
        setCurrentViewerTitleAndAction={setCurrentViewerTitleAndAction}
        alertState={alertState}
        previous={previous}
      />
    </Paper>
  );
};

export default Dashboard;
