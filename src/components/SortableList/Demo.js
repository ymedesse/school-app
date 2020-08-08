import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SortList from "./SortList";

export default function App() {
  const [list, setList] = useState([
    { id: "1", name: "name" },
    { id: "2", name: "name2" },
    { id: "3", name: "name3" },
  ]);

  const [list2, setList2] = useState([
    { id: "4", name: "name4" },
    { id: "5", name: "name5" },
    { id: "6", name: "name6" },
  ]);

  const classes = useStyles();
  
  return (
    <Grid container className={classes.root}>
      <Grid item xs={6}>
        <SortList
          ietmIdField="id"
          itemLabelField="name"
          list={list}
          setList={setList}
          group="one"
        />
      </Grid>
      <Grid item xs={6}>
        <SortList
          ietmIdField="id"
          itemLabelField="name"
          list={list2}
          setList={setList2}
          group="one"
        />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  }
}));
