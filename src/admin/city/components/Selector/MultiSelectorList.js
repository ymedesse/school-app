import React from "react";
import Paper from "@material-ui/core/Paper";
import ListSkeleton from "../../../components/ListSkeleton";

const Clients = React.lazy(() => import("../Clients"));

const ActionSelector = ({
  handleSelected,
  selected = [],
  multiSelector = false,
  ...props
}) => {
  return (
    <>
      <React.Suspense fallback={<ListSkeleton count={10} />}>
        <Paper>
          <Clients
            selector={true}
            multiSelector={multiSelector}
            handleSelected={handleSelected}
            selected={selected}
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
