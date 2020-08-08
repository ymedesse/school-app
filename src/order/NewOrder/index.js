import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import context from "../../rootContext/context";
import { LargeTypography } from "../../components/Typography";
import ErrorBoundary from "../../components/ErrorBoundarySuspense";
import ListSkeleton from "../../components/ListSkeleton";
import { PreviousButton } from "../../components/Buttons";

import { SCHOOL_LIST_LINK } from "../../routerLinks";
import SubHeader from "../../components/PageSubHeader";
const Body = React.lazy(() => import("./Body"));

const NewOrder = ({ location, match, history, ...props }) => {
  const pathName = location.pathname;
  const { params } = match;
  const { orderid } = params;
  const classes = useStyles();

  const rootContext = React.useContext(context);
  const { order, getReadOrderUrl, getFetcher } = rootContext.checkout;

  return (
    <>
      <SubHeader routes={[pathName]} />

      <PreviousButton
        color="primary"
        variant="outlined"
        onClick={() => history.push(SCHOOL_LIST_LINK)}
      >
        Liste des écoles
      </PreviousButton>

      <div className={classes.thanks}>
        <LargeTypography> Merci. Votre commande a été reçue </LargeTypography>
      </div>

      <ErrorBoundary
        fallback={<ListSkeleton count={8} height={32} margin="24px" />}
      >
        <Body
          order={order}
          id={orderid}
          getReadOrderUrl={getReadOrderUrl}
          getFetcher={getFetcher}
        />
      </ErrorBoundary>
    </>
  );
};

export default NewOrder;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  thanks: {
    margin: theme.spacing(1, 0, 2, 0),
  },
}));
