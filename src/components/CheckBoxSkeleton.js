import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
const ListSkeleton = ({ count = 3, height = 24, margin = "16px" }) => {
  const getAll = () => {
    const ske = [];
    for (let i = 0; i < count; i++) {
      ske.push(
        <Box display="flex" width="100%">
          <Box mr={2} mb={2}>
            <Skeleton
              variant="rect"
              width={50}
              height={height}
              animation="wave"
            />
          </Box>
          <Box flexGrow={1}>
            <Skeleton
              variant="rect"
              // width="100%"
              height={height}
              animation="wave"
            />
          </Box>
        </Box>
      );
    }
    return ske;
  };

  return (
    <div style={{ marginTop: "8px", width: "100%" }}>
      {getAll().map((item, index) => (
        <React.Fragment key={index}>{item}</React.Fragment>
      ))}
    </div>
  );
};

export default ListSkeleton;
