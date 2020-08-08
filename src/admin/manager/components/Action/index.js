import React from "react";
import useSWR, { trigger } from "swr";
// import { getProductsApi } from "./container/api";
import context from "../../../context/AdminContext";
import AccessList from "./List";
import SearchField from "../../../../components/SearchField";
import Fuse from "fuse.js";
import LinearProgress from "@material-ui/core/LinearProgress";

const Action = ({
  setCurrentViewTitle,
  setCurrentViewAction,
  addNextComponent,
  importComponentNativeState,
  setCurrentViewerTitleAndAction,
  alertState,
  previous,
  selector = false,
  handleSelected,
  selected = [],
  ...props
}) => {
  const rootContext = React.useContext(context);
  
  const {
    getFetcher,
    getActionsUrl,
    updateManyAccesses,
    emptyAccesses,
    deleteManyAccesses,
  } = rootContext.manager;
  const { accesses: nativeAccesses } = rootContext.permission;

  const [values, setValues] = React.useState({
    accesses: [],
    data: [],
    search: "",
  });
  const { accesses, search } = values;

  const { setError, setSuccess } = selector
    ? { setError: () => {}, setSuccess: () => {} }
    : alertState;

  let url = getActionsUrl();
  const fetcher = getFetcher();
  const { data: sourceData } = useSWR(url, fetcher, {
    refreshInterval: 6000,
    revalidateOnFocus: true,
  });

  React.useEffect(() => {
    setValues({
      ...values,
      data: sourceData,
      accesses: getSearchResult(search),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceData]);

  const fuse = new Fuse(sourceData || [], options);

  const getSearchResult = (val) => {
    const result =
      val === "" ? sourceData : fuse.search(val).map((v) => v.item);
    return result;
  };

  const updateMany = (val) => {
    updateManyAccesses(val, ({ error, data }) => {
      error && setError(error);
      if (!error) {
        setSuccess("Mise à jour effectuée avec succès");
        trigger(url);
      }
    });
  };

  const update = (val) => {
    updateManyAccesses([{ ...val }], ({ error, data }) => {
      error && setError(error);
      if (!error) {
        setSuccess("Mise à jour effectuée avec succès");
        trigger(url);
      }
    });
  };

  const remove = (id) => {
    deleteManyAccesses([id], ({ error, data }) => {
      error && setError(error);
      if (!error) {
        setSuccess("Suppression avec succès");
        trigger(url);
      }
    });
  };

  const removeMany = (ids) => {
    deleteManyAccesses(ids, ({ error, data }) => {
      error && setError(error);
      if (!error) {
        setSuccess("Suppression avec succès");
        trigger(url);
      }
    });
  };

  const empty = () => {
    emptyAccesses((result) => {
      const { error } = result;
      error && setError(error);
      !error && setSuccess("Suppression avec succèss");
    });
  };

  const inputState = {
    addNextComponent,
    setCurrentViewerTitleAndAction,
  };

  const handleFilter = (name) => (event) => {
    const val = event.target.value;
    setValues({ ...values, search: val, accesses: getSearchResult(val) });
  };

  return (
    <>
      <SearchField
        style={{ width: "100%", margin: "8px 0px" }}
        inputFieldProps={{ onChange: handleFilter("search") }}
        // handleCheckable={handleCheckable}
      />

      <React.Suspense fallback={<LinearProgress />}>
        <AccessList
          accesses={accesses}
          nativeAccesses={nativeAccesses}
          empty={empty}
          updateMany={updateMany}
          update={update}
          remove={remove}
          removeMany={removeMany}
          {...inputState}
          selector={selector}
          handleSelected={handleSelected}
          selected={selected}
        />
      </React.Suspense>
    </>
  );
};

const isEqual = (prev, next) => {
  return JSON.stringify(prev.selected) === JSON.stringify(next.selected);
};

export default React.memo(Action, isEqual);

const options = {
  //   includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["name", "id"],
};
