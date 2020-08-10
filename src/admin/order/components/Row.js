import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import purple from "@material-ui/core/colors/purple";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import { dateToText } from "../../../utils";
import { getStatusColor } from "../container/utils";

import {
  ValueText,
  MiniValueText,
  MiniLabelText,
} from "../../../components/LabelValueTypography";

const Row = ({
  handleToggle,
  checked,
  checkable,
  value = {},
  isCurrent,
  idField = "_id",
  handleClick,
}) => {
  const {
    customerData,
    shipping,
    id,
    createdAt,
    count,
    status,
    totalAmount,
    leftToPay,
    localStatus,
  } = value;

  const statusColor = getStatusColor(status);
  const localColor = getStatusColor(localStatus.id);

  const classes = useStyles({ statusColor, localColor });
  const { email } = customerData || shipping.address || {};

  return (
    <>
      <ListItem
        ContainerComponent="div"
        role={undefined}
        dense
        button
        selected={isCurrent}
        onClick={() =>
          checkable ? handleToggle(value[`${idField}`]) : handleClick()
        }
      >
        {checkable && (
          <Fade in={checkable} timeout={2000}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value[`${idField}`]) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `value-list-${value[`${idField}`]}`,
                }}
              />
            </ListItemIcon>
          </Fade>
        )}

        <ListItemText
          disableTypography
          primary={
            <Box display="flex" p={0} style={{ width: "100%" }}>
              <Box flexGrow={1}>
                <Box>
                  <ValueText color="textPrimary">{`# ${id} `}</ValueText>
                  <ValueText className={classes.status}>
                    {` ${status.label}`}
                  </ValueText>
                </Box>
                <MiniLabelText>{email}.</MiniLabelText>
                {leftToPay > 0 && (
                  <MiniValueText color="secondary">{` A solder:${leftToPay}`}</MiniValueText>
                )}
                <br />
                <MiniLabelText>{dateToText(createdAt)}</MiniLabelText>/ loc :
                <MiniLabelText className={classes.localStatus}>
                  {localStatus.label.toLowerCase()}{" "}
                </MiniLabelText>
              </Box>
              <Box textAlign="right" minWidth={"max-content"}>
                {" "}
                <ValueText className={classes.totalAmount}>
                  {totalAmount} f
                </ValueText>
                <MiniLabelText color="inherit">{`${count} prod`}</MiniLabelText>
              </Box>
            </Box>
          }
        />
      </ListItem>

      {/* <Divider variant="inset" component="div" /> */}
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      checked: prev.checked,
      checkable: prev.checkable,
      value: prev.value,
      isCurrent: prev.isCurrent,
    }) ===
    JSON.stringify({
      checked: next.checked,
      checkable: next.checkable,
      value: next.value,
      isCurrent: next.isCurrent,
    })
  );
};

export default React.memo(Row, isEqual);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  status: {
    color: (props) => props.statusColor || "inherit",
  },
  totalAmount: {
    color: purple[500],
    display: "block !important",
  },
}));
