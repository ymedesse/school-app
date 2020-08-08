import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import { ButtonSimple } from "./Buttons";
import ToggleButton from "@material-ui/lab/ToggleButton";

import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase({
  inputFieldProps,
  handleShowFilter,
  handleCheckable,
  search,
  checkable,
  classes = {},
  activeSearch = true,
  setActiveSearch,
  showLeftToogle = true,
  placeholder = "Isbn, nom , marque, collection, selection .... ",
  ...paperProps
}) {
  const localClasses = useStyles();

  const [searched, setSearch] = React.useState(activeSearch);

  React.useState(() => {
    setSearch(activeSearch);
  }, [activeSearch]);

  const handleSearchActive = () => {
    setSearch(!searched);
    setActiveSearch && setActiveSearch();
  };

  return (
    <Paper {...paperProps} className={clsx(localClasses.root, classes)}>
      <IconButton
        // type="submit"
        className={localClasses.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        {...inputFieldProps}
        className={localClasses.input}
        placeholder={placeholder}
        inputProps={{
          "aria-label": "Isbn, nom , marque, collection, selection",
        }}
      />
      {handleShowFilter && (
        <>
          <Divider className={localClasses.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={localClasses.iconButton}
            onClick={handleShowFilter}
            aria-label="filter"
          >
            <FilterListIcon />
          </IconButton>
        </>
      )}
      {handleCheckable && (
        <>
          <Divider className={localClasses.divider} orientation="vertical" />
          <ButtonSimple variant="text" onClick={handleCheckable}>
            <strong> {!checkable ? "Sélectioner" : "Annuler"} </strong>
          </ButtonSimple>
        </>
      )}

      {showLeftToogle && (
        <ToggleButton
          value="check"
          selected={searched}
          onChange={handleSearchActive}
          size="small"
        >
          <SearchIcon />
        </ToggleButton>
      )}
    </Paper>
  );
}

// const ToggleButton = withStyles((theme) => ({
//   root: {
//     margin: theme.spacing(1),
//     textTransform: "unset",
//     lineHeight: "1",
//   },
// }))(({ ...props }) => (
//   <MuiToggleButton size="small" variant="outlined" color="inherit" {...props} />
// ));
