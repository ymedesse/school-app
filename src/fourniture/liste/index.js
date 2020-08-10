import React from "react";
import ListeFourniture from "./Fourniture";
import ListSkeleton from "../../components/ListSkeleton";
const Fourniture = ({ ...props }) => {
  const { params } = props.match;
  const { school, classe } = params;

  return (
    <>
      <React.Suspense
        fallback={<ListSkeleton count={5} height={50} margin="30px" />}
      >
        <ListeFourniture schoolSlug={school} classeSlug={classe} />
      </React.Suspense>
    </>
  );
};

export default Fourniture;
