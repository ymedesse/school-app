import React from "react";
import ProcessCheckout from "./ProcessCheckout";
const Payment = ({ ...props }) => {
  //   const { params } = props.match;
  return (
    <>
      <React.Suspense fallback={"*****"}>
        <ProcessCheckout {...props} />
      </React.Suspense>
    </>
  );
};

export default Payment;
