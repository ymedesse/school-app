import React from "react";
import Box from "@material-ui/core/Box";
import { LabelText, ValueText } from "../../components/LabelValueTypography";

const SubAmountRow = ({ label, amount, rowProps }) => {
  return (
    <Box width="100%" display="flex" {...rowProps}>
      <Box flexGrow={1}>
        <LabelText> {label} </LabelText>
      </Box>
      <Box>
        <ValueText> {amount}</ValueText>
      </Box>
    </Box>
  );
};

export default React.memo(SubAmountRow);
