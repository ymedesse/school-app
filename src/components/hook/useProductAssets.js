import React from "react";
import { API, defaultImage } from "../../config";

const useProductAssets = (assets) => {
  const init = {
    first: (assets || {}).featuredImage || defaultImage,
    images: (assets || {}).images || defaultImage,
  };
  const [value, setValues] = React.useState({ ...init });

  React.useEffect(() => {
    if (assets) {
      setValues((value) => ({
        ...formatedAssets(assets),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets]);

  const formatUrl = (id = "") => {
    return id.startsWith("http") ? id : `${API}/photo/${id}`;
  };

  const formateImages = (imgs = []) => {
    const results = [];
    for (let i = 0; i < imgs.length; i++) {
      const element = imgs[i];
      results.push(formatUrl(element));
    }
    return results;
  };

  const formatedAssets = (fAssets = {}) => {
    let { featuredImage, images = [] } = fAssets;

    if (images.indexOf(featuredImage) === -1) featuredImage = undefined;

    if (!featuredImage) featuredImage = images[0] || defaultImage;

    return {
      first: formatUrl(featuredImage),
      images: formateImages(images),
    };
  };

  return { ...value, formatedAssets };
};

export default useProductAssets;
