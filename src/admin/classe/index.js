import React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
const Classes = React.lazy(() => import("./components/Classes"));

const Classe = ({
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
        <Classes
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

export default Classe;
