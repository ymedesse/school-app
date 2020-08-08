import React from "react";
import Paper from "@material-ui/core/Paper";
import ListSkeleton from "../../../../components/ListSkeleton";

const Products = React.lazy(() => import("../Products"));

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
          <Products
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
