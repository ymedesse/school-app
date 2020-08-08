import React from "react";
import ListeFourniture from "./Fourniture";
import ListSkeleton from "../../components/ListSkeleton"
const Fourniture = ({ ...props }) => {
  const { params } = props.match;
  const { school, classe } = params;

  return (
    <>
      <React.Suspense fallback={<ListSkeleton count={3} height={150} margin="56px" />}>
        <ListeFourniture schoolSlug={school} classeSlug={classe} />
      </React.Suspense>
    </>
  );
};

export default Fourniture;
