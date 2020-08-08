import React from "react";
import useSWR, { trigger } from "swr";
// import { getProductsApi } from "./container/api";
import context from "../../../context/AdminContext";
import RolesList from "./List";
import SearchField from "../../../../components/SearchField";
import Fuse from "fuse.js";
import LinearProgress from "@material-ui/core/LinearProgress";

const Dashboard = ({
  setCurrentViewTitle,
  setCurrentViewAction,
  addNextComponent,
  importComponentNativeState,
  setCurrentViewerTitleAndAction,
  alertState: { setError, setSuccess },
  previous,
  ...props
}) => {
  const rootContext = React.useContext(context);

  const {
    getFetcher,
    getRolesUrl,
    updateManyRoles,
    emptyRoles,
    deleteManyRoles,
    createRole,
    getReadUrl,
  } = rootContext.manager;
  // const { accesses: nativeAccesses } = rootContext.permission;

  const [values, setValues] = React.useState({
    roles: [],
    data: [],
    search: "",
  });
  const { roles, search } = values;

  let url = getRolesUrl();
  const fetcher = getFetcher();
  const { data: sourceData } = useSWR(url, fetcher, {
    refreshInterval: 6000,
    revalidateOnFocus: true,
  });

  React.useEffect(() => {
    setValues({
      ...values,
      data: sourceData,
      roles: getSearchResult(search),
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
    updateManyRoles(val, ({ error, data }) => {
      error && setError(error);
      if (!error) {
        setSuccess("Mise à jour effectuée avec succès");
        trigger(url);
      }
    });
  };

  const update = (val, next) => {
    updateManyRoles([{ ...val }], ({ error, data }) => {
      error && setError(error);
      if (!error) {
        next && next();
        trigger(url);
        setSuccess("Mise à jour effectuée avec succès");
      }
    });
  };

  const create = async (val, next) => {
    await createRole(val, ({ error, data }) => {
      error && setError(error);
      if (!error) {
        next && next();
        trigger(url);
        setSuccess("Enregistrement avec succès");
      }
    });
  };

  const remove = (id) => {
    deleteManyRoles([id], ({ error, data }) => {
      error && setError(error);
      if (!error) {
        setSuccess("Suppression avec succès");
        trigger(url);
      }
    });
  };

  const removeMany = (ids) => {
    deleteManyRoles(ids, ({ error, data }) => {
      error && setError(error);
      if (!error) {
        setSuccess("Suppression avec succès");
        trigger(url);
      }
    });
  };

  const empty = () => {
    emptyRoles((result) => {
      const { error } = result;
      error && setError(error);
      !error && setSuccess("Suppression avec succèss");
      trigger(url);
    });
  };

  const inputState = {
    addNextComponent,
    previous,
    setCurrentViewerTitleAndAction,
  };

  const handleFilter = (name) => (event) => {
    const val = event.target.value;
    setValues({ ...values, search: val, roles: getSearchResult(val) });
  };

  return (
    <>
      <SearchField
        style={{ width: "100%", margin: "8px 0px" }}
        inputFieldProps={{ onChange: handleFilter("search") }}
      />

      <React.Suspense fallback={<LinearProgress />}>
        <RolesList
          data={roles}
          empty={empty}
          updateMany={updateMany}
          update={update}
          remove={remove}
          create={create}
          removeMany={removeMany}
          fetcher={fetcher}
          getReadUrl={getReadUrl}
          {...inputState}
        />
      </React.Suspense>
    </>
  );
};

const isEqual = (prev, next) => {
  return JSON.stringify(prev.products) === JSON.stringify(next.products);
};

export default React.memo(Dashboard, isEqual);

const options = {
  //   includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["name"],
};
