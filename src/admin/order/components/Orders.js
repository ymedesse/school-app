import React from "react";
// import { getProductsApi } from "./container/api";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import context from "../../context/AdminContext";
import List from "./List";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchField from "../../../components/SearchField";
import ListSkeleton from "../../../components/ListSkeleton";
import DatesRanges from "./FilterSetting/DatesRanges";

import {
  ACTION_FILTER_BY_LOCAL_STATUS,
  ACTION_FILTER_BY_STATUS,
} from "../container/accesses";

import {
  LOCAL_STATUS,
  STATUS,
} from "../container/constants";
const StatusSelector = React.lazy(() => import("./localStatus/statusSelector"));

const Orders = ({
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const adminContext = React.useContext(context);
  const inputState = {
    addNextComponent,
    setCurrentViewerTitleAndAction,
  };

  const {
    getFetcher,
    getReadUrl,
    update,
    getPartialSearch,
    updateStatus,
    checkPermission,
    getStatusListUrl,
    getPaymentsListUrl,
  } = adminContext.order;

  const allowStatusFilter = checkPermission(ACTION_FILTER_BY_STATUS);
  const alloLocalStatusFilter = checkPermission(ACTION_FILTER_BY_LOCAL_STATUS);

  const { [`${name}`]: nativeAccesses } = adminContext.permission;

  const [searchData, setSearchData] = React.useState({
    search: "",
    searchInFields: [
      "customer_data.email",
      "customerData.lastName",
      "customerData.firstName",
      "payment.phone",
      "id",
    ],
    status: undefined,
    localStatus: undefined,
    dates: undefined,
    showFilter: false,
  });

  const { showFilter, localStatus, status } = searchData;

  const getStatusId = (val = {}) => {
    const id = val ? val.id : undefined;
    return id;
  };
  const url = getPartialSearch({
    ...searchData,
    status: getStatusId(status),
    localstatus: getStatusId(localStatus),
    localStatus: undefined,
    showFilter: undefined,
  });

  const fetcher = getFetcher();

  const handleFilter = (name) => (data) => {
    let newValue = {};
    switch (name) {
      case "search":
        const val = data.target.value;
        newValue = { search: val === "" ? undefined : val };
        break;

      case "showFilter":
        newValue = { showFilter: !showFilter };
        break;

      case STATUS:
        newValue = { status: data };
        break;
      case LOCAL_STATUS:
        newValue = { localStatus: data };
        break;

      case "dates":
        newValue = { dates: data };
        break;

      default:
        newValue = { ...data };
        break;
    }
    setSearchData((searchData) => ({ ...searchData, ...newValue }));
  };

  const filter = (
    <>
      <Grid container>
        <Grid spacing={1} item container xs={12} sm={6}>
          {allowStatusFilter && (
            <Grid item sm={6} xs={12}>
              <React.Suspense fallback={<ListSkeleton count={1} />}>
                <StatusSelector
                  placeholder="Status"
                  url={getStatusListUrl(STATUS)}
                  labelText="status"
                  handleChange={handleFilter(STATUS)}
                  value={status}
                  fullWidth={true}
                  fetcher={fetcher}
                />
              </React.Suspense>
            </Grid>
          )}

          {alloLocalStatusFilter && (
            <Grid item sm={6} xs={12}>
              <React.Suspense fallback={<ListSkeleton count={1} />}>
                <StatusSelector
                  placeholder="local status"
                  labelText="local status"
                  url={getStatusListUrl(LOCAL_STATUS)}
                  handleChange={handleFilter(LOCAL_STATUS)}
                  fullWidth={true}
                  value={localStatus}
                  fetcher={fetcher}
                />
              </React.Suspense>
            </Grid>
          )}
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          justify={!isMobile ? "flex-end" : "center"}
        >
          <DatesRanges handleFilter={handleFilter("dates")} />
        </Grid>
      </Grid>

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

  const onUpdateStatus = (id, type) => (value, next) => {
    updateStatus(id, type, value, (data) => {
      if (data) {
        const { error } = data;
        performErrorAlert(error);
        if (!error) {
          setSuccess("Mis à jour avec succès");
          next();
        }
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

      {showFilter && filter}

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
          submit={onUpdate}
          setCurrentSearch={setCurrentSearch}
          multiSelector={multiSelector}
          updateStatus={onUpdateStatus}
          getStatusListUrl={getStatusListUrl}
          getPaymentsListUrl={getPaymentsListUrl}
          checkPermission={checkPermission}
        />
      </React.Suspense>
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      isAuthenticatedUser: prev ? prev.isAuthenticatedUser : undefined,
      selected: prev ? prev.selected : undefined,
    }) ===
    JSON.stringify({
      isAuthenticatedUser: next.isAuthenticatedUser,
      selected: next.selected,
    })
  );
};

export default React.memo(Orders, isEqual);
