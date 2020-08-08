import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import purple from "@material-ui/core/colors/purple";

import LazyLoad from "react-lazyload";

import { COMMANDE } from "../../container/constants";
import { TitleTypography } from "../../../components/Typography";
import SubAmountRow from "../SubAmountRow";
import ItemRow from "./row";
import TotalsAmount from "./TotalsAmount";
import compareProps from "../../../utils/compareProps";

const OrderContent = ({ order, showTitle = true }) => {
  const classes = useStyles();

  const {
    contents = [],
    type,
    shipping = {},
    totalAmount: orderAmount,
    leftToPay = 0,
    count: orderCount,
  } = order;

  const isCommande = type !== COMMANDE;
  const getTitleByClasseSchool = (classe, school) => {
    return `${school ? school.name : ""} ${classe ? classe.code : ""}`;
  };

  const getFournitureTitle = ({ names, classe, school }) => {
    const canTitleByClasseSchool = classe === undefined && school === undefined;

    const title = names
      ? `${names.firstName} ${names.lastName}`
      : !canTitleByClasseSchool
      ? getTitleByClasseSchool(classe, school)
      : "Nom classé";
    return title;
  };

  const getTotalList = () => {
    let val = 0;
    for (let i = 0; i < contents.length; i++) {
      const element = contents[i];
      val += parseInt(element.total) || 0;
    }

    return val;
  };

  const displayListProduct = (products, list) => {
    // const productCount = products.length;

    return products.map(
      (item, index) =>
        item && (
          <div key={`${item._id}-${list}${index}`}>
            <ListItem alignItems="flex-start" dense>
              <ItemRow item={item} isCommande={isCommande} />
            </ListItem>
            {/* {index !== productCount - 1 && (
              <Divider className={classes.divider} light={false} />
            )} */}
            <Divider className={classes.divider} light variant="middle" />
          </div>
        )
    );
  };

  const displayContent = (content, index) => {
    const { _id: id, list, products = [], total } = content;

    const title = getFournitureTitle(content);
    const count = products.length;
    const key = `list-${id || list}`;

    return (
      count > 0 && (
        <LazyLoad width="100%" key={index} once={true} offset={100}>
          <Paper variant="outlined" square key={key} className={classes.paper}>
            <li className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader className={classes.subheader}>
                  {title}
                </ListSubheader>
                <Divider className={classes.divider} light />
                {displayListProduct(products, list)}
                <SubAmountRow
                  rowProps={{ pl: 2, pr: 2 }}
                  label={<i>{`total ${title}`}</i>}
                  amount={<i>{`${total} fcfa`}</i>}
                />
              </ul>
            </li>
          </Paper>
        </LazyLoad>
      )
    );
  };

  return (
    <>
      {/* <CssBaseline /> */}
      <div className={classes.margin} />

      {showTitle && (
        <TitleTypography className={classes.title}>Produits</TitleTypography>
      )}
      <List className={classes.contents} subheader={<li />}>
        {orderCount > 0 && contents.map(displayContent)}
      </List>

      <Divider className={classes.divider} />

      <Paper className={classes.amount}>
        <TotalsAmount
          shippingTotal={shipping.total || 0}
          orderAmount={orderAmount}
          leftToPay={leftToPay}
          totalList={getTotalList()}
        />
      </Paper>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(1),
  },
  contents: {
    width: "100%",
    overflowY: "auto",
    position: "relative",
    // maxHeight: 200,
  },
  margin: {
    marginTop: theme.spacing(2.5),
  },

  divider: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(0.5),
    },
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  paper: {
    padding: theme.spacing(0, 2, 2, 2),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 0),
    },
  },

  amount: {
    padding: theme.spacing(1),
    backgroundColor: purple[50],

    // [theme.breakpoints.down("sm")]: {
    //   paddingTop: theme.spacing(2),
    // },
  },
  subheader: {
    maxHeight: "25px",
    display: "inline-flex",
  },
}));

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["order"]);
};

export default React.memo(OrderContent, isEqual);
// export default CartList;
