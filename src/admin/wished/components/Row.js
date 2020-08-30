import React from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import RemoveIcon from "@material-ui/icons/Remove";

import IconButtonMedia from "../../../components/IconButtonMedia";

import {
  MiniValueText,
  MiniLabelText,
} from "../../../components/LabelValueTypography";
import Fade from "@material-ui/core/Fade";

const Row = ({
  handleToggle,
  checked,
  checkable,
  handleClick,
  value,
  isCurrent,
  handleDelete,
  idField = "_id",
  handleUpdate,
}) => {
  // const classes = useStyles();

  const { /*status,*/ school, classe, files, address, phone, mail } = value;
  console.log({ value });

  const filesCount = (files || []).length;

  const validField = (field) => field && field !== "";
  const showInfo = () => {
    const infos = [];
    validField(phone) && infos.push({ value: phone, label: "Contact : " });
    validField(address) && infos.push({ label: "Address  : ", value: address });
    validField(mail) && infos.push({ label: "Email  : ", value: mail });
    const length = infos.length;
    return infos.map((item, index) => (
      <React.Fragment key={index}>
        <MiniLabelText>{item.label}</MiniLabelText>
        <MiniValueText>{item.value}</MiniValueText>
        {length > 1 && index !== length ? (
          <MiniLabelText>{` ,`} </MiniLabelText>
        ) : (
          ""
        )}
      </React.Fragment>
    ));
  };

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

        <Box
          alignItems="center"
          display="flex"
          p={0}
          width="100%"
          minHeight={64}
        >
          <Box flexGrow={1}>
            <Box>
              <MiniValueText color="primary" component="span">
                {` ${school} / ${classe.code}`}
              </MiniValueText>{" "}
            </Box>

            <Box>
              {showInfo()}
              <MiniLabelText>{`${filesCount} fichiers joint${pluriel(
                filesCount
              )}`}</MiniLabelText>
            </Box>
          </Box>

          {!checkable && (
            <Box textAlign="right" display="inline-flex" alignSelf="center">
              <IconButtonMedia
                color="primary"
                variant="text"
                icon={<EditIcon />}
                onClick={handleUpdate && handleUpdate}
                textButtonProps={{ label: "Modifier" }}
              />

              <IconButtonMedia
                variant="text"
                color="secondary"
                icon={<RemoveIcon />}
                onClick={handleDelete && handleDelete}
                textButtonProps={{ label: "Supprimer" }}
              />
            </Box>
          )}
        </Box>
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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: "36ch",
//     backgroundColor: theme.palette.background.paper,
//   },
//   inline: {
//     display: "inline",
//   },
// }));

const pluriel = (count) => {
  return count > 1 ? "s" : "";
};
