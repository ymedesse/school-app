import React, { useEffect, lazy, useState } from "react";
import useSWR from "swr";
import List from "@material-ui/core/List";
import { useHistory } from "react-router-dom";
import { TitleTypography } from "../../components/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ListSkeleton from "../../components/ListSkeleton";
import SwrRender from "../../components/SwrRender";
import { ORDERS_LINK } from "../../routerLinks";
import compareProps from "../../utils/compareProps";
import { INSTALLMENT_PAYMENT_LINK } from "../../routerLinks";

// const Row = lazy(() => import("./Row"));
const Row = lazy(() => import("./Row"));

const OrderList = ({ fetcher, url, ...restProps }) => {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState({
    data: [],
    current: "",
    dialogOpener: false,
    action: "",
    filter: {},
  });

  const { data } = state;

  const { data: sourceData } = useSWR(url, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: true,
  });

  const error = !sourceData
    ? true
    : sourceData && sourceData.error
    ? true
    : false;

  useEffect(() => {
    if (sourceData && !sourceData.error) {
      setState((state) => ({ ...state, data: sourceData }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceData]);

  /* action */

  const handleClick = (id) => {
    console.log({ id });
    id !== undefined && history.push(ORDERS_LINK + "/" + id);
  };
  const handlePay = (id) => {
    history.push(INSTALLMENT_PAYMENT_LINK + "/" + id);
  };

  const header = () => <></>;

  const rowRenderer = (item, index) => {
    const id = item ? item.id : undefined;
    const key = id !== undefined ? id : index;
    return (
      id !== undefined && (
        <React.Suspense key={key} fallback={<ListSkeleton count={1} />}>
          <Row
            key={key}
            value={item}
            id={id}
            handleClick={() => handleClick(id)}
            handlePay={() => handlePay(id)}
          />
        </React.Suspense>
      )
    );
  };

  const showList = () => (
    <>
      {header()}
      {count > 0 ? (
        <>
          <List className={classes.contents}>{data.map(rowRenderer)}</List>
        </>
      ) : (
        <TitleTypography style={{ padding: "5px 0px" }}>
          Vous n'avez aucune commande dans vos historiques
        </TitleTypography>
      )}
    </>
  );

  const count = error ? 0 : data.length;

  return (
    <SwrRender data={sourceData}>
      {() => <div className={classes.list}>{showList()}</div>}
    </SwrRender>
  );
};

const isEqual = (prev, next) => {
  compareProps(prev, next, ["url"]);
};

export default React.memo(OrderList, isEqual);

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
  },
  margin: {
    marginBottom: theme.spacing(2),
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
  suspense: {},
}));
