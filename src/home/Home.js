import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import purple from "@material-ui/core/colors/purple";
import Link from "@material-ui/core/Link";

import Box from "@material-ui/core/Box";
import bannerImag from "../assets/emptyHome.svg";
import { makeStyles } from "@material-ui/core/styles";
import { SCHOOL_LIST_LINK, CLASSES_LINK } from "../routerLinks";
import { LabelText, ValueText } from "../components/LabelValueTypography";
import { BigTypography, SubLargeTypography } from "../components/Typography";
import HomePub from "../lbu/HomePub";

import useMediaDetector from "../components/hook/useMediaDetector";
const SchoolSelector = React.lazy(() =>
  import("../fourniture/school/Selector")
);

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaDetector();

  const [currentSchool, setCurrentSchool] = React.useState();

  const handleSchoolChange = (event) => {
    setCurrentSchool(event.target.value);
  };
  const handleClickAllSchool = (e) => {
    e.preventDefault();
    history.push(SCHOOL_LIST_LINK);
  };

  const handleClickSchool = () => {
    currentSchool && history.push(CLASSES_LINK + "/" + currentSchool.slug);
  };
  // const showBanner = () => <Banner post={mainFeaturedPost} content={content} />;

  const title = (
    <BigTypography
      color="inherit"
      component="h1"
      variant={!isMobile ? "h3" : "h5"}
      className={classes.title}
      gutterBottom
    >
      Servez vous vos listes de fournitures
    </BigTypography>
  );

  const content = (
    <Grid
      className={classes.root}
      container
      direction={isMobile ? "column-reverse" : "row"}
    >
      <Grid item sm={6} xs={12}>
        <div className={classes.main}>
          {!isMobile && title}
          <LabelText>Sélectionner une école </LabelText>
          <Box className={classes.inlineBlock} mb={2} width="100%">
            <Box flexGrow={1}>
              <React.Suspense fallback={<CircularProgress />}>
                <SchoolSelector
                  fullWidth={true}
                  placeholder="Chercher par le nom de école ..."
                  handleChange={handleSchoolChange}
                />
              </React.Suspense>
            </Box>
            <Box className={classes.validationBox}>
              <Button
                // size="medium"
                // variant="h6"
                className={classes.buttonValidation}
                endIcon={<NavigateNextIcon />}
                size={isMobile ? "small" : "large"}
                onClick={handleClickSchool}
                variant="contained"
                color="primary"
                disableElevation
              >
                Continuer
              </Button>
            </Box>
          </Box>

          <div className={classes.text}>
            <div styme={classes.margin} />
            {isMobile ? (
              <LabelText>Vous ne trouvez pas votre école ?</LabelText>
            ) : (
              <SubLargeTypography>
                Vous ne trouvez pas votre école ?
              </SubLargeTypography>
            )}

            <ValueText className={classes.seconButton} color="secondary">
              <Link
                color="secondary"
                underline="none"
                href={SCHOOL_LIST_LINK}
                onClick={handleClickAllSchool}
              >
                Consultez la liste des écoles
              </Link>
            </ValueText>

            <LabelText> ou </LabelText>
            <ValueText className={classes.seconButton} color="secondary">
              <Link
                color="primary"
                href="#"
                underline="none"
                onClick={() => {}}
              >
                Ajouter votre école
              </Link>
            </ValueText>
          </div>
        </div>
      </Grid>
      <Grid item sm={6} xs={12}>
        {isMobile && title}

        <img
          className={classes.image}
          src={bannerImag}
          alt={"Choisir votre école"}
        />
      </Grid>
    </Grid>
  );

  return (
    <div>
      {content}
      <HomePub />
    </div>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(4, 4),
  },
  appBar: {
    top: "auto",
    bottom: 0,
    position: "sticky",
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(2),
  },

  inlineBlock: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "inline-block",
    },
  },

  grow: {
    flexGrow: 1,
  },

  margin: {
    marginBottom: theme.spacing(2),
  },

  buttonValidation: {
    borderRadius: "0px",
    textTransform: "unset",
    lineHeight: "1",
    alignSelf: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    right: 0,
    margin: "0 auto",
  },
  seconButton: {
    display: "inline",
    textTransform: "unset",
    fontSize: "1.1rem",
    //  color: theme.palette.grey["A400"],
    lineHeight: "3",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "2!important",
      fontSize: "1rem!important",
    },
  },
  main: {
    margin: theme.spacing(3),
  },
  text: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  title: {
    fontWeight: "500",
    color: purple[800],
  },

  validationBox: {
    alignSelf: "center",
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(0),
    },
  },
  image: {
    width: "550px",
    [theme.breakpoints.down("sm")]: {
      width: "290px",
      display: "block",
      margin: "auto",
      marginTop: "-24px",
    },
  },
  suspense: {},
}));
