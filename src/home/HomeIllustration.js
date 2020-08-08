import React from "./node_modules/react";
import Grid from "./node_modules/@material-ui/core/Grid";
import Button from "./node_modules/@material-ui/core/Button";
import { BigTypography, SubLargeTypography } from "./components/Typography";
import { useHistory } from "./node_modules/react-router-dom";
import { LinkButton } from "./components/Buttons";
import CircularProgress from "./node_modules/@material-ui/core/CircularProgress";
import NavigateNextIcon from "./node_modules/@material-ui/icons/NavigateNext";
import Box from "./node_modules/@material-ui/core/Box";

import { makeStyles } from "./node_modules/@material-ui/core/styles";
import { SCHOOL_LIST_LINK, CLASSES_LINK } from "./routerLinks";
import Banner from "./components/Banner";
import IconButtonMedia from "./components/IconButtonMedia";

const SchoolSelector = React.lazy(() => import("./fourniture/school/Selector"));

const Home = () => {
  const [currentSchool, setCurrentSchool] = React.useState();

  const classes = useStyles();
  const history = useHistory();

  const handleSchoolChange = (event) => {
    setCurrentSchool(event.target.value);
  };
  const handleClickAllSchool = () => {
    history.push(SCHOOL_LIST_LINK);
  };

  const handleClickSchool = () => {
    currentSchool && history.push(CLASSES_LINK + "/" + currentSchool.slug);
  };
  const showBanner = () => <Banner post={mainFeaturedPost} content={content} />;

  const content = (
    <Grid container style={{ minHeight: "400px" }}>
      <Grid item md={6}>
        <div className={classes.mainFeaturedPostContent}>
          <BigTypography
            color="inherit"
            component="h1"
            variant="h3"
            gutterBottom
          >
            Trouver votre liste de fourniture
          </BigTypography>
          <Box display="flex" mb={2} width="100%">
            <Box flexGrow={1}>
              <React.Suspense fallback={<CircularProgress />}>
                <SchoolSelector
                  fullWidth={true}
                  textFieldProps={{
                    style: {
                      backgroundColor: "#fff",
                    },
                  }}
                  placeholder="Sélectionner votre école ..."
                  handleChange={handleSchoolChange}
                />
              </React.Suspense>
            </Box>
            <Box>
              <IconButtonMedia
                size="large"
                icon={<NavigateNextIcon />}
                textButtonProps={{ label: "Continuer", end: true }}
                onClick={handleClickSchool}
                variant="contained"
                color="primary"
                disableElevation
              />
            </Box>
          </Box>

          <div style={{ textAlign: "center" }}>
            <SubLargeTypography>
              Vous ne trouvez pas votre école ?
            </SubLargeTypography>
            <div styme={classes.margin} />
            <LinkButton
              size="medium"
              variant="h6"
              onClick={handleClickAllSchool}
              color="secondary"
            >
              Consultez la liste des écoles
            </LinkButton>
            <div styme={classes.margin} />
            <Button color="inherit">Ajouter mon école</Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );

  return <>{showBanner()} </>;
};

export default Home;

const useStyles = makeStyles((theme) => ({
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
  grow: {
    flexGrow: 1,
  },
  margin: {
    marginBottom: theme.spacing(2),
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    right: 0,
    margin: "0 auto",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  suspense: {},
}));

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};
