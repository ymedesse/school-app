import React, { useEffect, lazy, useState } from "react";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import { TitleTypography } from "../../../components/Typography";
import { List, AutoSizer } from "react-virtualized";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonSimple } from "../../../components/Buttons";
import Suspenser from "../../../components/Suspenser";
import SpeedialButton from "../../../components/SpeedialButton";
import useSWR, { trigger } from "swr";
import ListSkeleton from "../../../components/ListSkeleton";
import LineProgressBuffer from "../../../components/LineProgressBuffer";
import { status } from "../containers/constants";
import { UPDATE_STATUS_ACTION, UPDATE_ACTION } from "../containers/accesses";

import Body from "./content";
const StatusSetup = React.lazy(() => import("./localStatus"));

const Row = lazy(() => import("./Row"));
// const SelectorField = lazy(() => import("./Selector/SelectorField"));

const SchoolList = ({
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
  idField = "_id",
  getReadUrl,
  submit,
  remove,
  removeMany,
  setCurrentSearch,
  fieldSearchSelected = "school",
  rubriqueName = "listes de founitures demandées",
  ...restProps
}) => {
  const classes = useStyles();
  const listRef = React.createRef();
  const { data: sourceData } = useSWR(url, fetcher, {
    refreshInterval: 6000,
    revalidateOnFocus: true,
  });

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

  const { data, current, action, dialogOpener } = state;
  const handleCheckable = () => {
    setCheckData({ ...checkData, checkable: !checkable });
  };

  useEffect(() => {
    !selector &&
      setCurrentViewerTitleAndAction(
        "Listes de fournitures demandées",
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

  const nextStep = (operation) => (val) => {
    if (operation === "create" && val)
      setCurrentSearch(val[`${fieldSearchSelected}`]);
    trigger(url);
  };

  const oneRemoveOne = (id) => {
    remove(id);
    const index = data.findIndex((item) => item[idField] === id);
    const m = [...data];
    m.splice(index);
    setState((state) => ({ ...state, data: m }));
  };

  function rowRenderer({ key, index, isScrolling, isVisible, style, parent }) {
    const item = data[index];
    const id = item ? item[idField] : undefined;

    const content = id && (
      <Suspenser height={80} doubleFeadBack={false}>
        <Row
          handleToggle={handleToggle}
          handleDelete={() => oneRemoveOne(id)}
          checked={checked}
          checkable={checkable}
          value={data[index]}
          isCurrent={current === id}
          handleUpdate={() => handleStatusDialogOpen(UPDATE_STATUS_ACTION, id)}
          handleClick={() => handleClick(UPDATE_ACTION, item)}
          idField={idField}
          multiSelector={multiSelector}
          selector={selector}
          key={id}
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

  const handleStatusDialogOpen = (actionEvent, id) => {
    setState((state) => ({
      ...state,
      current: id,
      action: actionEvent,
      dialogOpener: true,
    }));
  };

  const getCurrentValue = () => {
    const value = data.find((item) => item[`${idField}`] === current);

    return value;
  };

  const handleClick = (actionEvent, item) => {
    const id = item ? item[idField] : undefined;

    setState((state) => ({
      ...state,
      current: id,
      action: actionEvent,
    }));

    addNextComponent((ownState) => (
      <React.Suspense fallback={<LineProgressBuffer />}>
        <Body
          submit={submit}
          values={item}
          nextStep={() => trigger(url)}
          id={id}
        />
      </React.Suspense>
    ));
  };

  const setStatusDialog = () => {
    return (
      <React.Suspense fallback={<ListSkeleton count={5} />}>
        <StatusSetup
          values={status}
          submit={submit(action)}
          nextStep={nextStep(action)}
          externalOpen={dialogOpener}
          setTExternalOpen={() =>
            setState((state) => ({ ...state, dialogOpener: false }))
          }
          item={getCurrentValue()}
          id={current}
        />
      </React.Suspense>
    );
  };

  const count = data.length;

  const deleteSelection = () => {
    checkable &&
      checkedCount > 0 &&
      removeMany(checked, () => {
        setCheckData({ ...checkData, checked: [] });
        trigger(url, true);
      });
  };

  const deleteManyAction =
    checkable && checkedCount > 0
      ? [
          {
            name: "Supprimer toute la sélection",
            icon: <DeleteSweepIcon color="secondary" />,
            handleClick: deleteSelection,
          },
        ]
      : [];

  return (
    <>
      <div className={classes.list}>
        {/* <React.Suspense fallback={<ListSkeleton count={1} />}>
          <SelectorField
            labelText="Ecole"
            handleChange={(v) => console.log({ v })}
          />
        </React.Suspense> */}

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
                      rowHeight={80}
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
              // {
              //   name: "Ajouter",
              //   icon: <AddIcon />,
              //   handleClick: () => handleStatusDialogOpen(CREATE_ACTION),
              // },
              ...deleteManyAction,
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

      {dialogOpener && setStatusDialog()}
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      accesses: prev !== null ? prev.accesses : "",
      selected: prev !== null ? prev.selected : [],
    }) === JSON.stringify({ accesses: next.accesses, delected: next.selected })
  );
};

export default React.memo(SchoolList, isEqual);

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
