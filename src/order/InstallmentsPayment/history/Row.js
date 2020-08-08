import React from "react";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import purple from "@material-ui/core/colors/purple";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { dateToTextNumber } from "../../../utils";
import compareProps from "../../../utils/compareProps";
import { getStatusColor } from "../../container/utils";
import useMobile from "../../../components/hook/useMediaDetector";

import {
  LabelText,
  ValueText,
  MiniLabelText,
} from "../../../components/LabelValueTypography";

const MobileRow = ({ value = {}, handleClick }) => {
  const isMobile = useMobile();
  const { method_title, date_paid, phone, status, amount, id } = value;

  const statusColor = getStatusColor(status.id);
  const classes = useStyles({ statusColor });

  return (
    <React.Fragment key={id}>
      <ListItem
        style={{ paddingRight: "0px", paddingLeft: "0px" }}
        ContainerComponent="div"
        dense
        button={isMobile}
        onClick={() => isMobile && handleClick()}
      >
        <>
          <CssBaseline />
          <Box
            alignItems="center"
            display="flex"
            p={0}
            width="100%"
            minHeight={40}
          >
            <Box flexGrow={1}>
              <Box>
                <ValueText color="primary"> {method_title} </ValueText>
                {status && (
                  <ValueText component="span" className={classes.status}>
                    {` ${status.label}`}
                  </ValueText>
                )}
              </Box>
              <Box>
                <MiniLabelText color="inherit">
                  {dateToTextNumber(date_paid)}
                </MiniLabelText>
                {phone && (
                  <LabelText color="inherit"> par le :{` ${phone}`}</LabelText>
                )}
              </Box>
            </Box>

            <Box textAlign="right" alignSelf="center">
              <ValueText variant="subtitle2" className={classes.purple}>
                {amount} Fcfa
              </ValueText>
            </Box>
          </Box>
        </>
      </ListItem>

      <Divider light component="div" />
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

// <ButtonWithIcon
// variant="outlined"
// color="secondary"
// disableElevation
// startIcon={<CreditCardIcon />}
// >
// Payer
// </ButtonWithIcon>
