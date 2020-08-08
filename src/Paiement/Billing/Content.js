import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormSpy } from "react-final-form";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import CheckBoxLine from "../../components/CheckBoxLine";
import MomoContent from "./MomoContent";
import Phone from "../../assets/phone28.PNG";
import {
  MOMO_PAYMENT_WAY,
  LOCAL_PAYMENT_WAY,
  VIREMENT_PAYMENT_WAY,
  MOMO_PAYMENT_WAY_TITLE,
  LOCAL_PAYMENT_WAY_TITLE,
  VIREMENT_PAYMENT_WAY_TITLE,
} from "../container/constants";

import compareProps from "../../utils/compareProps";
const MethodsContent = ({ form, maxAmount, showButton }) => {
  const handleChange = (panel) => (event, newExpanded) => {
    const newMethod = newExpanded ? panel : false;
    form.change("payment.method", newMethod);
  };

  return (
    <div>
      <FormSpy subscription={{ values: true }}>
        {({ values }) => {
          const { method } = values.payment || {};
          return methods.map((item) => (
            <Accordion
              square
              key={item.id}
              expanded={method === item.id}
              onChange={handleChange(item.id)}
            >
              <AccordionSummary
                aria-controls={`methode-${item.id}-content`}
                id={`methode-${item.id}-header`}
              >
                <CheckBoxLine
                  disabled={method === item.id}
                  color="primary"
                  checked={method === item.id}
                  label={item.title}
                />

                {item.icon && item.icon()}
              </AccordionSummary>

              <AccordionDetails>
                {item.content({
                  form,
                  maxAmount,
                  showButton,
                })}
              </AccordionDetails>
            </Accordion>
          ));
        }}
      </FormSpy>
    </div>
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["totalAmount", "maxAmount","showButton"]);
};

// export default MethodsContent;
export default React.memo(MethodsContent, isEqual);

const methods = [
  {
    id: MOMO_PAYMENT_WAY,
    title: MOMO_PAYMENT_WAY_TITLE,
    content: (props) => <MomoContent {...props} />,
    icon: () => (
      <img
        style={{ maxWidth: "28px", maxHeight: "28px", marginLeft: "8px" }}
        src={Phone}
        alt="Paiement par MoMo"
      />
    ),
  },
  {
    id: LOCAL_PAYMENT_WAY,
    title: LOCAL_PAYMENT_WAY_TITLE,
    content: () => <></>,
  },
  {
    id: VIREMENT_PAYMENT_WAY,
    title: VIREMENT_PAYMENT_WAY_TITLE,
    content: () => <></>,
  },
];

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);
