import React from "react";
import Divider from "@material-ui/core/Divider";
import SubAmountRow from "../SubAmountRow";

const TotalsAmount = ({ shippingTotal, orderAmount, leftToPay, totalList }) => {
  const paid = (parseInt(orderAmount) || 0) - (parseInt(leftToPay) || 0);
  return (
    <>
      <SubAmountRow label="Sous Total" amount={<strong>{totalList}</strong>} />
      <SubAmountRow
        label="Expédition"
        amount={<strong>{shippingTotal}</strong>}
      />
      <SubAmountRow
        label="Total commande"
        amount={<strong>{orderAmount}</strong>}
      />
      <Divider />
      <SubAmountRow
        label={<strong>Montant Payé </strong>}
        amount={<strong>{paid}</strong>}
      />
    </>
  );
};

export default React.memo(TotalsAmount);
