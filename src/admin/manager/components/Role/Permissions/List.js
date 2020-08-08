import React, { lazy, useState } from "react";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import { TitleTypography } from "../../../../../components/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FormSpy } from "react-final-form";
import Suspenser from "../../../../../components/Suspenser";
import SpeedialButton from "../../../../../components/SpeedialButton";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import Fuse from "fuse.js";
import SearchField from "../../../../../components/SearchField";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";

const Row = lazy(() => import("./Row"));

const PermissionList = ({
  fieldName = "permissions",
  fields,
  form,
  submitting,
  valid,
  pristine,
  handleSubmit,
  withAddOptions = false,
  handleAdd,
  ...restProps
}) => {
  const classes = useStyles();
  const count = fields.length;

  const [checkData, setCheckData] = useState({
    checked: [],
    checkable: false,
  });
  const { checked, checkable } = checkData;
  const checkedCount = checked.length;
  const handleCheckable = () => {
    setCheckData({ ...checkData, checkable: !checkable });
  };

  const [values, setValues] = React.useState({
    indexSearch: [],
    search: "",
  });
  const { indexSearch = [], search } = values;

  const fuse = new Fuse(fields.value || [], options);
  const getSearchResult = (val) => {
    const result =
      val === ""
        ? (fields.value || []).map((item, index) => index)
        : fuse.search(val).map((v) => v.refIndex);
    return result;
  };

  React.useEffect(() => {
    setValues({
      ...values,
      indexSearch: getSearchResult(search),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.value]);
  const handleFilter = (name) => (event) => {
    const val = event.target.value;
    setValues({ ...values, search: val, indexSearch: getSearchResult(val) });
  };

  // other
  const rowRenderer = ({ field, index }) => {
    const content = (
      <Suspenser height={80} doubleFeadBack={false}>
        <FormSpy subscription={{ values: true }}>
          {({ values: sourceValues }) => {
            return (
              <>
                <Row
                  handleToggle={() => handleToggle(index)}
                  handleDelete={() => fields.remove(index)}
                  checked={checked}
                  checkable={checkable}
                  field={field}
                  permissions={sourceValues[`${fieldName}`][index]}
                  index={index}
                />
                {index !== fields.length - 1 && <Divider component="div" />}
              </>
            );
          }}
        </FormSpy>
      </Suspenser>
    );

    return <div key={index}>{content}</div>;
  };

  const handleToggle = (index) => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckData({ ...checkData, checked: newChecked });
  };

  const deleteSelection = () => {
    if (checkable && checkedCount > 0) {
      for (let i = 0; i < checked.length; i++) {
        fields.remove(i);
      }
    }
    setCheckData({ ...checkData, checked: [] });
  };

  const handleEmpty = () => {
    let i = fields.length;
    while (i > 0) {
      fields.remove(i - 1);
      i--;
    }
  };

  const AddAction = withAddOptions
    ? [
        {
          name: "Ajouter",
          icon: <AddIcon color="primary" />,
          handleClick: handleAdd,
        },
      ]
    : [];

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

  const refreshAction = !pristine
    ? [
        {
          name: "Rafraichir",
          icon: <AutorenewIcon />,
          handleClick: form.reset,
        },
      ]
    : [];

  const saveAction =
    valid && !pristine
      ? [
          {
            name: "Enregistrer",
            icon: <SaveIcon color="primary" />,
            handleClick: handleSubmit,
          },
        ]
      : [];

  const actionButton = (
    <div className={classes.appBar}>
      <SpeedialButton
        actions={[
          ...saveAction,
          ...refreshAction,
          {
            name: "Vider",
            icon: <HourglassEmptyIcon />,
            handleClick: handleEmpty,
          },
          ...AddAction,
          ...deleteManyAction,
        ]}
      />
      <div className={classes.grow} />
    </div>
  );

  const list = (
    <div className={classes.list}>
      {count > 0 ? (
        <List aria-label={fieldName}>
          {fields.map(
            (field, index) =>
              indexSearch.indexOf(index) !== -1 && rowRenderer({ field, index })
          )}
        </List>
      ) : (
        <TitleTypography style={{ padding: "5px 15px" }}>
          Aucun accès n'est liée à ce privillège. Veuillez en ajouter.
        </TitleTypography>
      )}
    </div>
  );

  return (
    <Paper elevation={0} square>
      <SearchField
        style={{ width: "100%" }}
        inputFieldProps={{ onChange: handleFilter("search") }}
        handleCheckable={handleCheckable}
        checkable={checkable}
        classes={classes.search}
      />
      {list}
      {actionButton}
      {/* <Debug /> */}
    </Paper>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      valid: prev.valid,
      pristine: prev.pristine,
      fields: prev.fields,
    }) ===
    JSON.stringify({
      valid: next.valid,
      pristine: next.pristine,
      fields: next.fields,
    })
  );
};

export default React.memo(PermissionList, isEqual);

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    position: "sticky",
    // marginTop: theme.spacing(5),
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  list: {
    flexGrow: 1,
    width: "100%",
    minHeight: "418px",
    maxHeight: "418px",
    overflowY: "auto",
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    right: 0,
    margin: "0 auto",
  },
  search: {
    padding: "0px",
  },
  suspense: {},
}));

const options = {
  //   includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["access.name"],
};
