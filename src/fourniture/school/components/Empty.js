import React from "react";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import AddSvg from "../../../assets/addList.svg";
import { ButtonWithIcon } from "../../../components/Buttons";
import { LabelText } from "../../../components/LabelValueTypography";

const SchoolList = ({ url, setCurrentSearch, schoolId, ...restProps }) => {
  const classes = useStyles();

  return (
    <Grid
      style={{ padding: "16px" }}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <img className={classes.image} src={AddSvg} alt="Ajouter une ecole" />

      <div className={classes.textContainer}>
        <div className={classes.margin} />
        <LabelText className={classes.title}>
          Si vous ne trouvez pas votre école, ajoutez la et nous nous occupons
          de tous.
        </LabelText>

        <div className={classes.margin} />

        <ButtonWithIcon
          variant="contained"
          color="primary"
          onClick={() => {}}
          startIcon={<AddIcon />}
          className={classes.button}
        >
          Ajouter une école
        </ButtonWithIcon>
      </div>
    </Grid>
  );
};

export default React.memo(SchoolList);

const useStyles = makeStyles((theme) => ({
  image: {
    height: "250px",
    margin: "rigth",
    [theme.breakpoints.down("sm")]: {
      height: "200px",
      margin: "auto",
    },
  },

  textContainer: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },

  title: {
    fontSize: "1.4rem!important",
    maxWidth: "500px",
    display: "block!important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem!important",
    },
  },

  margin: {
    marginBottom: theme.spacing(1),
  },

  button: {
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1),
      width: "250px",
    },
  },
}));
