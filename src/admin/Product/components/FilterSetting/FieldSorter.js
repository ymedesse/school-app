import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

const SimpleSelector = React.lazy(() =>
  import("../../../../components/SimpleObjectSelector")
);

const FieldSorter = ({ updateValue }) => {
  //order: true => up

  const [values, setValues] = useState({
    order: true,
    sortBy: initValues[0],
  });

  const { order, sortBy } = values;

  const handleChange = (name) => (event) => {
    let val = name === "order" ? !values.order : event.target.value;
    const v = name === "order" ? (val ? "asc" : "desc") : val.id;

    setValues({ ...values, [`${name}`]: val });
    updateValue({ [`${name}`]: v });
  };

  return (
    <Box display="flex" width="170px">
      <Box flexGrow={1}>
        <React.Suspense
          fallback={<Skeleton variant="rect" width={170} height={35} />}
        >
          <SimpleSelector
            values={initValues}
            value={sortBy}
            handleChange={handleChange("sortBy")}
            labelId="field"
            variant="standard"
            fullWidth={true}
            labelField="label"
            idField="id"
            helper={"Ordonner la liste par "}
          />
        </React.Suspense>
      </Box>
      <Box m="auto">
        <IconButton
          onClick={handleChange("order")}
          aria-label="order"
          size="small"
          style={{ marginBottom: "16px" }}
        >
          {order && <ArrowDownwardIcon />}
          {!order && <ArrowUpwardIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default React.memo(FieldSorter);

const initValues = [
  {
    label: "Id",
    id: "id",
  },
  {
    label: "Nom",
    id: "name",
  },
  {
    label: "Tarif régulier",
    id: "content.regular_price",
  },
  {
    label: "Prix de vente",
    id: "content.sale_price",
  },
  {
    label: "Status",
    id: "content.status",
  },
  {
    label: "Total vendu",
    id: "content.total_sales",
  },
  {
    label: "Quantité en stock",
    id: "content.stock_quantity",
  },
];
