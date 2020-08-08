import React from "react";
import Box from "@material-ui/core/Box";

import SimpleSelector from "../../../../components/SimpleObjectSelector";
import { SaveIconButton, CancelIconButton } from "../../../../components/Buttons";

const ColumnSelector = ({ columns, handleValidate }) => {
  const [value, setValues] = React.useState(columns[0]);

  const handleChange = (event) => {
    let val = event.target.value;
    setValues(val);
  };

  return (
    <Box display="flex">
      <Box flexGrow={1} width="170px">
        <SimpleSelector
          values={columns}
          value={value}
          handleChange={handleChange}
          labelId={"columns"}
          variant="standard"
          fullWidth={true}
          labelField="label"
          idField="id"
          helper={"Choisissez une colonne"}
        />
      </Box>
      <Box m="auto">
        <SaveIconButton
          style={{ marginBottom: "16px" }}
          onClick={() => value && handleValidate({ ...value, showed: true })}
        />
      </Box>
      <Box m="auto">
        <CancelIconButton
          style={{ marginBottom: "16px" }}
          onClick={() => handleValidate(false)}
        />
      </Box>
    </Box>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({ column: prev.columns }) ===
    JSON.stringify({ column: next.columns })
  );
};

export default React.memo(ColumnSelector, isEqual);
