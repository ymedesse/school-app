import React from "react";
import MultipleSelectorMUI from "../../../../components/MultipleSelectorMUI";
import useSWR from "swr";
import context from "../../../context/AdminContext";

// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Chip from "@material-ui/core/Chip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
// import Grid from "@material-ui/core/Grid";
// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon color="primary" fontSize="small" />;

const RoleSelector = ({
  fullWidth = true,
  inputProps,
  variant,
  className,
  selectedValues,
  sourceRoles = [],
  classes = {},
}) => {
  const rootContext = React.useContext(context);

  const { getFetcher, getRolesUrl } = rootContext.manager;

  const url = getRolesUrl();
  const fetcher = getFetcher();

  const { data, error } = useSWR(url, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    suspense: true,
    initialData: sourceRoles,
  });

  if (error) {
    console.log({ error });
  }

  return (
    <>
      <MultipleSelectorMUI
        name="roles"
        className={className}
        variant={variant}
        fullWidth={fullWidth}
        inputProps={inputProps}
        optionFieldName="name"
        getOptionValue={(option) => option}
        placeholder="Rechercher des privillèges"
        label="Privillèges"
        values={data || []}
        selectedValues={selectedValues}
        defaultOption={true}
      />
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      // values: prev.values,
      selectedValues: prev ? prev.selectedValues : "",
    }) ===
    JSON.stringify({
      // values: next.values,
      selectedValues: next.selectedValues,
    })
  );
};

export default React.memo(RoleSelector, isEqual);

// const useStyles = makeStyles((theme) => ({
//   label: {
//     //  marginTop:"8px",
//     //  marginLeft:"4px",
//     height: "32px",
//   },
//   path: {
//     maxWidth: "fit-content",
//     marginLeft: "24px",
//     fontSize: "12px",
//     background: `${theme.palette.background.default}`,
//     color: `${theme.palette.text.default}`,
//     height: "20px",
//   },
// }));
