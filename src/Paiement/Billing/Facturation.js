import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SubmitButton from "./SubmitButton";
const Facturation = ({
  cart,
  updateCart,
  shippingPrice = 0,
  submitLabel,
  handleSubmit,
  endStep = false,
  isCommande = false,
  initialExpanded = false,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(initialExpanded);
  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  React.useEffect(() => {
    setExpanded(initialExpanded);
  }, [initialExpanded]);

  const { price, tva, sale_price = 0, discount, total } =
    cart.totalDetail || {};

  const getRemise = () => {
    return isCommande ? 0 : price - sale_price;
  };

  const getTotal = () => {
    return parseInt(total) || 0 + (shippingPrice || 0);
  };

  const title = isCommande
    ? " Montant de ma commande"
    : "Montant de mon panier";

  const submitButton = ({ fullWidth = false }) =>
    getTotal() > 0 && (
      <>
        <SubmitButton
          submitLabel={submitLabel}
          handleSubmit={handleSubmit}
          fullWidth={fullWidth}
          endStep={endStep}
        />
        <div className={classes.margin} /> <div className={classes.margin} />{" "}
      </>
    );

  const content = () => (
    <>
      <div className={classes.margin} />

      <div className={classes.subTotalRow}>
        <Typography variant="body2"> Total article </Typography>
        <Typography className={classes.montant} variant="subtitle2">
          {price} Fcfa
        </Typography>
      </div>

      {discount !== 0 && (
        <div className={classes.subTotalRow}>
          <Typography variant="body2"> Total remise </Typography>
          <Typography className={classes.montant} variant="subtitle2">
            {getRemise()} Fcfa
          </Typography>
        </div>
      )}

      <div className={classes.subTotalRow}>
        <Typography variant="body2"> Montant TVA </Typography>
        <Typography className={classes.montant} variant="subtitle2">
          {tva} Fcfa
        </Typography>
      </div>

      <div className={classes.subTotalRow}>
        <Typography variant="body2"> Livraison </Typography>
        <Typography className={classes.montant} variant="subtitle2">
          {shippingPrice} Fcfa
        </Typography>
      </div>

      {endStep && <Divider />}
      <div className={classes.subTotalRow}>
        <Typography variant="subtitle1" style={{ fontWeight: "500" }}>
          NET A PAYER
        </Typography>
        <Typography
          className={classes.montant}
          variant="subtitle1"
          style={{ fontWeight: "500" }}
        >
          {getTotal()} Fcfa
        </Typography>
      </div>

      <div className={classes.margin} />

      {submitButton({ fullWidth: true })}
    </>
  );

  return (
    <>
      <div style={{ textAlign: "end" }}>
        {!endStep && submitButton({ fullWidth: false })}
      </div>

      <Accordion
        expanded={expanded}
        onChange={handleChange}
        className={classes.paper}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="facturation"
          id="panel1bh-header"
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ textAlign: "center", fontWeight: "500" }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>{content()}</AccordionDetails>
      </Accordion>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
  },
  montant: {
    textAlign: "right",
    flexGrow: "1",
  },
  subTotalRow: {
    display: "flex",
    alignItems: "baseline",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonValidation: {
    borderRadius: "0px",
    textTransform: "unset",
    lineHeight: "1",
  },
}));

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      cart: prev ? prev.cart : {},
      isCommande: prev ? prev.cart : {},
      shippingPrice: prev ? prev.isCommande : 0,
    }) ===
    JSON.stringify({
      cart: next.cart,
      isCommande: next.isCommande,
      shippingPrice: next.shippingPrice,
    })
  );
};
export default React.memo(Facturation, isEqual);

const AccordionSummary = withStyles({
  root: {
    minHeight: 48,
    "&$expanded": {
      minHeight: 48,
    },
  },
  content: {
    margin: "0px",
    "&$expanded": {
      margin: "0px",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    display: "block",
    padding: "0px",
  },
})(MuiAccordionDetails);

const Accordion = withStyles({
  root: {
    "&$expanded": {
      margin: "0px",
    },
  },
  expanded: {},
})(MuiAccordion);
