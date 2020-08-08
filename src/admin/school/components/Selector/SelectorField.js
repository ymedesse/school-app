import React from "react";
import MultipleSelector from "../../../../components/MultipleSelector";
import useSWR from "swr";
import { LIST_URL } from "../../containers/constants";
import context from "../../../context/AdminContext";

const CategorieSelector = ({
  fullWidth = true,
  variant,
  placeholder,
  helperText,
  labelText,
  handleChange,
  textFieldProps,
  value,
}) => {
  const adminContext = React.useContext(context);
  const { schools } = adminContext.school;

  const { data, error } = useSWR(LIST_URL, {
    refreshInterval: 0,
    revalidateOnFocus: true,
    initialData: schools,
    suspense: true,
  });

  if (error) {
    console.log({ error });
  }

  return (
    !error &&
    !data.error && (
      <>
        <MultipleSelector
          fullWidth={fullWidth}
          value={value}
          handleChange={handleChange}
          labelText={labelText}
          placeholder={placeholder}
          values={data}
          multiple={false}
          // defaultOption={true}
          textFieldProps={textFieldProps}
          variant={variant}
          helperText={helperText}
          getOptionLabel={(option) => option.name}
          disableCloseOnSelect={false}
        />
      </>
    )
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
