import React, { useEffect, lazy, useState } from "react";
// import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import { TitleTypography } from "../../../components/Typography";
import { List, AutoSizer } from "react-virtualized";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonSimple } from "../../../components/Buttons";
import Suspenser from "../../../components/Suspenser";
import SpeedialButton from "../../../components/SpeedialButton";
import useSWR from "swr";
import AddIcon from "@material-ui/icons/Add";
import ListSkeleton from "../../../components/ListSkeleton";
import { CREATE_ACTION, UPDATE_ACTION } from "../container/accesses";

import useMediaDetector from "../../../components/hook/useMediaDetector";
// const BodyDialog = React.lazy(() => import("./content/BodyDialog"));
const Row = lazy(() => import("./Row"));
const Body = React.lazy(() => import("./content"));

const OrderList = ({
  checkPermission,
  setCurrentViewerTitleAndAction,
  addNextComponent,
  nativeAccesses,
  previous,
  selector = false,
  multiSelector = false,
  handleSelected,
  selected = [],
  fetcher,
  url,
  idField = "id",
  getReadUrl,
  submit,
  setCurrentSearch,
  fieldSearchSelected = "_id",
  rubriqueName = "Commande n°",
  updateStatus,
  getStatusListUrl,
  getPaymentsListUrl,
  ...restProps
}) => {
  const classes = useStyles();
  const listRef = React.createRef();
  const { data: sourceData } = useSWR(url, fetcher, {
    refreshInterval: selector ? 0 : 5000,
    revalidateOnFocus: true,
  });
  const isMobile = useMediaDetector();

  const error = !sourceData
    ? true
    : sourceData && sourceData.error
    ? true
    : false;

  const [checkData, setCheckData] = useState({
    checked: [...selected],
    checkable: selector,
  });

  const { checked, checkable } = checkData;
  const checkedCount = checked.length;

  const [state, setState] = useState({
    data: [],
    current: "",
    dialogOpener: false,
    action: "",
  });
  const { data, current, action } = state;

  const handleCheckable = () => {
    setCheckData({ ...checkData, checkable: !checkable });
  };

  useEffect(() => {
    !selector &&
      setCurrentViewerTitleAndAction(
        "Liste commandes",
        <ButtonSimple variant="text" onClick={handleCheckable}>
          <strong> {!checkable ? "Sélectioner" : "Annuler"} </strong>
        </ButtonSimple>
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkable]);

  useEffect(() => {
    if (sourceData && !sourceData.error) {
      const { results } = sourceData;
      setState((state) => ({ ...state, data: results }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceData]);

  /* action */

  const handleClick = (actionEvent, item) => {
    const id = item ? item[idField] : undefined;

    setState((state) => ({
      ...state,
      current: id,
      action: actionEvent,
    }));

    addNextComponent((ownState) => (
      <React.Suspense fallback={<ListSkeleton count={8} />}>
        <Body
          fetcher={fetcher}
          getReadUrl={getReadUrl}
          // submit={submit(actionEvent)}
          // nextStep={nextStep(actionEvent, id)}
          value={item}
          id={id}
          action={action}
          updateStatus={updateStatus}
          getStatusListUrl={getStatusListUrl}
          getPaymentsListUrl={getPaymentsListUrl}
          checkPermission={checkPermission}
        />
      </React.Suspense>
    ));
  };

  function rowRenderer({ key, index, isScrolling, isVisible, style, parent }) {
    const item = data[index];
    const id = item ? item[idField] : undefined;

    const content = id && (
      <Suspenser height={80} doubleFeadBack={false}>
        <Row
          handleToggle={handleToggle}
          checked={checked}
          checkable={checkable}
          value={data[index]}
          isCurrent={current === id}
          handleClick={() => handleClick(UPDATE_ACTION, item)}
          idField={idField}
          multiSelector={multiSelector}
          selector={selector}
          checkPermission={checkPermission}
        />
      </Suspenser>
    );

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  }

  const findBody = (id) => {
    return data.find((item) => item[idField] === id);
  };

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    let newChecked = [...checked];

    const singleSelection = selector && !multiSelector;

    if (currentIndex === -1) {
      singleSelection ? (newChecked = [value]) : newChecked.push(value);
      const v = findBody(value);
      selector && handleSelected(v, "push");
    } else {
      singleSelection ? (newChecked = []) : newChecked.splice(currentIndex, 1);
      const v = findBody(value);
      selector && handleSelected(v, "remove");
    }

    setCheckData({ ...checkData, checked: newChecked });
  };

  // const getCurrentValue = () => {
  //   const value = data.find((item) => item[`${idField}`] === current);
  //   return value;
  // };

  const count = error ? 0 : data.length;

  return !error ? (
    <>
      <div className={classes.list}>
        {/* <CssBaseline /> */}
        {count > 0 ? (
          <>
            <AutoSizer ref={listRef}>
              {({ width, height }) => {
                return (
                  <>
                    <List
                      ref={listRef}
                      width={width}
                      height={height}
                      rowCount={count}
                      rowHeight={isMobile ? 120 : 85}
                      // containerStyle={{ overflow: "unset" }}
                      rowRenderer={rowRenderer}
                    />
                  </>
                );
              }}
            </AutoSizer>
          </>
        ) : (
          <TitleTypography style={{ padding: "5px 15px" }}>
            Aucune {rubriqueName} trouvée{" "}
          </TitleTypography>
        )}
      </div>

      {!selector && (
        <div name="action" className={classes.appBar}>
          <SpeedialButton
            actions={[
              {
                name: "Ajouter",
                icon: <AddIcon />,
                handleClick: () => handleClick(CREATE_ACTION),
              },
            ]}
          />
          <div className={classes.grow} />
        </div>
      )}

      {!checkable ? (
        <TitleTypography color="secondary" style={{ paddingLeft: "20px" }}>
          {count} {rubriqueName} {pluriel(count)} trouvée{pluriel(count)}{" "}
        </TitleTypography>
      ) : (
        <TitleTypography color="primary" style={{ paddingLeft: "20px" }}>
          {checkedCount} actions {pluriel(checkedCount)} trouvée
          {pluriel(checkedCount)}
        </TitleTypography>
      )}
    </>
  ) : (
    <TitleTypography color="secondary">
      Une erreur s'est produite
    </TitleTypography>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      url: prev !== null ? prev.url : "",
      selected: prev !== null ? prev.selected : [],
    }) === JSON.stringify({ url: next.url, selected: next.selected })
  );
};

export default React.memo(OrderList, isEqual);

const useStyles = makeStyles((theme) => ({
  list: {
    flexGrow: 1,
    width: "100%",
    minHeight: "400px",
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

const pluriel = (count) => {
  return count > 1 ? "s" : "";
};
