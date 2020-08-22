import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import ErrorMessage from "./ErrorMessage";
// import useAlertNotifier from "../Alert/useAlertNotifier";
// import compareProps from "../utils/compareProps";
import ErrorBoundary from "./ErrorBoundary";
import { TitleTypography } from "./Typography";

const SwrRender = ({ data, children }) => {
  const isLoading = data === undefined;
  const showError = (error) => {
    const { code } = error;
    return code === "-1" ? (
      <TitleTypography style={{ margin: "16px" }} color="secondary">
        Aucun enregistrement trouvé
      </TitleTypography>
    ) : (
      <ErrorMessage />
    );
  };

  const shoWComponent = () => {
    const error = !isLoading && data.error ? true : false;
    return error ? (
      showError(data)
    ) : (
      <ErrorBoundary> {children()}</ErrorBoundary>
    );
  };

  return isLoading ? <LinearProgress /> : shoWComponent();
};

export default SwrRender;
