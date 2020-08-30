import React from "react";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import RemoveIcon from "@material-ui/icons/Remove";
// import purple from "@material-ui/core/colors/purple";
// import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import EditIcon from "@material-ui/icons/Edit";

import compareProps from "../../utils/compareProps";
import IconButtonMedia from "../../components/IconButtonMedia";

import {
  MiniLabelText,
  MiniValueText,
} from "../../components/LabelValueTypography";

const Row = ({ value = {}, handleRemove, handleEdit, id, index }) => {
  const { /*status,*/ school, classe, files, address, phone, mail } = value;

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
    <React.Fragment key={id || index}>
      <ListItem
        key={id || index}
        style={{ padding: "0px" }}
        ContainerComponent="div"
        dense
      >
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

          <Box textAlign="right" display="inline-flex" alignSelf="center">
            <IconButtonMedia
              color="primary"
              variant="text"
              icon={<EditIcon />}
              onClick={handleEdit && handleEdit}
              textButtonProps={{ label: "Modifier" }}
            />

            <IconButtonMedia
              variant="text"
              color="secondary"
              icon={<RemoveIcon />}
              onClick={handleRemove && handleRemove}
              textButtonProps={{ label: "Supprimer" }}
            />
          </Box>
        </Box>
      </ListItem>

      <Divider light={true} component="div" />
    </React.Fragment>
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["value"]);
};

export default React.memo(Row, isEqual);

// const useStyles = makeStyles((theme) => ({
//   status: {
//     color: (props) => props.statusColor || "inherit",
//   },
//   purple: {
//     color: purple[500],
//   },
// }));

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
