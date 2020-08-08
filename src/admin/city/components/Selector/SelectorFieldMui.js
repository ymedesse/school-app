import React from "react";
import MultipleSelectorMUI from "../../../../components/MultipleSelectorMUI";
import { LIST_URL } from "../../containers/constants";
import useSWR from "swr";

const CategorieSelector = ({
  fullWidth = true,
  inputProps,
  variant,
  className = {},
  selectedValues,
  isNew = false,
  name = "city",
  required = false,
}) => {
  const { data, error } = useSWR(LIST_URL, {
    refreshInterval: 4000,
    revalidateOnFocus: false,
    suspense: true,
  });

  if (error) {
    console.log({ error });
  }

  const v = isNew ? {} : { selectedValues: selectedValues };

  return !error ? (
    <>
      <MultipleSelectorMUI
        name={name}
        required={required}
        variant={variant}
        fullWidth={fullWidth}
        inputProps={inputProps}
        optionFieldName="name"
        getOptionValue={(option) => option}
        getOptionLabel={(option) => option.name}
        placeholder="Sélectionner une ville"
        label="Ville"
        values={data || []}
        multiple={false}
        defaultOption={true}
        {...v}
        disableCloseOnSelect={false}
      />
    </>
  ) : (
    "Une erreur s'est produite"
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      // values: prev.values,
      selectedValues: prev ? prev.selectedValues : {},
    }) ===
    JSON.stringify({
      // values: next.values,
      selectedValues: next.selectedValues,
    })
  );
};

export default React.memo(CategorieSelector, isEqual);
