import React, { lazy } from "react";
import Slider from "../../components/Slider";
import LazyLoad from "react-lazyload";

const Image = lazy(() => import("./Image"));
/**
 *
 * @param {[Object]} images Liste des images à afficher
 * @param {Object} featuredFile L'image mise en avant
 * @param {func} setOneFeaturedImage Modifie l'unique imagemise en avant
 *
 */
export default function FileSilder({
  images,
  featuredFile,
  handleDelete,
  featuredImageField,
  width,
  mobileWidth,
  hideFeaturedCheckLabel,
}) {
  const renderImage = (item, index) => {
    return (
      <LazyLoad width="100%" key={item[item.id]} once={true} offset={100}>
        <Image
          isAFeatured={featuredFile ? featuredFile.id === item.id : false}
          value={item}
          handleDelete={handleDelete}
          featuredImageField={featuredImageField}
          key={item.id}
          width={width}
          mobileWidth={mobileWidth}
          hideFeaturedCheckLabel={hideFeaturedCheckLabel}
        />
      </LazyLoad>
    );
  };
  return <Slider contents={images.map((item) => renderImage(item))} />;
}
