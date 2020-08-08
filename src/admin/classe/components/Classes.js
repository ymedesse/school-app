import React from "react";
// import { getProductsApi } from "./container/api";
import context from "../../context/AdminContext";
import List from "./List";
import SearchField from "../../../components/SearchField";
import ListSkeleton from "../../../components/ListSkeleton";
import { CREATE_ACTION, UPDATE_ACTION } from "../containers/accesses";

const Schools = ({
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
  multiSelector,
  name = "classe",
  affichageName = "Classe",
  ...props
}) => {
  const adminContext = React.useContext(context);
  const {
    getFetcher,
    update,
    getReadUrl,
    create,
    removeMany,
    getPartialSearch,
  } = adminContext.classe;

  const { [`${name}`]: nativeAccesses } = adminContext.permission;

  const [searchData, setSearchData] = React.useState({
    search: "",
    searchInFields: ["slug", "code"],
  });

  const fetcher = getFetcher();

  const inputState = {
    addNextComponent,
    setCurrentViewerTitleAndAction,
  };

  const handleFilter = (name) => (event) => {
    const val = event.target.value;
    setSearchData({ ...searchData, search: val });
  };

  const { setError, setSuccess } = selector
    ? { setError: () => {}, setSuccess: () => {} }
    : alertState;

  const performErrorAlert = (error) => {
    const type = typeof error;
    error && type === "string" && setError(error);
  };
  const onCreate = (val, next) => {
    console.log({ valinOncreate: val });
    create(val, ({ error, data }) => {
      performErrorAlert(error);
      if (!error) {
        setSuccess(`${affichageName} crée avec succès`);
        next();
      }
    });
  };

  const onUpdate = (val, next) => {
    const { _id } = val;
    update(_id, val, ({ error, data }) => {
      performErrorAlert(error);
      if (!error) {
        setSuccess("Mis à jour avec succès");
        next();
      }
    });
  };

  const submit = (operation) => (...arg) => {
    operation === UPDATE_ACTION && onUpdate(...arg);
    operation === CREATE_ACTION && onCreate(...arg);
  };

  const onRemove = (id, next) => {
    removeMany([id], ({ error, data }) => {
      performErrorAlert(error);
      if (!error) {
        setSuccess("Suppression avec succès");
      }
    });
  };

  const onRemoveMany = (ids, next) => {
    removeMany(ids, ({ error, data }) => {
      performErrorAlert(error);
      if (!error) {
        setSuccess("Suppression avec succès");
      }
    });
  };

  const setCurrentSearch = (val) => {
    setSearchData({ ...searchData, search: val });
  };

  const url = getPartialSearch(searchData);

  return (
    <>
      <SearchField
        style={{ width: "100%", margin: "8px 0px" }}
        inputFieldProps={{ onChange: handleFilter("search") }}

        // handleCheckable={handleCheckable}
      />

      <React.Suspense fallback={<ListSkeleton count="50" />}>
        <List
          nativeAccesses={nativeAccesses}
          fetcher={fetcher}
          previous={previous}
          getReadUrl={getReadUrl}
          url={url}
          {...inputState}
          selector={selector}
          handleSelected={handleSelected}
          selected={selected}
          submit={submit}
          remove={onRemove}
          removeMany={onRemoveMany}
          setCurrentSearch={setCurrentSearch}
        />
      </React.Suspense>
    </>
  );
};

const isEqual = (prev, next) => {
  return JSON.stringify(prev.selected) === JSON.stringify(next.selected);
};

export default React.memo(Schools, isEqual);
