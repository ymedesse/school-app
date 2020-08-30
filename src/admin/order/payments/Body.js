import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import FormValidator from "../../../components/FormValidator";
import SwrRender from "../../../components/SwrRender";
import compareProps from "../../../utils/compareProps";
import validate from "./validations";
import Content from "./Content";
import { Debug } from "mui-rff";

const Form = ({
  qrCode,
  submitQrPayment,
  performFullErrorAlert,
  performFullSuccessAlert,
  setCurrentViewerTitleAndAction,
  rescane,
}) => {
  React.useEffect(() => {
    setCurrentViewerTitleAndAction("Nouveau Paiement");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values, form, complete) => {
    const { qrCodeId, orderId } = values;
    console.log({ values, qrCodeId, orderId });
    submitQrPayment &&
      submitQrPayment(qrCodeId, orderId, values, (data) => {
        if (data) {
          const { error } = data;
          if (error) {
            performFullErrorAlert &&
              performFullErrorAlert(data.error, {
                title: "Payment par QrCode",
              });
          }

          if (!error) {
            performFullSuccessAlert("Paiement effectué avec succès");
            rescane();
          }
        }
      });
  };

  const contents = ({ form, ...props }) => (
    <>
      <Content rescane={rescane} data={qrCode} />
      <Debug />
    </>
  );

  return (
    <SwrRender data={qrCode}>
      {() => (
        <FormValidator
          onSubmit={onSubmit}
          initialValues={getDefaultData(qrCode)}
          subscription={{ pristine: true, submitting: true }}
          contents={contents}
          validate={validate}
        />
      )}
    </SwrRender>
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["code"]);
};

export default React.memo(Form, isEqual);

// const useStyles = makeStyles((theme) => ({
//   margin: {
//     marginBottom: theme.spacing(1),
//   },
// }));

const getDefaultData = (data) => {
  const { amount } = data;
  return {
    payerData: {
      lastName: "",
      firstName: "",
      phone: "",
      email: "",
    },
    selfPayer: true,
    amount,
    qrCodeId: data._id,
    orderId: data.order.id,
  };
};
