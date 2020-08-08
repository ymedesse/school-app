import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SimpleObjectSelector from "../../../components/SimpleObjectSelector";

import { useState } from "reinspect";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { sluger } from "../../utils";
import AdminContext from "../../context/AdminContext";

//import { createCategory } from "../apiAdmin";
import {
  showLoading,
  Notifications
} from "../../../components/ShowApiNotification";
const CategoryForm = () => {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const adminContext = useContext(AdminContext);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const dataInit = {
    name: "",
    description: "",
    slug: "",
    parent: "",
    error: false,
    success: false,
    loading: false
  };

  const [values, setValues] = useState({
    ...dataInit,
    loading: false
  });
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { categories, createCategory } = adminContext.category;
  // destructure user and token from localstorage

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      loading: false,
      success: false,
      slug: name === "name" ? sluger(event.target.value) : values.slug,
      [name]: event.target.value
    });
  };

  const clickSubmit = async event => {
    event.preventDefault();
    // destructuration de la catégorie
    const { name, description, parent, slug } = values;

    setValues({ ...values, error: false, loading: true });

    const category = { name, description, parent, slug };
    // // requette à l'api pour crer une catégorie

    await createCategory(category, data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...dataInit,
          error: false,
          loading: false,
          success: category.name + " a été crée avec succèss"
        });
      }
    });
  };

  const newCategoryForm = (
    <form className={classes.container} noValidate autoComplete="on">
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <TextField
          variant="outlined"
          placeholder="Libeller"
          margin="dense"
          fullWidth
          className={classes.textField}
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange("name")}
          label="Libeller"
        />

        <TextField
          variant="outlined"
          placeholder="Slug"
          margin="dense"
          fullWidth
          className={classes.textField}
          type="text"
          name="slug"
          value={values.slug}
          onChange={handleChange("slug")}
          label="Slug"
        />

        <TextField
          variant="outlined"
          placeholder="description"
          fullWidth
          className={classes.textField}
          type="text"
          margin="dense"
          name="description"
          value={values.description}
          onChange={handleChange("description")}
          multiline
          rowsMax="4"
          label="Description"
        />

        <SimpleObjectSelector
          labelField="name"
          idField="_id"
          label="Parent"
          classes={classes}
          inputLabel={inputLabel}
          value={values.parent}
          handleChange={handleChange("parent")}
          labelWidth={labelWidth}
          values={categories}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={clickSubmit}
          fullWidth
        >
          Valider
        </Button>
      </Grid>
    </form>
  );
  return (
    <div style={{ padding: "16px 32px" }}>
      <Notifications
        notificationType="success"
        message={values.success}
        nextClose={() => setValues({ ...values, success: false })}
      />
      <Notifications
        notificationType="error"
        message={values.error}
        nextClose={() => setValues({ ...values, error: false })}
      />

      {showLoading(values.loading)}

      {newCategoryForm}
    </div>
  );
};

export default CategoryForm;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    marginTop: theme.spacing(1)
  },
  textField: {
    margin: theme.spacing(1, 0)
  },
  paper: {
    maxWidth: "500px",
    margin: "auto",
    padding: theme.spacing(5, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  fbk: {
    backgroundImage:
      "url(https://img.icons8.com/material/24/ffffff/facebook-f.png)"
  },
  fbkButton: {
    backgroundColor: "#164675",
    marginTop: theme.spacing(1)
  }
}));
