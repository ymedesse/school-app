import React from "react";
import Box from "@material-ui/core/Box";
import SimpleSelector from "../../../../components/SimpleSelector";
import { CancelIconButton } from "../../../../components/Buttons";
const CatgoriesSelector = React.lazy(() =>
  import("../../../../Categories/components/CatgoriesSelector")
);
// import IconButton from "@material-ui/core/IconButton";

const FieldSorter = ({ column, updateValue }) => {
  const handleChange = (name) => (event) => {
    if (name === "delete") {
      updateValue({ ...column, showed: false, value: undefined });
    } else {
      let val = event.target.value;

      val === "" && updateValue({ ...column, value: "" });
      val !== "" && updateValue({ ...column, value: val });
    }
  };

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        {column.id === "category" ? (
          <React.Suspense fallback="loading">
            <div style={{ width: "270px" }}>
              <CatgoriesSelector
                variant="standard"
                helperText={"Filtrer par " + column.label}
                handleChange={handleChange("filter")}
                value={column.value || ""}
              />
            </div>
          </React.Suspense>
        ) : (
          <div style={{ width: "170px" }}>
            <SimpleSelector
              values={column.values}
              value={column.value || ""}
              handleChange={handleChange("filter")}
              labelId={column.id}
              variant="standard"
              fullWidth={true}
              labelField="label"
              idField="id"
              helper={"Filtrer par " + column.label}
            />
          </div>
        )}
      </Box>
      <Box m={"auto"}>
        <CancelIconButton
          onClick={handleChange("delete")}
          style={{ marginBottom: "16px" }}
        />
      </Box>
    </Box>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({ column: prev.column }) ===
    JSON.stringify({ column: next.column })
  );
};

export default React.memo(FieldSorter, isEqual);
