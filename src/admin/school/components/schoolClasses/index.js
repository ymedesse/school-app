import React from "react";
import useSWR, { trigger } from "swr";
// import { getProductsApi } from "./container/api";
import ListessClassesList from "./List";
import SearchField from "../../../../components/SearchField";
import Fuse from "fuse.js";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  UPDATE_LIST_ACTION,
  CREATE_List_ACTION,
} from "../../containers/constants";
const Dashboard = ({ listesActions, layoutActions, school, ...props }) => {
  const {
    getSchoolClassesUrl,
    fetcher,
    createListe,
    updateListe,
    removeManyListe,
    getReadListeContentUrl,
  } = listesActions;
  const {
    performErrorAlert,
    // setCurrentViewTitle,
    // setCurrentViewAction,
    addNextComponent,
    setCurrentViewerTitleAndAction,
    previous,
    setSuccess,
  } = layoutActions;

  // const { accesses: nativeAccesses } = rootContext.permission;

  const [state, setState] = React.useState({
    listes: [],
    data: [],
    search: "",
  });
  const { listes, search } = state;

  const url = getSchoolClassesUrl(school._id);

  // const fetcher = getFetcher();
  const { data: sourceData } = useSWR(url, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: true,
    suspense: true,
  });

  React.useEffect(() => {
    if (sourceData && !sourceData.error) {
      const m = getSearchResult(search);
      setState((state) => ({
        ...state,
        data: sourceData,
        listes: m,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceData]);

  const fuse = new Fuse(sourceData || [], options);

  const getSearchResult = (val) => {
    const result =
      val === "" ? sourceData : fuse.search(val).map((v) => v.item);
    return result;
  };

  const update = (item, next) => {
    const { _id } = item;
    updateListe(_id, item, (resultat) => {
      if (resultat) {
        const { error } = resultat;
        performErrorAlert(error);
        if (!error) {
          setSuccess("Mis à jour avec succès");
          trigger(url);
          next();
        }
      }
    });
  };

  const submit = (operation) => (...arg) => {
    operation === UPDATE_LIST_ACTION && update(...arg);
    operation === CREATE_List_ACTION && create(...arg);
  };

  const create = async (val, next) => {
    await createListe(val, (resultat) => {
      if (resultat) {
        const { error } = resultat;
        performErrorAlert(error);
        if (!error) {
          setSuccess("Liste crée avec succès crée avec succès");
          trigger(url);
          next();
        }
      }
    });
  };

  const remove = (id) => {
    removeManyListe([id], (resultat) => {
      if (resultat) {
        const { error } = resultat;
        performErrorAlert(error);
        if (!error) {
          setSuccess("Suppression avec succès");
          trigger(url);
        }
      }
    });
  };

  const removeMany = (ids) => {
    removeManyListe(ids, (resultat) => {
      if (resultat) {
        const { error } = resultat;
        performErrorAlert(error);
        if (!error) {
          setSuccess("Suppression avec succès");
          trigger(url);
        }
      }
    });
  };

  const empty = () => {};

  const inputState = {
    addNextComponent,
    previous,
    setCurrentViewerTitleAndAction,
  };

  const handleFilter = (name) => (event) => {
    const val = event.target.value;
    setState({ ...state, search: val, listes: getSearchResult(val) });
  };

  return (
    <>
      <SearchField
        style={{ width: "100%", margin: "8px 0px" }}
        inputFieldProps={{ onChange: handleFilter("search") }}
      />

      <React.Suspense fallback={<LinearProgress />}>
        <ListessClassesList
          school={school}
          data={listes}
          empty={empty}
          removeMany={removeMany}
          remove={remove}
          fetcher={fetcher}
          getReadListeContentUrl={getReadListeContentUrl}
          submit={submit}
          {...inputState}
        />
      </React.Suspense>
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify(prev === null ? [] : prev.products) ===
    JSON.stringify(next.products)
  );
};

export default React.memo(Dashboard, isEqual);

const options = {
  //   includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["classe.code", "classe.name"],
};
