import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { TitleTypography } from "../../../../../components/Typography";
import { CancelIconButton } from "../../../../../components/Buttons";
import MultipleSelectorMUI from "../../../../../components/MultipleSelectorMUI";

import Fade from "@material-ui/core/Fade";

const PermissionRow = ({
  handleToggle,
  checked,
  checkable,
  permissions,
  handleDelete,
  index,
  field,
}) => {
  const classes = useStyles();

  const { access } = permissions;

  return (
    <>
      <ListItem
        ContainerComponent="div"
        // component="div"
        role={undefined}
        dense
        button
        onClick={() => checkable && handleToggle()}
      >
        {checkable && (
          <Fade in={checkable} timeout={2000}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(index) !== -1}
                tabIndex={-1}
                disableRipple
                // inputProps={{ "aria-labelledby": `product-list-${access.id}` }}
              />
            </ListItemIcon>
          </Fade>
        )}

        <ListItemText
          className={classes.inlineFlex}
          disableTypography
          primary={
            <TitleTypography
              variant="subtitle1"
              color="primary"
              className={classes.inline}
            >
              {access.name}
            </TitleTypography>
          }
          secondary={
            <div className={classes.selector}>
              <MultipleSelectorMUI
                name={`${field}.level`}
                optionFieldName="label"
                getOptionValue={(option) => option}
                placeholder="niveau"
                values={initValues}
                selectedValues={permissions.level}
                defaultOption={true}
                multiple={false}
                variant="standard"
                disableCloseOnSelect={false}
                fullWidth={true}
              />
            </div>
          }
        />

        <ListItemSecondaryAction>
          <CancelIconButton
            onClick={() => handleDelete()}
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
      permissions: prev.permissions,
    }) ===
    JSON.stringify({
      checked: next.checked,
      checkable: next.checkable,
      permissions: next.permissions,
    })
  );
};

export default React.memo(PermissionRow, isEqual);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  inlineFlex: {
    display: "inline-flex",
  },
  selector: {
    marginTop: theme.spacing(-1),
    width: "200px",
    marginRight: theme.spacing(2),
    marginLeft: "auto",
  },
  path: {
    maxWidth: "fit-content",
    marginRight: "5px",
    background: `${theme.palette.background.default}`,
    color: `${theme.palette.text.default}`,
    height: "22px",
  },
}));

const initValues = [
  { id: 0, label: "désactiver" },
  { id: 1, label: "lecture" },
  { id: 2, label: "lecture, écriture" },
  { id: 3, label: "lecture, écriture et suppression" },
];
