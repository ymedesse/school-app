import React from "react";
import List from "./List";
import ListSkeleton from "../../../components/ListSkeleton";
import { PreviousButton } from "../../../components/Buttons";
import compareProps from "../../../utils/compareProps";
import { makeStyles } from "@material-ui/core/styles";
import { ORDERS_LINK } from "../../../routerLinks";

const History = ({
  id,
  getPaymentsListUrl,
  getFetcher,
  history,
  inAdminMode = false,
  ...props
}) => {
  const fetcher = getFetcher();
  const classes = useStyles();
  const url = getPaymentsListUrl(id);
  const previous = () => {
    id && history.push(ORDERS_LINK + "/" + id);
  };

  return (
    <>
      {!inAdminMode && (
        <PreviousButton color="primary" variant="text" onClick={previous}>
          Revenir à ma commande
        </PreviousButton>
      )}
      <div className={classes.margin} />
      <React.Suspense fallback={<ListSkeleton count="10" />}>
        <List
          id={id}
          history={history}
          fetcher={fetcher}
          url={url}
          inAdminMode={inAdminMode}
          {...props}
        />
      </React.Suspense>
    </>
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["id", "inAdminMode"]);
};

export default React.memo(History, isEqual);

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  margin1: {
    marginBottom: theme.spacing(1),
  },
}));
