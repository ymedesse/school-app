import React, { useEffect, lazy, useState } from "react";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import AddIcon from "@material-ui/icons/Add";
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import { TitleTypography } from "../../../../components/Typography";
import { List, AutoSizer } from "react-virtualized";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonSimple } from "../../../../components/Buttons";
import Suspenser from "../../../../components/Suspenser";
import SpeedialButton from "../../../../components/SpeedialButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  UPDATE_LIST_ACTION,
  CREATE_List_ACTION,
} from "../../containers/constants";

const SchoolClassesRow = lazy(() => import("./Row"));
const SchoolClassesBody = lazy(() => import("./Body"));

const ClassesList = ({
  school,
  data,
  setCurrentViewerTitleAndAction,
  addNextComponent,
  fetcher,
  empty,
  remove,
  removeMany,
  getReadListeContentUrl,
  previous,
  submit,
  ...restProps
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const classes = useStyles();
  const [current, setCurrent] = useState("");
  const listRef = React.createRef();

  const [checkData, setCheckData] = useState({
    checked: [],
    checkable: false,
  });

  const { checked, checkable } = checkData;
  const checkedCount = checked.length;
  const handleCheckable = () => {
    setCheckData({ ...checkData, checkable: !checkable });
  };

  useEffect(() => {
    setCurrentViewerTitleAndAction(
      "Liste fournitures " + school.name,
      <ButtonSimple variant="text" onClick={handleCheckable}>
        <strong> {!checkable ? "Sélectioner" : "Annuler"} </strong>
      </ButtonSimple>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkable]);

  const handleClick = (item) => {
    const id = item ? item._id : undefined;
    const action = item ? UPDATE_LIST_ACTION : CREATE_List_ACTION;

    setCurrent(id);
    addNextComponent((ownState) => (
      <React.Suspense fallback={<LinearProgress />}>
        <SchoolClassesBody
          fetcher={fetcher}
          getReadListeContentUrl={getReadListeContentUrl}
          submit={submit(action)}
          value={item}
          id={id}
          action={action}
          school={school}
          setCurrentViewerTitleAndAction={setCurrentViewerTitleAndAction}
          nextStep={() => previous()}
        />
      </React.Suspense>
    ));
  };

  function rowRenderer({ key, index, isScrolling, isVisible, style, parent }) {
    const item = data[index];
    const listeId = item ? item._id : undefined;

    const content = listeId && (
      <Suspenser height={80} doubleFeadBack={false}>
        <SchoolClassesRow
          handleToggle={() => handleToggle(listeId)}
          handleDelete={() => remove(listeId)}
          checked={checked}
          checkable={checkable}
          value={data[index]}
          handleUpdate={() => handleClick(item)}
          isCurrent={current === listeId}
        />
      </Suspenser>
    );

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  }

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckData({ ...checkData, checked: newChecked });
  };

  const count = data.length;

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
                      rowHeight={mobile ? 150 : 80}
                      rowRenderer={rowRenderer}
                    />
                  </>
                );
              }}
            </AutoSizer>
          </>
        ) : (
          <TitleTypography style={{ padding: "5px 15px" }}>
            Aucune classe trouvée{" "}
          </TitleTypography>
        )}
      </div>
      <div name="vous" className={classes.appBar}>
        <SpeedialButton
          actions={[
            { name: "Ajouter", icon: <AddIcon />, handleClick: handleClick },
            ...deleteManyAction,
            { name: "Vider", icon: <HourglassEmptyIcon />, handleClick: empty },
          ]}
        />
        <div className={classes.grow} />
      </div>

      {!checkable ? (
        <TitleTypography color="secondary" style={{ paddingLeft: "20px" }}>
          {count} privilège{pluriel(count)} trouvé{pluriel(count)}{" "}
        </TitleTypography>
      ) : (
        <TitleTypography color="primary" style={{ paddingLeft: "20px" }}>
          {checkedCount} privilège{pluriel(checkedCount)} trouvé
          {pluriel(checkedCount)}
        </TitleTypography>
      )}
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({ data: prev !== null ? prev.data : "" }) ===
    JSON.stringify({ data: next.data })
  );
};

export default React.memo(ClassesList, isEqual);

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
    marginRight: "0px",
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
