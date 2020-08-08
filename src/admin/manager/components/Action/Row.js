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
import Skeleton from "@material-ui/lab/Skeleton";
const EditForm = React.lazy(() => import("./Form"));

const Row = ({
  handleToggle,
  handleClick,
  checked,
  checkable,
  value,
  isCurrent,
  submitUpdate,
  handleDelete,
}) => {
  const classes = useStyles();

  const editableButton = (
    <React.Suspense
      fallback={<Skeleton variant="circle" width={40} height={40} />}
    >
      <EditForm
        submit={submitUpdate}
        actionButton={(handleDialogClick) => (
          <EditIconButton
            onClick={handleDialogClick}
            size="medium"
            aria-label="Modifier"
          />
        )}
        value={value}
      />
    </React.Suspense>
  );

  return (
    <>
      <ListItem
        ContainerComponent="div"
        // component="div"
        role={undefined}
        dense
        button
        selected={isCurrent}
        onClick={() => checkable && handleToggle(value._id)}
      >
        {checkable && (
          <Fade in={checkable} timeout={2000}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value._id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": `product-list-${value.id}` }}
              />
            </ListItemIcon>
          </Fade>
        )}

        <ListItemText
          disableTypography
          primary={
            <TitleTypography variant="subtitle2" color="primary">
              {value.name}
            </TitleTypography>
          }
          secondary={value.id}
        />
        {!checkable &&
          (!value.depreciated ? (
            <ListItemSecondaryAction>
              {submitUpdate && editableButton}
            </ListItemSecondaryAction>
          ) : (
            <CancelIconButton
              onClick={() => handleDelete(value._id)}
              size="medium"
              aria-label="action dépréciée: Supprimé?"
            />
          ))}
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
