import React from "react";
import useSWR, { trigger } from "swr";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import yellow from "@material-ui/core/colors/yellow";

import { makeStyles } from "@material-ui/core/styles";
import insertListSvg from "../assets/insertList.svg";
import SwrRender from "../components/SwrRender";
import compareProps from "../utils/compareProps";
import Form from "./components/content";
import List from "./components/List";
import TransitionAlerts from "../Alert/TransitionAlert";

import useMediaDetector from "../components/hook/useMediaDetector";
import { TitleTypography } from "../components/Typography";
import { ValueText } from "../components/LabelValueTypography";

const HomeWished = ({
  url,
  handleSubmitInfo,
  handleSubmitListe,
  handleRemoveListe,
  performFullErrorAlert,
  performFullSuccessAlert,
  getFetcher,
  idField = "_id",
  newListe,
  ...restProps
}) => {
  const fetcher = getFetcher();
  const { data } = useSWR(url, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: true,
  });

  const getListCount = () => (data && data !== null ? data.listes.length : 0);
  const getValidData = () => (data && data !== null ? data : undefined);

  const refresh = () => {
    trigger(url);
  };

  const showList = () =>
    getListCount() > 0 ? (
      <>
        <TitleTypography style={{ marginLeft: "8px" }}>
          Vos listes de fournitures souhaitées
        </TitleTypography>
        <Template isList={true} newListe={newListe}>
          <List
            refresh={refresh}
            data={data}
            handleSubmitListe={handleSubmitListe}
            handleRemoveListe={handleRemoveListe}
            handleSubmitInfo={handleSubmitInfo}
            performFullErrorAlert={performFullErrorAlert}
            performFullSuccessAlert={performFullSuccessAlert}
          />
        </Template>
      </>
    ) : (
      notFoundCompenent()
    );

  const notFoundCompenent = () => (
    <>
      <TitleTypography style={{ marginLeft: "8px" }}>
        Ajouter votre lise de fourniture
      </TitleTypography>
      <Template>
        <Form
          data={getValidData()}
          refresh={refresh}
          handleSubmitListe={handleSubmitListe}
          handleSubmitInfo={handleSubmitInfo}
          performFullErrorAlert={performFullErrorAlert}
          performFullSuccessAlert={performFullSuccessAlert}
        />
      </Template>
    </>
  );

  return (
    <SwrRender data={data} notFoundCompenent={notFoundCompenent}>
      {showList}
    </SwrRender>
  );
};

const Template = ({ isList = false, children, newListe }) => {
  const classes = useStyles({ isList });
  const isMobile = useMediaDetector();

  return (
    <Grid
      container
      direction="row"
      justify={isMobile ? "center" : "flex-end"}
      alignItems="flex-start"
    >
      {isMobile && <NewAlert isMobile={isMobile} liste={newListe} />}

      <img
        className={classes.image}
        src={insertListSvg}
        alt={"ajouter votre liste"}
      />

      <div className={classes.bodyList}>
        {!isMobile && <NewAlert isMobile={isMobile} liste={newListe} />}

        <div className={classes.margin} />
        <div className={classes.margin} />

        <Paper className={classes.paper} elevation={4}>
          {children}
        </Paper>
      </div>
    </Grid>
  );
};

const NewAlert = ({ liste, isMobile }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (liste !== undefined) {
      setOpen(true);
      setTimeout(() => setOpen(false), 100000);
    }
  }, [liste]);

  const getName = () => liste.school + " / " + liste.classe.code;
  const classes = useStyles();

  const showText = () => (
    <>
      {" "}
      {`Votre demande d'ajout de la liste `}
      <div className={classes.alertName}>{getName()}</div>
      {` a été enregistrée avec succès. Nous vous contacterons le plus tôt possible!`}{" "}
    </>
  );

  return liste ? (
    <TransitionAlerts
      open={open}
      setOpen={setOpen}
      title={isMobile ? undefined : "Ajout de listes de fourniture"}
      severity="success"
      variant="filled"
      onClose={() => {}}
    >
      {isMobile ? <ValueText>{showText()}</ValueText> : showText()}
    </TransitionAlerts>
  ) : (
    <></>
  );
};

const isEqual = (prev, next) => {
  compareProps(prev, next, ["url", "newListe"]);
};

export default React.memo(HomeWished, isEqual);

const useStyles = makeStyles((theme) => ({
  bodyList: {
    zIndex: 1,
    width: (props) => (props.isList ? "900px" : "auto"),
  },
  paper: {
    padding: theme.spacing(3, 2),
    // minHeight: (props) => (props.isList ? "450px" : "auto"),
    zIndex: 1,
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  alertName: {
    fontWeight: "bold",
    color: "#F9A826",
    display: "inline",
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0px",
    },
  },
  image: {
    position: "absolute",
    left: "16px",
    maxWidth: "700px",
    // width: "550px",
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      maxWidth: "300px",
    },
  },
}));
