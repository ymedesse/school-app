import React from "react";
import Grid from "@material-ui/core/Grid";
import CheckBoxSkeleton from "../../components/CheckBoxSkeleton";
import { OnChange } from "react-final-form-listeners";

import {
  LOCAL_SHIPPING_TITLE,
  REMOTE_SHIPPING_TITLE,
} from "../container/constants";

const MethodLabel = React.lazy(() => import("./MethodLabelMui"));
// const ShippingContent = React.lazy(() => import("./Content"));

const MethodsLabel = ({ form, minCost }) => {
  return (
    <>
      <Grid xs={12} item>
        <React.Suspense fallback={<CheckBoxSkeleton count={1} length={30} />}>
          <MethodLabel
            label={LOCAL_SHIPPING_TITLE}
            name="local"
            amountLabel="Gratuit"
          />
        </React.Suspense>

        <React.Suspense fallback={<CheckBoxSkeleton count={1} length={30} />}>
          <MethodLabel
            label={REMOTE_SHIPPING_TITLE}
            name="remote"
            amountLabel={`A partir de ${minCost} FCFA`}
          />
        </React.Suspense>
      </Grid>

      <OnChange name="local">
        {(newVal, oldVal) => {
          if (newVal === true) form.change("remote", false);
        }}
      </OnChange>
      <OnChange name="remote">
        {(newVal, oldVal) => {
          if (newVal === true) form.change("local", false);
        }}
      </OnChange>
    </>
  );
};

export default MethodsLabel;

// const shipping = {
//   method_title: "",
//   shippingTotal: "",
//   address: {
//     firstName: "",
//     lastName: "",
//     description: "",
//     city: "",
//     postal: "",
//     phone: "",
//   },
// };
