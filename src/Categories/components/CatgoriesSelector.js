import React from "react";
import MultipleSelector from "../../components/MultipleSelector";
import useSWR from "swr";

import { LIST_SLUGS } from "../containers/constants";

const CategorieSelector = ({
  fullWidth = true,
  variant,
  placeholder,
  helperText,
  labelText,
  handleChange,
  value,
}) => {
  const { data, error } = useSWR(LIST_SLUGS, {
    refreshInterval: 0,
    revalidateOnFocus: true,
    initialData: [],
    suspense: true,
  });

  if (error) {
    console.log({ error });
  }
  
  return (
    <>
      <MultipleSelector
        fullWidth={fullWidth}
        value={value}
        handleChange={handleChange}
        labelText={labelText}
        placeholder={placeholder}
        values={data}
        multiple={false}
        defaultOption={true}
        variant={variant}
        helperText={helperText}
        getOptionLabel={(option) => option}
        disableCloseOnSelect={false}
      />
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      value: prev.value,
    }) ===
    JSON.stringify({
      value: next.value,
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
