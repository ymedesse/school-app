import React from "react";
import { Link as RouterLink } from "react-router-dom";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ReplayIcon from "@material-ui/icons/Replay";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { CartHeader, CartItemRow } from "./CartRow";
import CartItemRowMobile from "./CartRowMobile";
import { SHOP_LINK } from "../../routerLinks";
import LazyLoad from "react-lazyload";
import Tooltip from "@material-ui/core/Tooltip";
import { CART } from "../containers/constants";
import { TitleTypography } from "../../components/Typography";
import EmptyCart from "./CartEmpty";
const CartList = ({
  file,
  cart,
  removeFromCart,
  updateCart,
  setItemCount,
  refresh,
  fieldError,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { contents = [] } = cart;
  const count = cart.count;

  const cartBottom = () => (
    <Box display="flex" style={{ width: "100" }}>
      <Box>
        <Button
          size="small"
          margin="dense"
          startIcon={<NavigateBeforeIcon />}
          className={classes.button}
          color="inherit"
          component={RouterLink}
          to={SHOP_LINK}
        >
          Acheter encore
        </Button>
      </Box>
      <Box flexGrow={1}></Box>
      <Box>
        <CheckButtonSubmit error={fieldError}>
          <Button
            size="small"
            startIcon={<ReplayIcon />}
            variant="outlined"
            className={classes.button}
            color="inherit"
            onClick={updateCart}
          >
            Actualiser panier
          </Button>
        </CheckButtonSubmit>
      </Box>
    </Box>
  );

  const removeItem = (listId) => (id) => {
    removeFromCart(id, listId, () => refresh());
  };

  const displayListProduct = (products, list) => {
    const productCount = products.length;

    return products.map(
      (item, index) =>
        item && (
          <div key={`${item.product._id}-${list}`}>
            <ListItem alignItems="flex-start" dense>
              {mobile ? (
                <CartItemRowMobile
                  setItemCount={setItemCount(item.product._id, list)}
                  removeItem={removeItem(list)}
                  item={item}
                  isCommande={isCommande}
                />
              ) : (
                <CartItemRow
                  setItemCount={setItemCount(item.product._id, list)}
                  removeItem={removeItem(list)}
                  item={item}
                  isCommande={isCommande}
                />
              )}
            </ListItem>
            {index !== productCount - 1 && (
              <Divider className={classes.divider} light={false} />
            )}
          </div>
        )
    );
  };

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

    const count = products.length || 0;
    return (
      count > 0 && (
        <LazyLoad width="100%" key={_id} once={true} offset={100}>
          <Paper key={_id} className={classes.paper}>
            <li key={`list-${_id || list}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader style={{ maxHeight: "25px" }}>
                  {title}
                </ListSubheader>
                {displayListProduct(products, list)}
              </ul>
            </li>
          </Paper>
        </LazyLoad>
      )
    );
  };

  const isCommande = file !== CART;
  const tabTitle = isCommande ? "dans votre panier" : "à commander";

  return (
    <>
      {/* Enthte du panier */}
      {count > 0 ? (
        <>
          <CartHeader
            title={
              <TitleTypography className={classes.headerTitle} gutterBottom>
                Vous avez {count || 0} article{count > 1 && "s"} {tabTitle}
              </TitleTypography>
            }
          />
          <div className={classes.margin} />

          <List className={classes.contents} subheader={<li />}>
            {count > 0 && contents.map((content) => displayContent(content))}
          </List>
          {cartBottom()}
        </>
      ) : (
        <EmptyCart isCommande={isCommande} />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  contents: {
    width: "100%",
    overflowY: "auto",
    position: "relative",
    // maxHeight: 200,
  },
  margin: {
    marginTop: theme.spacing(2.5),
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "unset",
    color: theme.palette.grey["A400"],
    lineHeight: "1",
  },
  cartItemRow: {
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  headerTitle: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
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
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },
}));

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      cart: prev !== null ? prev.cart : {},
      fieldError: prev !== null ? prev.fieldError : {},
    }) === JSON.stringify({ cart: next.cart, fieldError: next.fieldError })
  );
};

export default React.memo(CartList, isEqual);
// export default CartList;

const CheckButtonSubmit = ({ error, children }) => {
  const buttonRef = React.createRef();

  return error ? (
    <Tooltip ref={buttonRef} title="Il existe des quantités invalides">
      {children}
    </Tooltip>
  ) : (
    children
  );
};
