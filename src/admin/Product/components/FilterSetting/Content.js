import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomDialog from "../../../../components/Dialog";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SettingsList from "./List";
export default function Content({
  closeDialog,
  dialog = false,
  onSubmit,
  initOptions,
}) {
  const [options, setOptions] = React.useState([...initOptions]);

  const handleToggle = (id) => {
    const index = options.findIndex((item) => item.id === id);
    const newOption = options;
    if (index > -1) {
      const option = options[index];
      newOption[index] = { ...option, active: !option.active };
      setOptions([...newOption]);
    }
  };

  const classes = useStyles();

  const action = (
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
        onClick={() => onSubmit(options)}
        color="primary"
        className={classes.button}
        autoFocus
      >
        Valider
      </Button>
    </Box>
  );

  return (
    <>
      <CustomDialog
        title={"Afficher les recherches suivant l'ordre des colonnes"}
        content={<SettingsList options={options} handleToggle={handleToggle} />}
        actions={action}
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
