import React from "react";
import MultipleSelector from "../../../../components/MultipleSelector";
import useSWR from "swr";
import compareProps from "../../../../utils/compareProps";

const StatusSelector = ({
  fullWidth = true,
  variant,
  placeholder,
  helperText,
  labelText,
  handleChange,
  fetcher,
  value,
  url,
}) => {
  const { data, error } = useSWR(url,fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: true,
    initialData: [],
    suspense: true,
  });

  if (error) {
  }

  const onChange = (event) => {
    handleChange(event.target.value);
  };

  return (
    !error &&
    !data.error && (
      <MultipleSelector
        fullWidth={fullWidth}
        // value={value}
        handleChange={onChange}
        labelText={labelText}
        placeholder={placeholder}
        values={data}
        multiple={false}
        defaultOption={true}
        variant={variant}
        helperText={helperText}
        getOptionLabel={(option) => option.label}
        disableCloseOnSelect={false}
      />
    )
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["value", "url"]);
};

export default React.memo(StatusSelector, isEqual);

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
