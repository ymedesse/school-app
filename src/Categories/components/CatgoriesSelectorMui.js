import React from "react";
import MultipleSelectorMUI from "../../components/MultipleSelectorMUI";
import context from "../../rootContext/context";

const CategorieSelector = ({
  fullWidth = true,
  inputProps,
  variant,
  className,
  selectedValues,
  name = "categories",
}) => {
  const rootContext = React.useContext(context);
  const {
    categories: stateCategories,
    getWooCategories,
  } = rootContext.wooCategory;

  const [categories, setCategories] = React.useState(stateCategories || []);

  const getCategoriesFromSite = () => {
    getWooCategories((data) => {
      data && !data.error && setCategories(data);
    });
  };

  React.useEffect(() => {
    if (stateCategories.length === 0) {
      getCategoriesFromSite();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MultipleSelectorMUI
        name={name}
        className={className}
        variant={variant}
        fullWidth={fullWidth}
        inputProps={inputProps}
        optionFieldName="slug"
        getOptionValue={(option) => option}
        placeholder="Rechercher les catégories"
        label="Catégories"
        values={categories}
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
