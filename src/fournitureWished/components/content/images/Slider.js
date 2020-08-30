import React, { lazy, Suspense } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Skeleton from "@material-ui/lab/Skeleton";

const FileSilder = lazy(() =>
  import("../../../../upload/components/FileSlider")
);

const ProductImagesSlider = ({
  fields,
  loading,
  imageWidth,
  mobileImageWidth,
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleDeleteImage = (fields) => (id) => {
    const { value } = fields;
    const i = value.find((item) => item.id === id);
    fields.remove(i);
  };

  const skeletonForm = (
    <Skeleton
      variant="rect"
      width="100%"
      height={mobile ? mobileImageWidth : imageWidth}
    />
  );

  return (
    <>
      <Suspense fallback={skeletonForm}>
        {loading ? (
          skeletonForm
        ) : (
          <FileSilder
            images={(fields.value || []).map((item) => {
              return { id: item, label: item };
            })}
            featuredFile={{}}
            handleDelete={handleDeleteImage(fields)}
            width="80px"
            mobileWidth="70px"
            hideFeaturedCheckLabel={true}
          />
        )}
      </Suspense>
    </>
  );
};

export default ProductImagesSlider;
