import React from "react";
import useSWR from "swr";
import SchoolIcon from "@material-ui/icons/School";
import LinearProgress from "@material-ui/core/LinearProgress";

import { /* useTheme, */ makeStyles } from "@material-ui/core/styles";

import HomeIcon from "@material-ui/icons/Home";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { LIST_FOURNITURE_URL } from "../containers/constants";

import Breadcrumbs from "../../Breadcrumbs";
import Products from "./components/Products";
import { SCHOOL_LIST_LINK, CLASSES_LINK } from "../../routerLinks";
import { LargeTypography } from "../../components/Typography";
import SwrRender from "../../components/SwrRender";
import { LabelText } from "../../components/LabelValueTypography";

const Fournitures = ({ schoolSlug, classeSlug, ...props }) => {
  const url = `${LIST_FOURNITURE_URL}${schoolSlug}/${classeSlug}`;
  const classes = useStyles();
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data } = useSWR(url, {
    refreshInterval: 50000,
    revalidateOnFocus: true,
  });

  const getBread = () => {
    const { school, classe } = data;
    return (
      <Box display="flex" p={0} style={{ width: "100%" }}>
        <Box alignSelf="center" flexGrow={1}>
          <Breadcrumbs breads={getBreadcrumbsRoute(school, classe)} />
        </Box>
        {/* <Box p={0}>
          <ButtonWithIcon variant="text" startIcon={<ShareIcon />}>
            {!isMobile && "Partager cette liste"}
          </ButtonWithIcon>
        </Box> */}
      </Box>
    );
  };

  const getHeader = () => {
    const { school, classe } = data;
    return (
      <>
        {getBread(school, classe)}
        <LabelText variant="h6">{`Listes des manuels de `}</LabelText>
        <LargeTypography className={classes.titleName}>
          {school.name} - {classe.code}
        </LargeTypography>
      </>
    );
  };

  const getBreadcrumbsRoute = (school, classe) => {
    const routes = [
      {
        name: "Acceuil",
        icon: (props) => <HomeIcon {...props} />,
        href: "/",
      },
      {
        name: "Ecoles",
        icon: (props) => <SchoolIcon {...props} />,
        href: SCHOOL_LIST_LINK,
      },
      {
        name: school.name,
        href: CLASSES_LINK + "/" + school.slug,
      },
      {
        name: classe.code,
      },
    ];
    return routes;
  };

  const getData = () => {
    return data;
  };

  return (
    <SwrRender data={data}>
      {() => (
        <>
          {" "}
          {getHeader()}
          <Grid spacing={2} container>
            <Grid item sm={8}>
              <React.Suspense fallback={<LinearProgress />}>
                <Products data={getData()} />
              </React.Suspense>
            </Grid>
            <Grid item sm={4}>
              {/* <Paper>Pulicité</Paper> */}
            </Grid>
          </Grid>
        </>
      )}
    </SwrRender>
  );
};

export default React.memo(Fournitures);

const useStyles = makeStyles((theme) => ({
  titleName: {
    display: "inline",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  suspense: {},
}));
