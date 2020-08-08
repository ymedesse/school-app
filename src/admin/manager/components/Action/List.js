import React, { useEffect, lazy, useState } from "react";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import { TitleTypography } from "../../../../components/Typography";
import { List, AutoSizer } from "react-virtualized";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonSimple } from "../../../../components/Buttons";
import Suspenser from "../../../../components/Suspenser";
import SpeedialButton from "../../../../components/SpeedialButton";
const Row = lazy(() => import("./Row"));

const ActionsList = ({
  accesses,
  empty,
  updateMany,
  setCurrentViewerTitleAndAction,
  update,
  nativeAccesses,
  remove,
  removeMany,
  selector = false,
  handleSelected,
  selected = [],
  ...restProps
}) => {
  const classes = useStyles();
  // const [current, setCurrent] = useState("");
  const listRef = React.createRef();

  const [checkData, setCheckData] = useState({
    checked: [...selected],
    checkable: selector,
  });

  const { checked, checkable } = checkData;
  const checkedCount = checked.length;
  const handleCheckable = () => {
    setCheckData({ ...checkData, checkable: !checkable });
  };

  useEffect(() => {
    !selector &&
      setCurrentViewerTitleAndAction(
        "Liste des actions",
        <ButtonSimple variant="text" onClick={handleCheckable}>
          <strong> {!checkable ? "Sélectioner" : "Annuler"} </strong>
        </ButtonSimple>
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkable]);

  useEffect(() => {
    if (JSON.stringify(selected) !== JSON.stringify(checked)) {
      setCheckData({ ...checkData, checked: selected });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  function rowRenderer({ key, index, isScrolling, isVisible, style, parent }) {
    const content = (
      <Suspenser height={80} doubleFeadBack={false}>
        <Row
          handleToggle={handleToggle}
          handleDelete={remove}
          checked={checked}
          checkable={checkable}
          value={accesses[index]}
          // isCurrent={current === accesses[index].id}
          submitUpdate={!selector ? update : undefined}
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
    return accesses.find((item) => item._id === id);
  };

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      const v = findBody(value);
      selector && handleSelected(v, "push");
    } else {
      newChecked.splice(currentIndex, 1);
      const v = findBody(value);
      selector && handleSelected(v, "remove");
    }

    setCheckData({ ...checkData, checked: newChecked });
  };

  const count = accesses.length;

  const upToDate = async () => {
    const values = Object.values(nativeAccesses);
    const final = accesses;

    for (let i = 0; i < values.length; i++) {
      const key = values[i];
      const index = accesses.findIndex((item) => item.id === key);
      index === -1 && final.push({ id: key, name: "" });
    }

    for (let i = 0; i < final.length; i++) {
      const access = final[i];
      const index = values.findIndex((item) => item === access.id);
      if(access.id!=="")
      final[i] = { ...access, depreciated: index === -1 ? true : false };
    }
    final.length && (await updateMany(final));
  };

  const deleteSelection = () => {
    checkable && checkedCount > 0 && removeMany(checked);
    setCheckData({ ...checkData, checked: [] });
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
                      rowHeight={50}
                      rowRenderer={rowRenderer}
                    />
                  </>
                );
              }}
            </AutoSizer>
          </>
        ) : (
          <TitleTypography style={{ padding: "5px 15px" }}>
            Auccune actions trouvée{" "}
          </TitleTypography>
        )}
      </div>
      {!selector && (
        <div name="vous" className={classes.appBar}>
          <SpeedialButton
            actions={[
              {
                name: "Vider",
                icon: <HourglassEmptyIcon />,
                handleClick: empty,
              },
              {
                name: "Mettre a jour",
                icon: <SystemUpdateAltIcon />,
                handleClick: upToDate,
              },
              ...deleteManyAction,
            ]}
          />
          <div className={classes.grow} />
        </div>
      )}

      {!checkable ? (
        <TitleTypography color="secondary" style={{ paddingLeft: "20px" }}>
          {count} actions {pluriel(count)} trouvée{pluriel(count)}{" "}
        </TitleTypography>
      ) : (
        <TitleTypography color="primary" style={{ paddingLeft: "20px" }}>
          {checkedCount} actions {pluriel(checkedCount)} trouvée
          {pluriel(checkedCount)}
        </TitleTypography>
      )}
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

export default React.memo(ActionsList, isEqual);

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
