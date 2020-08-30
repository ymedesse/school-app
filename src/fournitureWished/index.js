import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import HomeWished from "./HomeWished";
import SubHeader from "../components/PageSubHeader";
import useRootState from "../rootContext/useRootState";

import { LIST_FOURNITURE_WISH_LINK } from "../routerLinks";

const FournituesWished = ({ ...props }) => {
  const stateGetter = useRootState();
  const alert = stateGetter("alert");
  const wishedList = stateGetter("wishedList");
  const [newListe, setNewListe] = React.useState();

  const { performFullErrorAlert, performFullSuccessAlert } = alert;
  const {
    getFetcher,
    getReadUrl,
    updateOneListe,
    removeOne,
    updateInfo,
  } = wishedList;

  const url = getReadUrl();

  const handleSubmitListe = (values, next) => {
    const title = "Ajout de liste de fournitures";
    updateOneListe(values, (data) => {
      if (data) {
        const { error } = data;
        if (error) performFullErrorAlert(error, { title });
        else {
          next(data);
          setNewListe(values.liste);
        }
      }
    });
  };

  const handleSubmitInfo = (values, next) => {
    console.log({ mm: values });
    const title = "Modification de vos informations";
    updateInfo(values, (data) => {
      if (data) {
        const { error } = data;
        if (error) performFullErrorAlert(error, { title });
        else {
          next(data);
        }
      }
    });
  };

  const handleRemoveListe = (liste, next) => {
    const { classe, school } = liste;

    const title = "Suppresion de liste de fournitures";
    removeOne(liste, (data) => {
      if (data) {
        const { error } = data;
        if (error) performFullErrorAlert(error, { title });
        else {
          performFullSuccessAlert(
            `${school}/${classe.code} a été supprimée avec succès`,
            { title }
          );
          next(data);
        }
      }
    });
  };

  return (
    <>
      <SubHeader
        routes={["/", LIST_FOURNITURE_WISH_LINK]}
        title="Bonjour Yvon"
      />

      <React.Suspense fallback={<LinearProgress />}>
        <HomeWished
          url={url}
          newListe={newListe}
          handleSubmitInfo={handleSubmitInfo}
          handleSubmitListe={handleSubmitListe}
          handleRemoveListe={handleRemoveListe}
          performFullErrorAlert={performFullErrorAlert}
          performFullSuccessAlert={performFullSuccessAlert}
          getFetcher={getFetcher}
        />
      </React.Suspense>
    </>
  );
};

export default React.memo(FournituesWished);
