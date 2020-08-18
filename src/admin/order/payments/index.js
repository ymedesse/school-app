import React from "react";
import Paper from "@material-ui/core/Paper";
import context from "../../context/AdminContext";

const NewPayment = ({
  setCurrentViewTitle,
  setCurrentViewAction,
  addNextComponent,
  importComponentNativeState,
  setCurrentViewerTitleAndAction,
  alertState,
  previous,
  isAuthenticatedUser,
}) => {
  const adminContext = React.useContext(context);
  const inputState = {
    addNextComponent,
    setCurrentViewerTitleAndAction,
  };

  const { getFetcher, getReadQrCodeUrl, checkPermission } = adminContext.order;
  
  const [state, setState] = React.useState({
    codeId: undefined,
    code: undefined,
  });
  return <Paper></Paper>;
};

export default NewPayment;
