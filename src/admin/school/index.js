import React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
const Schools = React.lazy(() => import("./components/Schools"));

const School = ({
  setCurrentViewTitle,
  setCurrentViewAction,
  addNextComponent,
  importComponentNativeState,
  setCurrentViewerTitleAndAction,
  alertState,
  previous,
}) => {
  return (
    <Paper>
      <React.Suspense fallback={<LinearProgress />}>
        <Schools
          setCurrentViewTitle={setCurrentViewTitle}
          setCurrentViewAction={setCurrentViewAction}
          addNextComponent={addNextComponent}
          importComponentNativeState={importComponentNativeState}
          setCurrentViewerTitleAndAction={setCurrentViewerTitleAndAction}
          alertState={alertState}
          previous={previous}
        />
      </React.Suspense>
    </Paper>
  );
};

export default School;
