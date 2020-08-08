import React from "react";
import MultipleSelectorMUI from "../../components/MultipleSelectorMUI";
import useSWR from "swr";
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

import { LIST_URL } from "../containers/constants";

const CategorieSelector = ({
  fullWidth = true,
  inputProps,
  variant,
  className,
  selectedValues,
  sourceCategories = { categories: [] },
  classes = {},
}) => {
  const { data, error } = useSWR(LIST_URL, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    initialData: sourceCategories,
    suspense: false,
  });

  if (error) {
    console.log({ error });
  }

  // const optionRender = (option, { selected }) => (
  //   <>
  //     <Grid direction="column" spacing={0} container>
  //       <FormControlLabel
  //         className={nativeClasses.label}
  //         control={
  //           <Checkbox
  //             icon={icon}
  //             checkedIcon={checkedIcon}
  //             checked={selected}
  //           />
  //         }
  //         label={<Typography>{option.name}</Typography>}
  //       />
  //       <Chip
  //         component={Typography}
  //         className={nativeClasses.path}
  //         size="small"
  //         label={option.name}
  //       />
  //     </Grid>
  //   </>
  // );

  return (
    <>
      <MultipleSelectorMUI
        name="categories"
        className={className}
        variant={variant}
        fullWidth={fullWidth}
        inputProps={inputProps}
        optionFieldName="slug"
        getOptionValue={(option) => option}
        placeholder="Rechercher les catégories"
        label="Catégories"
        values={data.categories}
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
      selectedValues: prev.selectedValues,
    }) ===
    JSON.stringify({
      // values: next.values,
      selectedValues: next.selectedValues,
    })
  );
};

export default React.memo(CategorieSelector, isEqual);

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
