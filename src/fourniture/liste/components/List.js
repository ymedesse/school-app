import React from "react";
import { TitleTypography } from "../../../components/Typography";
// import { useHistory } from "react-router-dom";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LazyLoad from "react-lazyload";

const ProductRow = React.lazy(() => import("./Row"));

const ProductList = ({
  values,
  addItemToCart,
  addItemToCommande,
  cartProducts,
  commandeProducts,
  listeId,
  ...restProps
}) => {
  const classes = useStyles();
  // const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClick = (item) => {
    // history.push(CLASSES_LINK + "/" + item.slug);
  };

  function rowRenderer(item, index) {
    const { product = {} } = item;
    const { stock } = product !== null ? product : {};
    return (
      product && (
        <div style={{ marginBottom: "8px" }} key={item._id}>
          <LazyLoad height={200} once={true} offset={100}>
            <ProductRow
              isMobile={isMobile}
              value={product}
              addItemToCart={addItemToCart}
              selectedProduct={stock > 0 ? cartProducts : commandeProducts}
              handleClick={() => handleClick(item)}
              addItemToCommande={addItemToCommande}
            />
          </LazyLoad>
        </div>
      )
    );
  }

  const count = values.length;
  return (
    <div className={classes.paper}>
      {count > 0 ? (
        values.map((item, index) => rowRenderer(item || {}, index))
      ) : (
        <TitleTypography style={{ padding: "5px 15px" }}>
          Aucune liste de fourniture n'est encore disponible pour cette école
        </TitleTypography>
      )}
    </div>
  );
};

export default React.memo(ProductList);

const useStyles = makeStyles((theme) => ({
  list: {
    flexGrow: 1,
    width: "100%",
    minHeight: "400px",
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
    },
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
