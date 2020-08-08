import React from "react";
import useSWR from "swr";
import ShowProductsItems from "../Catalogue/components/ShowProductsItems";
import { RELATED_PRODUCT_URL } from "./containers/urls";

const Product = ({ addToCart, slug }) => {
  const urlRelated = RELATED_PRODUCT_URL + slug;

  const { data: relatedProduct } = useSWR(urlRelated);

  return (
    <>
      {relatedProduct.length > 0 && (
        <ShowProductsItems
          products={relatedProduct}
          title="Vous pourrez aussi aimer"
          addToCart={addToCart}
        />
      )}
    </>
  );
};

export default Product;
