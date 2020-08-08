import React from "react";
// import { getProductsApi } from "./container/api";
import context from "../../../rootContext/context";
import ProductsList from "./List";
import SearchField from "../../../components/SearchField";
import CheckBoxSkeleton from "../../../components/CheckBoxSkeleton";
import Fuse from "fuse.js";

const Products = ({ data, ...props }) => {
  const { products, classe, school, _id: listeId } = data;
  const rootContext = React.useContext(context);

  const { addToCart, cart, commande } = rootContext.cart;

  const addItemToCart = (file = "cart") => (productId, quantity = 1) => {
    addToCart(
      productId,
      {
        list: listeId,
        quantity,
        classe: classe._id,
        school: school._id,
      },
      () => {},
      file
    );
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

  const handleFilter = (name) => (event) => {
    const val = event.target.value;
    setValues({ ...values, search: val, accesses: getSearchResult(val) });
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
        inputFieldProps={{ onChange: handleFilter("search") }}
        placeholder="Chercher par isbn, nom du manuel ..."
        showLeftToogle={false}
      />

      <React.Suspense fallback={<CheckBoxSkeleton count={5} height={50} />}>
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
