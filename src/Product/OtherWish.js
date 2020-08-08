import React from "react";
import useSWR from "swr";
import ShowProductsItems from "../Catalogue/components/ShowProductsItems";
import { RELATED_PRODUCT_URL } from "./containers/urls";

const Product = ({ addToCart, slug }) => {
  const urlRelated = RELATED_PRODUCT_URL + slug;

  const { data: whishList } = useSWR(urlRelated);

  return (
    <>
      {whishList.length > 0 && (
        <ShowProductsItems
          products={whishList}
          title="Vous pourrez aussi aimer"
          addToCart={addToCart}
        />
      )}
    </>
  );
};

export default Product;
