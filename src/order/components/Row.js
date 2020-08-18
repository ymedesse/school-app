import React from "react";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import purple from "@material-ui/core/colors/purple";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { dateToTextNumber } from "../../utils";
import compareProps from "../../utils/compareProps";
import { getStatusColor } from "../container/utils";
import useMobile from "../../components/hook/useMediaDetector";
import { ButtonWithIcon } from "../../components/Buttons";

import {
  LabelText,
  ValueText,
  MiniLabelText,
} from "../../components/LabelValueTypography";

const MobileRow = ({ value = {}, handlePay, handleClick }) => {
  const isMobile = useMobile();
  const {
    status,
    totalAmount,
    leftToPay,
    /*type,*/ count,
    createdAt,
    id,
  } = value;

  const statusColor = getStatusColor(status.id);
  const classes = useStyles({ statusColor });

  return (
    <React.Fragment key={id}>
      <ListItem
        style={{ paddingRight: "0px", paddingLeft: "0px" }}
        ContainerComponent="div"
        dense
        button={isMobile}
        onClick={() => (isMobile ? handleClick() : () => {})}
      >
        <>
          <CssBaseline />
          <Box
            alignItems="center"
            display="flex"
            p={0}
            width="100%"
            minHeight={64}
          >
            <Box flexGrow={1}>
              <Box>
                <ValueText color="primary"> #{id} </ValueText>
                <ValueText component="span" className={classes.status}>
                  {` ${status.label}`}
                </ValueText>{" "}
              </Box>
              <Box>
                <MiniLabelText color="inherit">
                  {dateToTextNumber(createdAt)}
                </MiniLabelText>
                {leftToPay > 0 && (
                  <LabelText color="secondary">
                    {` solde dû ${leftToPay}`}
                  </LabelText>
                )}
              </Box>
            </Box>

            <Box textAlign="right" alignSelf="center">
              <LabelText style={{ display: "block" }} color="inherit">
                {`${count} produit${pluriel(count)}`}
              </LabelText>

              <ValueText variant="subtitle2" className={classes.purple}>
                {totalAmount} Fcfa
              </ValueText>
            </Box>

            {!isMobile && (
              <Box minWidth={115}>
                <ButtonWithIcon
                  variant="contained"
                  color="primary"
                  disableElevation
                  startIcon={<VisibilityIcon />}
                  onClick={handleClick}
                >
                  Voir
                </ButtonWithIcon>
                {leftToPay !== 0 && (
                  <Tooltip title="Payer" interactive>
                    <IconButton
                      size="small"
                      // style={{ padding: "4px" }}
                      onClick={handlePay}
                      color="secondary"
                    >
                      <CreditCardIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            )}
          </Box>
        </>
      </ListItem>

      <Divider variant="inset" component="div" />
    </React.Fragment>
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["value"]);
};

export default React.memo(MobileRow, isEqual);

const useStyles = makeStyles((theme) => ({
  status: {
    color: (props) => props.statusColor || "inherit",
  },
  purple: {
    color: purple[500],
  },
}));

const pluriel = (count) => {
  return count > 1 ? "s" : "";
};

// <ButtonWithIcon
// variant="outlined"
// color="secondary"
// disableElevation
// startIcon={<CreditCardIcon />}
// >
// Payer
// </ButtonWithIcon>
