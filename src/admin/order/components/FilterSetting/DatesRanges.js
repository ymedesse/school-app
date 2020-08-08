import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: 200,
    display: "inline",
  },
}));

export default function DatesRanges({ handleFilter }) {
  const classes = useStyles();

  const [dates, setDates] = React.useState({
    begin: moment(),
    end: moment(),
  });
  const { begin, end } = dates;

  const handleChange = (name) => (event) => {
    event.persist();
    const value = event.target.value;

    setDates((dates) => ({
      ...dates,
      [`${name}`]: value,
    }));

    const val = [begin, end];
    if (name === "begin") val[0] = value;
    else val[1] = value;
    handleFilter(val);
  };

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local-begin"
        label="Début"
        type="datetime-local"
        // value={value}.target
        defaultValue={begin}
        onChange={handleChange("begin")}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        id="datetime-local-end"
        label="Fin"
        type="datetime-local"
        // value={value}.target
        defaultValue={end}
        onChange={handleChange("end")}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
