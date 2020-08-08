import React from "react";
import List from "./List";
import ListSkeleton from "../../components/ListSkeleton";
import { LargeTypography } from "../../components/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TypeFilter from "./TypeFilters";

const Orders = ({ getFetcher, getReadUrl, getOrdersList, ...props }) => {
  const [filter, setFilter] = React.useState({});
  const fetcher = getFetcher();
  const classes = useStyles();

  const url = getOrdersList(filter);
  const handleFilter = (name) => (val) => {
    setFilter((filter) => ({ ...filter, [`${name}`]: val }));
  };

  return (
    <>
      <LargeTypography>Mes commandes</LargeTypography>
      <div className={classes.margin} />
      <TypeFilter handleChange={handleFilter("type")} />
      <React.Suspense fallback={<ListSkeleton count="50" />}>
        <List fetcher={fetcher} url={url} />
      </React.Suspense>
    </>
  );
};

export default React.memo(Orders);

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
}));
