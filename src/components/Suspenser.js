import React, { Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const Suspenser = ({
  children,
  fallback,
  height = 200,
  count = 1,
  doubleFeadBack = false
}) => {
  const classes = useStylesPaper();
  const load = fallback ? (
    fallback
  ) : (
    <>
      {Array(count).map(item =>
        defaultFeadBack(classes, item, height, doubleFeadBack)
      )}
    </>
  );

  return <Suspense fallback={load}>{children}</Suspense>;
};

const useStylesPaper = makeStyles(theme => ({
  paper: {
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  div: {
    width: "100%",
    padding: theme.spacing(1)
    // marginBottom: theme.spacing(2)
  }
}));

const SuspenserDiv = ({ children, fallback, height = 200, count = 1 }) => {
  const classes = useStylesPaper();
  const load = fallback ? (
    fallback
  ) : (
    <>{Array(count).map(item => defaultFeadBack(classes, item, height))}</>
  );

  return (
    <Suspense fallback={load}>
      <div className={classes.div}> {children} </div>
    </Suspense>
  );
};

const defaultFeadBack = (classes, item, height, doubleFeadBack = false) => (
  <>
    {doubleFeadBack ? (
      <div key={item}>
        <Skeleton
          variant="rect"
          width="100%"
          height={10}
          style={{ marginBottom: "8px" }}
        />
        <Skeleton
          className={classes.paper}
          variant="rect"
          width="100%"
          height={height}
        />
      </div>
    ) : (
      <Skeleton
        key={item}
        className={classes.paper}
        variant="rect"
        width="100%"
        height={height}
      />
    )}
  </>
);

export { SuspenserDiv };
export default Suspenser;
