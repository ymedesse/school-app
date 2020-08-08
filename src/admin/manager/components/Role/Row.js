import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { TitleTypography } from "../../../../components/Typography";
import {
  EditIconButton,
  CancelIconButton,
} from "../../../../components/Buttons";
import Fade from "@material-ui/core/Fade";
import Chip from "@material-ui/core/Chip";

const Row = ({
  handleToggle,
  handleClick,
  handleUpdate,
  checked,
  checkable,
  value,
  isCurrent,
  handleDelete,
}) => {
  const classes = useStyles();

  const permissionsDisplay = () => {
    const permissions = value.permissions.map(
      (item) =>
        item && {
          name: (item.access || {}).name,
          id: (item.access || {}).id,
          level: item.level,
        }
    );
    return permissions.map((item) => (
      <Chip
        key={item.id}
        component="li"
        size="small"
        className={classes.path}
        label={item.name || item.id}
      />
    ));
  };

  return (
    <>
      <ListItem
        ContainerComponent="div"
        // component="div"
        role={undefined}
        dense
        button
        selected={isCurrent}
        onClick={() =>
          checkable ? handleToggle(value._id) : handleUpdate(value)
        }
      >
        {checkable && (
          <Fade in={checkable} timeout={2000}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value._id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": `product-list-${value._id}` }}
              />
            </ListItemIcon>
          </Fade>
        )}

        <ListItemText
          primary={
            <TitleTypography
              variant="subtitle1"
              color="primary"
              className={classes.inline}
            >
              {value.name}
            </TitleTypography>
          }
          secondary={permissionsDisplay()}
        />

        <ListItemSecondaryAction>
          <EditIconButton
            className={classes.inline}
            onClick={() => handleUpdate(value)}
            size="medium"
            aria-label="Modifier"
          />
          <CancelIconButton
            onClick={() => handleDelete(value._id)}
            size="medium"
            aria-label="action dépréciée: Supprimé?"
          />
        </ListItemSecondaryAction>
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

  path: {
    maxWidth: "fit-content",
    marginRight: "5px",
    background: `${theme.palette.background.default}`,
    color: `${theme.palette.text.default}`,
    height: "22px",
  },
}));
