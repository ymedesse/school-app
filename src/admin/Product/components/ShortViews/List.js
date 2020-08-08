import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ProductThumbnail from "../../../Product/components/ProductThumbnail";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Link from "@material-ui/core/Link";
import DiscountPercentLabel from "../DiscountPercentLabel";
import Title from "../ProductFullTitle";
import SalePrice from "../SalePrice";
import Divider from "@material-ui/core/Divider";
import { SubLargeTypography } from "../../../components/Typography";
const ItemList = ({ cart, removeItem }) => {
  const classes = useStyles();
  const { bags } = cart;
  const count = bags.length;

  return (
    <List className={classes.root} aria-label="cart">
      {count > 0 ? (
        bags.map((item, index) => (
          <div key={item.id}>
            <ListItem alignItems="flex-start" dense>
              <ListItemAvatar className={classes.image}>
                <ProductThumbnail product={item} imageFile={item.image} />
              </ListItemAvatar>

              <ListItemText
                primary={<Title item={item} />}
                secondary={
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => removeItem(item.id)}
                  >
                    supprimer
                  </Link>
                }
              />

              <ListItemSecondaryAction className={classes.secondaryItem}>
                <DiscountPercentLabel
                  classes={classes.discount}
                  discount={item.discount}
                />
                <SalePrice bag={item} />
              </ListItemSecondaryAction>
            </ListItem>
            {index !== count - 1 && <Divider component="div" />}
          </div>
        ))
      ) : (
        <SubLargeTypography style={{ paddingLeft: "16px" }}>
          Votre panier est vide
        </SubLargeTypography>
      )}
    </List>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    maxHeight: "300px",
    paddingRight: "16px",
    overflowY: "auto",
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
}));

const isEqual = (prev, next) => {
  return JSON.stringify(prev.cart) === JSON.stringify(next.cart);
};

export default React.memo(ItemList, isEqual);
