/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { ClearIconButton } from "./assets";

export default function ChipedTextFields() {
  const [values, setValues] = useState([]);
  const [init, setInit] = useState("");
  const classes = useStyles();
  const action = value => {
      
    if (value.includes(",")) {
      const f = value.charAt(value.length - 1);
      if (f === ",") value = value.slice(0, -1);
      const val = value.split(",");
      let m = [];
      for (let i = 0; i < val.length; i++) {
        m.push(val[i]);
      }
      setValues([...new Set([...values, ...m])]);
      setInit("");
    } else {
      setInit(value);
    }
  };

  const handleDelete = data => () => {
    setValues(values => values.filter(item => item !== data));
  };

  return (
    <>
      <Paper noValidate autoComplete="on" className={classes.root}>
        <div style={{ maxWidth: "70%" }}>
          {values.map(data => {
            return (
              <Chip
                key={data}
                label={data}
                onDelete={handleDelete(data)}
                className={classes.chip}
              />
            );
          })}
        </div>
        <InputBase
          className={classes.input}
          placeholder="Search Google Maps"
          value={init}
          fullWidth
          onChange={e => action(e.target.value)}
          noValidate
          multiline
        />
        <ClearIconButton
          onClick={() => {
            setValues([]);
          }}
          className={classes.iconButton}
          aria-label="clear"
        />
      </Paper>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));
