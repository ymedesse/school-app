import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
const Role = React.lazy(() => import("./components/Role"));
const Action = ({ ...props }) => {
  return (
    <>
      <React.Suspense fallback={<LinearProgress />}>
        <Paper>
          <Role {...props} />
        </Paper>
      </React.Suspense>
    </>
  );
};

export default Action;
