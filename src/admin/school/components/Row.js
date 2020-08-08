import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { TitleTypography } from "../../../components/Typography";
import { EditIconButton, CancelIconButton } from "../../../components/Buttons";
import Fade from "@material-ui/core/Fade";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const Row = ({
  handleToggle,
  checked,
  checkable,
  value,
  isCurrent,
  handleDelete,
  idField = "_id",
  handleUpdate,
  handleClick,
}) => {
  const classes = useStyles();

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
                  "aria-labelledby": `product-list-${value[`${idField}`]}`,
                }}
              />
            </ListItemIcon>
          </Fade>
        )}

        <ListItemAvatar>
          <Avatar variant="rounded" alt={value.name} src={value.image} />
        </ListItemAvatar>

        <ListItemText
          primary={
            <TitleTypography
              variant="subtitle2"
              color="primary"
              className={classes.inline}
            >
              {value.name}
            </TitleTypography>
          }
          secondary={`${value.address} -- ${value.phone}`}
        />
        {!checkable && (
          <ListItemSecondaryAction
            style={{ display: "inline-flex", padding: "4px 0px" }}
          >
            {handleUpdate && (
              <EditIconButton
                onClick={handleUpdate}
                size="medium"
                aria-label="Modifier"
              />
            )}
            <CancelIconButton
              onClick={handleDelete}
              size="medium"
              aria-label="action Supprimé?"
            />
          </ListItemSecondaryAction>
        )}
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
}));
