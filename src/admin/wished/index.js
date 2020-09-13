import React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
const Wisheds = React.lazy(() => import("./components/Wisheds"));

const Wished = ({
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
        <Wisheds
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

export default Wished;
