import React, { Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import SquarePaperMui from "./SquarePaperMui";
const SuspensePaper = ({ children, fallback, elevation }) => {
  const classes = useStylesPaper();
  const load = fallback ? (
    fallback
  ) : (
    <Skeleton
      className={classes.paper}
      variant="rect"
      width="100%"
      height={20}
    />
  );

  return (
    <Suspense fallback={load}>
      <SquarePaperMui>{children}</SquarePaperMui>
    </Suspense>
  );
};

const useStylesPaper = makeStyles(theme => ({
  paper: {
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export default SuspensePaper;
