import React from "react";
import ListeFourniture from "./Fourniture";

import LinearProgress from "@material-ui/core/LinearProgress";
const Fourniture = ({ ...props }) => {
  const { params } = props.match;
  const { school, classe } = params;

  return (
    <>
      <React.Suspense fallback={<LinearProgress />}>
        <ListeFourniture schoolSlug={school} classeSlug={classe} />
      </React.Suspense>
    </>
  );
};

export default Fourniture;
