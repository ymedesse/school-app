import React from "react";
import { ReactSortable } from "react-sortablejs";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function SortList({
  ietmIdField = "id",
  itemLabelField = "name",
  list,
  setList,
  group,
}) {
  const classes = useStyles();

  return (
    <Paper square variant="outlined">
      <ReactSortable
        list={list}
        setList={setList}
        group={group}
        className={classes.group}
      >
        {list.map((item, index) => (
          <Paper
            elevation={1}
            key={index}
            id={`simple-item-${item.id}`}
            className={classes.content}
          >
            <Typography> {item.name}</Typography>
          </Paper>
        ))}
      </ReactSortable>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  group: {
    minHeight: "300px",
  },
  content: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    cursor: "grabbing",
  },
}));
