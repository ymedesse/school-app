import React from "react";
import context from "../../rootContext/context";

const useQosPayment = ({ setSubmiting }) => {
  const rootContext = React.useContext(context);

  const { processQosPayment, checkQosPaymentStatus } = rootContext.checkout;
  const { performErrorAlert } = rootContext.alert;

  const defaultErrorAlert = (errorMessage, error) => {
    setSubmiting && setSubmiting(false);
    performErrorAlert(errorMessage);
  };

  const performPaymentPending = async ({ paymentData, paymentInfo }) => {
    const { transref } = paymentData;
    const { phone } = paymentInfo;

    let ckeckData = await checkPendingPayment(transref, phone);
    const newResponseCode = ckeckData.responsecode;

    return newResponseCode === "-1"
      ? defaultErrorAlert(
          "Paiement échoué. veuillez réessayer svp !",
          ckeckData
        )
      : newResponseCode === "00"
      ? ckeckData
      : defaultErrorAlert(
          "Une erreur s'est produite lors de la vérification du status",
          ckeckData
        );
  };

  const performPaymentData = async (paymentData, paymentInfo) => {
    if (paymentData) {
      const { error, responsecode } = paymentData;
      if (error) {
        if (error.code === "EHOSTUNREACH")
          return defaultErrorAlert(
            "Veuillez vérifier votre connexion internet puis réessayer",
            error
          );
        else return defaultErrorAlert("Une erreur s'est produite", error);
      }

      if (responsecode === "01") {
        return performPaymentPending({ paymentData, paymentInfo });
      } else {
        return defaultErrorAlert(paymentData);
      }
    }
  };

  const submitQosPayment = async (payment) => {
    return new Promise((resolve, reject) => {
      processQosPayment(payment, async (data) => {
        const m = await performPaymentData(data, payment);
        resolve(m);
      });
    });

    // return {
    //   "responsecode": "00",
    //   "responsemsg": "Successfully processed transaction.",
    //   "transref": "GroupGMD461596185803",
    //   "serviceref": "1118603579",
    //   "comment": null,
    //   "date_paid": Date.now(),
    // };
  };

  const checkPendingPayment = async (transref, phone) => {
    let data = await checkQosPaymentStatus({ transref, phone });
    if (data) {
      let { responsemsg } = data;
      while (["Pending", "PENDING"].indexOf(responsemsg) !== -1) {
        data = await checkQosPaymentStatus({ transref, phone });
        if (data) responsemsg = data.responsemsg;
      }
      return data;
    }
  };

  return submitQosPayment;
};

export default useQosPayment;
