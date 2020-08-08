import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
const Access = React.lazy(() => import("./index"));

const ActionSelector = ({ handleSelected, selected = [], ...props }) => {
  
  const val = selected.filter((item) => item).map((item) => item._id);
  return (
    <>
      <React.Suspense fallback={<LinearProgress />}>
        <Paper>
          <Access
            selector={true}
            handleSelected={handleSelected}
            selected={val}
            {...props}
          />
        </Paper>
      </React.Suspense>
    </>
  );
};

const isEqual = (prev, next) => {
  return JSON.stringify(prev.selected) === JSON.stringify(next.selected);
};

export default React.memo(ActionSelector, isEqual);
