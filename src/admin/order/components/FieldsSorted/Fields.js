import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SortList from "../../../components/SortableList/SortList";
import CustomDialog from "../../../components/Dialog";
import { TitleTypography } from "../../../components/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

export default function Fields({ closeDialog, dialog = false, onSubmit }) {
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

  const content = (
    <>
      <Typography>
        Choisissez et définissez l'ordre des colonnes à suivre{" "}
      </Typography>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={6}>
          <TitleTypography>Colonne disponibles</TitleTypography>
          <SortList
            ietmIdField="id"
            itemLabelField="name"
            list={list}
            setList={setList}
            group="one"
          />
        </Grid>
        <Grid item xs={6}>
          <TitleTypography>Colonnes choisies</TitleTypography>
          <SortList
            ietmIdField="id"
            itemLabelField="name"
            list={list2}
            setList={setList2}
            group="one"
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <CustomDialog
        title={"Afficher les recherches suivant l'ordre des colonnes"}
        content={content}
        actions={
          <Box display="flex" p={0} style={{ width: "100%" }}>
            <Box ml={2} flexGrow={1}></Box>
            <Box p={0}>
              <Button onClick={() => closeDialog()} color="primary">
                Annuler
              </Button>
            </Box>
            <Button
              variant="contained"
              size="small"
              onClick={() => onSubmit({ list2, list })}
              color="primary"
              className={classes.button}
              autoFocus
            >
              Valider
            </Button>
          </Box>
        }
        closeDialog={closeDialog}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "8px",
  },
}));
