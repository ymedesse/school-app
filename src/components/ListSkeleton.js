import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
const ListSkeleton = ({
  count = 3,
  height = 24,
  animation = "wave",
  margin = "16px",
  width = "100%",
}) => {
  const getAll = () => {
    const ske = [];
    for (let i = 0; i < count; i++) {
      ske.push(
        <Skeleton
          variant="rect"
          width={width}
          height={height}
          animation={animation}
          style={{ marginBottom: margin }}
        />
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
