import React from "react";
// import { getProductsApi } from "./container/api";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import TextField from "@material-ui/core/TextField";
import { LinkButton } from "../../../components/LinkButton";
import context from "../../context/AdminContext";
import List from "./List";
import SearchField from "../../../components/SearchField";
import ListSkeleton from "../../../components/ListSkeleton";
import ConfigSetting from "./FilterSetting/Dialog";
import FieldSorter from "./FilterSetting/FieldSorter";
import ColumnSelector from "./FilterSetting/ColumnSelector";
import ColumnFilter from "./FilterSetting/ColumnFilter";

import { CREATE_ACTION, UPDATE_ACTION } from "../container/accesses";

const Products = ({
  setCurrentViewTitle,
  setCurrentViewAction,
  addNextComponent,
  setCurrentViewerTitleAndAction,
  alertState,
  previous,
  selector = false,
  handleSelected,
  selected = [],
  multiSelector,
  name = "school",
  affichageName = "Ecole",
  ...props
}) => {
  const adminContext = React.useContext(context);
  const inputState = {
    addNextComponent,
    setCurrentViewerTitleAndAction,
  };

  const {
    getFetcher,
    update,
    getReadUrl,
    create,
    removeMany,
    getPartialSearch,
  } = adminContext.product;

  const { [`${name}`]: nativeAccesses } = adminContext.permission;

  const [searchData, setSearchData] = React.useState({
    search: "",
    searchInFields: ["name", "isbn"],
    fiterSetting: [...typeOfFilters],
    columnsFilter: { columns: initColumns, show: false, addNew: false },
    allFeatured: {},
  });

  const { columnsFilter, fiterSetting } = searchData;
  const { show, columns, addNew } = columnsFilter;

  const url = getPartialSearch({
    ...searchData,
    allFeatured: undefined,
    columnsFilter: undefined,
    fiterSetting: undefined,
  });

  const fetcher = getFetcher();

  const handleFilter = (name) => (data) => {
    const colSetId = fiterSetting.findIndex((item) => item.id === name);
    const filtered = colSetId > 0 ? fiterSetting[colSetId].filtered : undefined;
    let newValue = {};
    switch (name) {
      case "search":
        const val = data.target.value;
        newValue = { [name]: val === "" ? undefined : val };
        break;

      case "column":
        if (data) {
          const index = columns.findIndex((item) => item.id === data.id);
          if (index !== -1) {
            columns[index] = { ...data };
          }

          const newFiltered = { ...filtered, [`${data.id}`]: data.value };
          fiterSetting[colSetId] = {
            ...fiterSetting[colSetId],
            // active: !isEmpty(filtered),
            filtered: newFiltered,
          };

          newValue = {
            columnsFilter: { ...columnsFilter, columns, addNew: false },
            fiterSetting,
          };
        } else {
          newValue = { columnsFilter: { ...columnsFilter, addNew: false } };
        }
        break;

      case "addNew":
        newValue = { columnsFilter: { ...columnsFilter, addNew: true } };
        break;
      case "limit":
        newValue = { limit: data };
        break;

      case "sorter":
        const newFiltered = { ...filtered, ...data };
        fiterSetting[colSetId] = {
          ...fiterSetting[colSetId],
          filtered: newFiltered,
        };

        newValue = { fiterSetting };
        break;

      case "showFilter":
        const newShow = !show;

        newValue = {
          columnsFilter: { ...columnsFilter, show: newShow },
        };
        break;

      default:
        newValue = { ...data };
        break;
    }
    newValue = { ...searchData, ...newValue };
    let allFeatured = newValue.fiterSetting
      .filter((item) => item.active)
      .map((item) => item.filtered);

    let val = {};
    for (let i = 0; i < allFeatured.length; i++) {
      val = { ...val, ...allFeatured[i] };
    }

    setSearchData({ ...newValue, allFeatured: val });
  };

  const handleSettingChange = (options) => {
    options && setSearchData({ ...searchData, fiterSetting: options });
  };

  const filter = (
    <>
      <Box display="flex" width="100%" pl={2} pr={2}>
        <Box flexGrow={1} width="170px">
          <Grid spacing={1} container justify="flex-start" direction="row">
            {fiterSetting
              .filter((item) => item.active)
              .map((item, index) =>
                item.content({ index, addNew, handleFilter, columns })
              )}
          </Grid>
        </Box>
        <Box>
          <ConfigSetting
            submitSelected={handleSettingChange}
            actionButton={(handleClick) => (
              <SettingButton onClick={handleClick} />
            )}
            initOptions={fiterSetting}
          />
        </Box>
      </Box>

      <Divider style={{ margin: "6px 0px" }} />
    </>
  );

  const { setError, setSuccess } = selector
    ? { setError: () => {}, setSuccess: () => {} }
    : alertState;

  const performErrorAlert = (error) => {
    const type = typeof error;
    error && type === "string" && setError(error);
  };
  const onCreate = (val, next) => {
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

  return (
    <>
      <SearchField
        style={{ width: "100%", margin: "8px 0px" }}
        inputFieldProps={{ onChange: handleFilter("search") }}
        handleShowFilter={handleFilter("showFilter")}
      />

      {show && filter}

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
          multiSelector={multiSelector}
        />
      </React.Suspense>
    </>
  );
};

const isEqual = (prev, next) => {
  return JSON.stringify(prev.selected) === JSON.stringify(next.selected);
};

const typeOfFilters = [
  {
    id: "sorter",
    label: "Ordonner la liste par une colonne",
    active: false,
    filtered: {},
    content: ({ index, handleFilter }) => (
      <Grid key={index} item>
        <FieldSorter updateValue={handleFilter("sorter")} />
      </Grid>
    ),
  },
  {
    id: "column",
    label: "Ajouter un filtre de colonne",
    active: false,
    filtered: {},
    content: ({ handleFilter, index, columns, addNew }) => (
      <div key={index} style={{ display: "inline-flex" }}>
        {columns
          .filter((item) => item.showed)
          .map((column, index) => (
            <Grid key={index} item>
              <ColumnFilter
                column={column}
                updateValue={handleFilter("column")}
              />
            </Grid>
          ))}
        {addNew ? (
          <Grid item>
            <ColumnSelector
              columns={columns.filter((item) => !item.showed)}
              handleValidate={handleFilter("column")}
            />
          </Grid>
        ) : (
          <Grid style={{ margin: "auto 12px" }} item>
            <LinkButton onClick={handleFilter("addNew")}>
              Ajouter un filtre de colonne
            </LinkButton>
          </Grid>
        )}
      </div>
    ),
  },
  {
    id: "commande",
    label: "Afficher les produits à commander",
    active: false,
    filtered: {},
    content: ({ index, props }) => <Grid key={index}> item </Grid>,
  },
  {
    id: "ordered",
    label: "Afficher les produits commander",
    active: false,
    filtered: {},
    content: ({ index, props }) => <Grid key={index}> item </Grid>,
  },
  {
    id: "updated",
    label: "Visualiser les états de mise à jours",
    active: false,
    filtered: {},
    content: ({ index, props }) => <Grid key={index}> item </Grid>,
  },
  {
    id: "limit",
    label: "Définir une limite des résultats affichés",
    active: false,
    filtered: {},
    content: ({ index, handleFilter }) => (
      <Grid key={index}>
        <TextField
          onChange={(event) => {
            handleFilter("limit")(event.target.value);
          }}
          type="number"
          margin="dense"
          helperText="Limit des resultats"
          defaultValue={1000}
        />
      </Grid>
    ),
  },
];

const SettingButton = (props) => (
  <Button
    variant="outlined"
    color="primary"
    size="small"
    startIcon={<SettingsIcon />}
    {...props}
  >
    filtres
  </Button>
);

const initColumns = [
  {
    id: "status",
    label: "status",
    values: ["publish", "draft", "pending", "private"],
  },

  // { id: "category", label: "Catégorie", values: [] },
];

export default React.memo(Products, isEqual);
