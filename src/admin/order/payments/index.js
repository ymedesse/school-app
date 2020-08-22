import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import context from "../../context/AdminContext";
import QrScanner from "./QrScaner";
import LinearProgress from "@material-ui/core/LinearProgress";

const PaymentBody = React.lazy(() => import("./Body"));

const NewPayment = ({
  addNextComponent,
  setCurrentViewerTitleAndAction,
  alertState,
  previous,
  isAuthenticatedUser,
}) => {
  const classes = useStyles();

  const adminContext = React.useContext(context);
  const { submitQrPayment, checkQrCode } = adminContext.order;

  const rescane = () => {
    previous();
  };

  const handleNewCode = (newCode) => {
    if (newCode)
      addNextComponent(
        (ownState) => (
          <Paper className={classes.root}>
            <React.Suspense fallback={<LinearProgress />}>
              <PaymentBody
                rescane={rescane}
                {...ownState}
                {...alertState}
                submitQrPayment={submitQrPayment}
                qrCode={newCode}
                setCurrentViewerTitleAndAction={setCurrentViewerTitleAndAction}
              />
            </React.Suspense>
          </Paper>
        ),
        "Nouveau paiement"
      );
  };

  return (
    <Paper className={classes.root}>
      <React.Suspense fallback={<LinearProgress variant="determinate" />}>
        <QrScanner
          {...alertState}
          checkQrCode={checkQrCode}
          handleNewCode={handleNewCode}
        />
      </React.Suspense>
    </Paper>
  );
};

export default NewPayment;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
    margin: "auto",
    padding: "24px 16px",
  },
}));
