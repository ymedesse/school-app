import React from "react";
import { useHistory } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import context from "../../../rootContext/context";
import ProductsList from "./List";
import SearchField from "../../../components/SearchField";
import { ButtonSimple } from "../../../components/Buttons";
import Fuse from "fuse.js";
import { CART_LINK, COMMANDE_LINK } from "../../../routerLinks";
const Products = ({ data, ...props }) => {
  const history = useHistory();
  const { products, classe, school, _id: listeId } = data;
  const rootContext = React.useContext(context);

  const { addToCart, cart, commande } = rootContext.cart;
  const { setFullSuccess, performFullErrorAlert } = rootContext.alert;

  const addItemToCart = (file = "cart") => (product, quantity = 1) => {
    const title = file === "cart" ? "panier" : "liste à commander";
    console.log({ file, title });
    const { _id, name } = product;
    addToCart(
      _id,
      {
        list: listeId,
        quantity,
        classe: classe._id,
        school: school._id,
      },
      (data) => {
        if (data) {
          const { error } = data;
          performError(error, title);
          !error && performSuccess({ quantity, name }, title, file);
        }
      },
      file
    );
  };

  const performError = (error, title) =>
    error &&
    performFullErrorAlert(
      "Désolé, ce produit n'a pas pû être ajouter à votre " + title,
      { title: "Ajout au panier" }
    );

  const performSuccess = (product, typeTitle, file) => {
    const { quantity, name } = product;
    const isCart = file === "cart";
    setFullSuccess({
      message: `Votre ${typeTitle} contient ${quantity} quantité(s) de ${name}`,
      title: `Ajout avec succès`,
      action: (handleClose) => (
        <ButtonSimple
          onClick={() => {
            handleClose();
            history.push(isCart ? CART_LINK : COMMANDE_LINK);
          }}
          color="inherit"
          variant="text"
          size="small"
        >
          {isCart ? "Mon panier" : "Ma liste à commander"}
        </ButtonSimple>
      ),
    });
  };

  const [values, setValues] = React.useState({
    listes: products,
    search: "",
  });

  const { listes, search } = values;

  React.useEffect(() => {
    setValues({
      ...values,
      listes: getSearchResult(search),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const fuse = new Fuse(products || [], options);

  const getSearchResult = (val) => {
    const result = val === "" ? products : fuse.search(val).map((v) => v.item);

    return result;
  };

  const handleFilter = (event) => {
    const val = event.target.value;
    setValues({ ...values, search: val, listes: getSearchResult(val) });
  };

  const getProducts = (file = "cart") => {
    let prod = [];
    const { contents = [] } = file === "commande" ? commande || {} : cart;
    const cartListe = contents.find((item) => item.list === listeId);

    if (cartListe) {
      prod = cartListe.products || [];
    }
    return prod;
  };

  return (
    <>
      <SearchField
        style={{ width: "100%", margin: "8px 0px" }}
        inputFieldProps={{ onChange: handleFilter }}
        placeholder="Chercher par isbn, nom du manuel ..."
        showLeftToogle={false}
      />

      <React.Suspense fallback={<LinearProgress />}>
        <ProductsList
          addItemToCart={addItemToCart("cart")}
          addItemToCommande={addItemToCart("commande")}
          values={listes}
          listeId={listeId}
          cartProducts={getProducts("cart")}
          commandeProducts={getProducts("commande")}
        />
      </React.Suspense>
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      data: prev !== null ? prev.data : [],
    }) === JSON.stringify({ data: next.data })
  );
};

export default React.memo(Products, isEqual);

const options = {
  //   includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["product.name", "product.isbn"],
};
