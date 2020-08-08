/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { ClearIconButton } from "./assets";
import Grid from "@material-ui/core/Grid";

const ChipedTextFields = ({ fields, placeholder }) => {
  const [init, setInit] = useState("");
  const classes = useStyles();

  const action = value => {
    if (value.includes(",")) {
      const f = value.charAt(value.length - 1);
      if (f === ",") value = value.slice(0, -1);
      const val = value.split(",");
      for (let i = 0; i < val.length; i++) {
        fields.push(val[i]);
        fields.value = ["moi"];
      }
      setInit("");
    } else {
      setInit(value);
    }
  };

  const handleDelete = index => {
    fields.remove(index);
  };
  const clear = () => {
    const n = fields.length;
    for (let i = 0; i < n; i++) {
      fields.pop();
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        // noValidate
        // autoComplete="on"
        component={Grid}
        container
        variant="outlined"
        className={classes.root}
      >
        <Grid item>
          {fields.value.map((data, index) => {
            return (
              <Chip
                key={data}
                label={data}
                onDelete={() => handleDelete(index)}
                className={classes.chip}
              />
            );
          })}
        </Grid>
        <InputBase
          className={classes.input}
          placeholder={placeholder}
          value={init}
          fullWidth
          onChange={e => action(e.target.value)}
          noValidate
          multiline
        />
        <ClearIconButton
          onClick={clear}
          className={classes.iconButton}
          aria-label="clear"
        />
      </Paper>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  },
  input: {
    marginLeft: theme.spacing(1),
    minWidth: "50px",
    flex: 1
  },
  chip: {
    margin: theme.spacing(0.2)
  }
  // iconButton: {
  //   padding: 10
  // },
}));

export default ChipedTextFields;
