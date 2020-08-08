import React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
const Cities = React.lazy(() => import("./components/Cities"));

const City = ({
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
        <Cities
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

export default City;
