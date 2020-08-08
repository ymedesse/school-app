import React from "react";
// import Skeleton from "@material-ui/lab/Skeleton";
import CircularProgress from "@material-ui/core/CircularProgress";

const PanierFallBack = ({ count = 3, height = 24, margin = "16px" }) => {
//   const getAll = () => {
//     const ske = [];
//     for (let i = 0; i < count; i++) {
//       ske.push(
//         <Skeleton
//           variant="rect"
//           width="100%"
//           height={height}
//           animation="wave"
//           style={{ marginBottom: margin }}
//         />
//       );
//     }
//     return ske;
//   };

  return (
    <div style={{ marginTop: "8px", width: "100%", height: "500px" }}>
      <div style={{ margin: "auto" }}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default PanierFallBack;
