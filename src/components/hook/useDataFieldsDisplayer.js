import React from "react";
import { ValueText, LabelText } from "../LabelValueTypography";
import Grid from "@material-ui/core/Grid";
import { LargeTypography } from "../Typography";
const useDataFieldsDisplayer = (data) => {
  const displayField = (val, index, { itemGridProps }, dataSource) => {
    const {
      label,
      field = "",
      formator = (v) => v,
      breackpoint = { xs: 12 },
    } = val;

    
    const value = dataSource[`${field}`];
    const key = field === "" ? index : field;
    return (
      <Grid item {...breackpoint} {...itemGridProps} key={key}>
        <LabelText> {`${label} : `} </LabelText>
        <ValueText>{formator(value)}</ValueText>
      </Grid>
    );
  };

  /**
   *
   * @param {Array} config [{label:String,field:String,formator:(v)=>v}]
   * @param {object} itemGridProps {spacing, etc...}
   *
   */
  const displayFields = (
    config = [],
    { itemGridProps, rootGridProps, title, titleProps },
    source
  ) => {
    const dataSource = source || data;
    const count = dataSource ? config.length : 0;
    return (
      <>
        {title && (
          <LargeTypography style={{ marginBottom: "8px" }} {...titleProps}>
            {title}
          </LargeTypography>
        )}
        {count > 0 ? (
          <Grid container {...rootGridProps}>
            {config.map((item, index) =>
              displayField(item, index, { itemGridProps }, dataSource)
            )}
          </Grid>
        ) : (
          <LabelText>Aucune ligne à afficher</LabelText>
        )}
      </>
    );
  };

  return { displayFields };
};

export default useDataFieldsDisplayer;
