import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
const Access = React.lazy(() => import("./components/Action"));
const Action = ({ ...props }) => {
  return (
    <>
      <React.Suspense fallback={<LinearProgress />}>
        <Paper>
          <Access {...props} />
        </Paper>
      </React.Suspense>
    </>
  );
};

export default Action;
