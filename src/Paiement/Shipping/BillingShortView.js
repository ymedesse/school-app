import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { FormSpy } from "react-final-form";
import Facturation from "../Billing/Facturation";

const Billing = ({
  form,
  schortCart,
  isCommande = false,
  endStep = true,
  shippingValue,
  submitLabel = "Valider ma livraison",
  handleSubmit,
}) => {
  const getCurrentShipping = (values) => {
    if (shippingValue) return shippingValue;
    const { remote } = values;
    return remote === true ? values.remoteShipping : values.localShipping;
  };

  const showContent = (values) => {
    const currentShipping = getCurrentShipping(values) || {};
    let { city = {} } = currentShipping.address || {};

    city = city === null ? {} : city;

    return (
      <Facturation
        cart={schortCart}
        isCommande={isCommande}
        submitLabel={submitLabel}
        shippingPrice={city.cost || 0}
        initialExpanded={true}
        endStep={endStep}
        handleSubmit={handleSubmit}
      />
    );
  };

  return (
    <>
      <FormSpy subscription={{ values: true }}>
        {({ values }) => showContent(values)}
      </FormSpy>
    </>
  );
};

// const useStyles = makeStyles((theme) => ({}));

export default Billing;
