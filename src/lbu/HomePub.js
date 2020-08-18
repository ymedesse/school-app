import React from "react";
import Button from "@material-ui/core/Button";
import purple from "@material-ui/core/colors/purple";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { LargeTypography, BigTypography } from "../components/Typography";
import PhonelinkIcon from "@material-ui/icons/Phonelink";
import lbuBrowser from "../assets/lbuBrowser.svg";
import lbuLogo from "../assets/logolbu.png";
import Link from "@material-ui/core/Link";
import { LBU_SITE } from "./constant";
import useMediaDetector from "../components/hook/useMediaDetector";

const LbuHomePub = () => {
  const classes = useStyles();
  const isMobile = useMediaDetector();

  const handleClick = () => {
    var win = window.open(LBU_SITE, "_blank");
    win.focus();
  };

  const title = () => (
    <BigTypography className={classes.title} color="inherit" gutterBottom>
      Trouvez plus de choix de produits sur notre site
    </BigTypography>
  );
  const showUrl = () => (
    <LargeTypography className={classes.link}>
      <Link href={LBU_SITE}>www.librairielbu.com</Link>
    </LargeTypography>
  );
  const showLogo = () => (
    <img className={classes.logo} src={lbuLogo} alt="librairie LBU" />
  );

  return (
    <div className={classes.root}>
      <Grid className={classes.content} container>
        {isMobile && (
          <div style={{ textAlign: "center" }}>
            {title()}
            {showLogo()}
            {showUrl()}
          </div>
        )}

        <Grid item xs={12} sm={5}>
          <img
            className={classes.image}
            src={lbuBrowser}
            alt="librairielbu.com"
          />
        </Grid>

        <Grid item style={{ textAlign: "center" }} sm={7} xs={12}>
          <div className={classes.margin} />
          {!isMobile && title()}
          <div className={classes.margin} />

          {!isMobile && showLogo()}
          {!isMobile && showUrl()}

          <Button
            // size="medium"
            // variant="h6"
            onClick={handleClick}
            className={classes.buttonValidation}
            startIcon={<PhonelinkIcon />}
            size={isMobile ? "small" : "large"}
            variant="contained"
            color="primary"
            disableElevation
          >
            Visiter
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default LbuHomePub;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    backgroundColor: "#fff",
    position: "absolute",
    width: "100%",
    left: "0px",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(5),
    },
  },
  margin: {
    marginBottom: theme.spacing(2),
  },

  buttonValidation: {
    textTransform: "unset",
    lineHeight: "1",
    alignSelf: "center",
    marginTop: "16px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  title: {
    fontWeight: "400",
    color: purple[800],
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },

  link: {
    fontWeight: "500",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
    },
  },

  validationBox: {
    alignSelf: "center",
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(0),
    },
  },

  image: {
    width: "400px",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      width: "250px",
      display: "block",
      margin: "auto",
    },
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      width: "80px",
    },
  },

  content: {
    margin: "auto",
    width: "1232px",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    padding: "32px",
  },
  suspense: {},
}));
