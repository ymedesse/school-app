import React, { lazy } from "react";
import {
  TitleTypography,
  SubLargeTypography,
} from "../../../components/Typography";
import { useHistory } from "react-router-dom";
import LazyLoad from "../../../components/LazyLoad";

import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ErrorMessage from "../../../components/ErrorMessage";
import useSWR from "swr";
import { LIST_FOURNITURE_LINK } from "../../../routerLinks";

const FournituresRow = lazy(() => import("./Row"));

const ClasseList = ({ url, setCurrentSearch, schoolId, ...restProps }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const { data } = useSWR(url, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
  });

  const handleClick = (item) => {
    const { school, classe } = item;
    history.push(LIST_FOURNITURE_LINK + "/" + school.slug + "/" + classe.slug);
  };

  function rowRenderer(item, index) {
    const { classe } = item;
    return (
      <div key={item._id}>
        <LazyLoad key={item._id}>
          <FournituresRow
            isMobile={isMobile}
            value={classe}
            handleClick={() => handleClick(item)}
          />
        </LazyLoad>
      </div>
    );
  }

  const error = !data ? true : data && data.error;
  const count = !error ? data.length : 0;

  const getHeader = () => {
    const item = data[0];
    return (
      item && (
        <SubLargeTypography style={{ margin: "8px" }}>
          Listes des fournitures de {item.school.name}{" "}
        </SubLargeTypography>
      )
    );
  };

  return !error ? (
    <Paper square variant="outlined" className={classes.paper}>
      {count > 0 ? (
        <>
          {getHeader()}
          <TitleTypography style={{ marginLeft: "8px", fontWeight: "300" }}>
            Sélectionnez une classe
          </TitleTypography>
          <List className={classes.root}>
            {data.map((item, index) => rowRenderer(item, index))}
          </List>
        </>
      ) : (
        <TitleTypography style={{ padding: "5px 15px" }}>
          Aucune liste de fourniture n'est encore disponible pour cette école
        </TitleTypography>
      )}
    </Paper>
  ) : (
    <ErrorMessage />
  );
};

export default React.memo(ClasseList);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    flexGrow: 1,
    width: "100%",
    minHeight: "400px",
  },
  paper: {
    padding: theme.spacing(1),
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
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    right: 0,
    margin: "0 auto",
  },
  suspense: {},
}));
