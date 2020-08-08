import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ProductThumbnail from "../../../Product/components/ProductThumbnail";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Link from "@material-ui/core/Link";
import DiscountPercentLabel from "../DiscountPercentLabel";
import Title from "../ProductFullTitle";
import SalePrice from "../SalePrice";
import Divider from "@material-ui/core/Divider";
import { SubTitleTypography } from "../../../components/Typography";

import useProductAssets from "../../../components/hook/useProductAssets";

const ItemList = ({ values, removeItem, file }) => {
  const classes = useStyles();
  const { contents, count } = values;
  const { formatedAssets } = useProductAssets();

  const isCommande = file === "commande";
  const emptyText = !isCommande
    ? "Votre panier est vide"
    : "Votre liste à commander est vide";

  const displayListProduct = (products, list) =>
    products.map((item, index) => {
      const { product, quantity } = item;
      const id = product ? product._id : undefined;

      const { first } = formatedAssets(product.assets);

      return (
        id && (
          <div key={product._id}>
            <ListItem alignItems="flex-start" dense>
              <ListItemAvatar className={classes.image}>
                <ProductThumbnail product={product} imageFile={first} />
              </ListItemAvatar>

              <ListItemText
                primary={<Title quantity={quantity} item={product} />}
                secondary={
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => removeItem(product._id, list)}
                  >
                    supprimer
                  </Link>
                }
              />

              <ListItemSecondaryAction className={classes.secondaryItem}>
                <DiscountPercentLabel
                  classes={classes.discount}
                  discount={product.discount}
                />
                <SalePrice
                  quantity={quantity}
                  product={product}
                  priceField={isCommande ? "order_price" : "sale_price"}
                />
              </ListItemSecondaryAction>
            </ListItem>
            {index !== count - 1 && <Divider component="div" />}
          </div>
        )
      );
    });

  const getTitleByClasseSchool = (classe, school) => {
    return `${school ? school.name : ""} ${classe ? classe.code : ""}`;
  };
  const displayContent = (content) => {
    const { _id, list, names, products = [], classe, school } = content;

    const canTitleByClasseSchool = classe === undefined && school === undefined;
    const title = names
      ? `${names.firstName} ${names.lastName}`
      : !canTitleByClasseSchool
      ? getTitleByClasseSchool(classe, school)
      : "Nom classé";

    const count = products.length;
    return (
      count > 0 && (
        <li key={`list-${_id || list}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader style={{ maxHeight: "25px" }}>{title}</ListSubheader>
            {displayListProduct(products, list)}
          </ul>
        </li>
      )
    );
  };

  return (
    <>
      <List className={classes.root} subheader={<li />} aria-label="cart">
        {count > 0 ? (
          contents.map((content) => displayContent(content))
        ) : (
          <SubTitleTypography style={{ paddingLeft: "16px" }}>
            {emptyText}
          </SubTitleTypography>
        )}
      </List>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    maxHeight: "300px",
    paddingRight: "16px",
    overflowY: "auto",
    // position: "relative",
    // overflow: "auto",
  },
  inline: {
    display: "inline",
  },
  discount: {
    marginRight: "auto",
    // textAlign: "center"
  },
  image: {
    maxWidth: 55,
  },
  secondaryItem: {
    right: "0px",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

const isEqual = (prev, next) => {
  return JSON.stringify(prev.values) === JSON.stringify(next.values);
};

export default React.memo(ItemList, isEqual);
