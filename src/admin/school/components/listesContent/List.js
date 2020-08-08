import React, { useEffect, lazy, useState } from "react";
import Fuse from "fuse.js";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import AddIcon from "@material-ui/icons/Add";
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import { TitleTypography } from "../../../../components/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonSimple } from "../../../../components/Buttons";
import Suspenser from "../../../../components/Suspenser";
import SpeedialButton from "../../../../components/SpeedialButton";
import ProductSelector from "../../../Product/components/Selector/MultiSelectorDialog";
import SearchField from "../../../../components/SearchField";
import { ReactSortable } from "react-sortablejs";

const Row = lazy(() => import("./Row"));

const ClassesList = ({
  products,
  setCurrentViewerTitleAndAction,
  empty,
  update,
  remove,
  removeMany,
  handleProductSelection,
  handleDragDrop,
  school,
  classe,
  ...restProps
}) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const listRef = React.createRef();
  const fuse = new Fuse(products || [], options);

  const [state, setState] = useState({
    checked: [],
    checkable: false,
    current: "current",
    openProductsSelector: false,
    search: "",
    listes: products,
    activeSearch: false,
  });

  const {
    checked,
    checkable,
    current,
    openProductsSelector,
    search,
    activeSearch,
    listes,
  } = state;
  useEffect(() => {
    setCurrentViewerTitleAndAction(
      `Liste fournitures ${school ? school.name : ""} ${
        classe ? "-" + classe.code : ""
      }`,
      <ButtonSimple variant="text" onClick={handleCheckable}>
        <strong> {!checkable ? "Sélectioner" : "Annuler"} </strong>
      </ButtonSimple>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkable, school]);

  React.useEffect(() => {
    if (activeSearch) {
      const m = getSearchResult(search, activeSearch);
      setState((state) => ({
        ...state,
        listes: m,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const handleCheckable = () => {
    setState((state) => ({ ...state, checkable: !checkable }));
  };

  function rowRenderer(item, index) {
    const { product } = item;
    const id = product ? product._id : undefined;

    const content = id && (
      <Suspenser height={80} doubleFeadBack={false}>
        <Row
          handleToggle={() => handleToggle(id)}
          handleDelete={() => remove(id)}
          checked={checked}
          checkable={checkable}
          value={product}
          isCurrent={current === id}
        />
      </Suspenser>
    );

    return <div key={index}>{content}</div>;
  }

  const handleOpenProduct = () => {
    setState((state) => ({
      ...state,
      openProductsSelector: true,
    }));
  };

  const getProductsId = () => products.map((item) => (item.product || {})._id);

  const showProductSelector = () => {
    return (
      <ProductSelector
        title="Liste des produits"
        handleSelected={handleProductSelection}
        multiSelector={true}
        selected={getProductsId()}
        initialOpen={openProductsSelector}
        setInitialOpen={() =>
          setState((state) => ({ ...state, openProductsSelector: false }))
        }
      />
    );
  };

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setState((state) => ({ ...state, checked: newChecked }));
  };

  const count = activeSearch ? listes.length : products.length;
  const checkedCount = checked.length;

  const deleteSelection = () => {
    checkable && checkedCount > 0 && removeMany(checked);
    setState((state) => ({ ...state, checked: [] }));
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

  const getSearchResult = (val, insList) => {
    const result = val === "" ? products : fuse.search(val).map((v) => v.item);
    return result;
  };

  const handleFilter = (name) => (event) => {
    const val = event.target.value;
    setState({ ...state, search: val, listes: getSearchResult(val) });
  };

  const setActiveSearch = () => {
    setState((state) => ({
      ...state,
      activeSearch: !activeSearch,
      listes: getSearchResult(search),
    }));
  };

  const listesToDisplay = activeSearch ? listes : products;
  return (
    <>
      <SearchField
        style={{ width: "100%", margin: "8px 0px" }}
        inputFieldProps={{ onChange: handleFilter("search") }}
        activeSearch={activeSearch}
        setActiveSearch={setActiveSearch}
      />

      <div className={classes.list}>
        {/* <CssBaseline /> */}
        {count > 0 ? (
          <>
            <ReactSortable
              list={listesToDisplay}
              setList={() => {}}
              onUpdate={(arg) => handleDragDrop(arg.oldIndex, arg.newIndex)}
              className={classes.group}
            >
              {listesToDisplay.map((item, index) => rowRenderer(item, index))}
            </ReactSortable>
          </>
        ) : (
          <TitleTypography style={{ padding: "5px 15px" }}>
            Aucun manuel trouvé{" "}
          </TitleTypography>
        )}
      </div>
      <div name="vous" className={classes.appBar}>
        <SpeedialButton
          actions={[
            {
              name: "Ajouter",
              icon: <AddIcon />,
              handleClick: handleOpenProduct,
            },
            ...deleteManyAction,
            { name: "Vider", icon: <HourglassEmptyIcon />, handleClick: empty },
          ]}
        />
        <div className={classes.grow} />
      </div>

      {!checkable ? (
        <TitleTypography color="secondary" style={{ paddingLeft: "20px" }}>
          {count} manuel{pluriel(count)} trouvé{pluriel(count)}{" "}
        </TitleTypography>
      ) : (
        <TitleTypography color="primary" style={{ paddingLeft: "20px" }}>
          {checkedCount} manuel{pluriel(checkedCount)} sélectionné
          {pluriel(checkedCount)}
        </TitleTypography>
      )}

      {openProductsSelector && showProductSelector()}
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      school: prev !== null ? prev.school : {},
      classe: prev !== null ? prev.classe : {},
      products: prev !== null ? prev.products : {},
    }) ===
    JSON.stringify({
      school: next.school,
      classe: next.classe,
      products: next.products,
    })
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

const options = {
  //   includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["product.name", "product.isbn"],
};
