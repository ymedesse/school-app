import React from "react";
// import { getProductsApi } from "./container/api";
import context from "../../context/AdminContext";
import List from "./List";
import SearchField from "../../../components/SearchField";
import ListSkeleton from "../../../components/ListSkeleton";
import { UPDATE_ACTION } from "../containers/accesses";

const Wisheds = ({
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
  name = "wished",
  affichageName = "Listes demandées",
  ...props
}) => {
  const adminContext = React.useContext(context);
  const {
    getFetcher,
    update,
    getReadUrl,
    removeMany,
    getListUrl,
  } = adminContext.adminWhished;

  const { [`${name}`]: nativeAccesses } = adminContext.permission;

  const [searchData, setSearchData] = React.useState({
    search: "",
    searchInFields: ["school"],
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

  const url = getListUrl();

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

export default React.memo(Wisheds, isEqual);
