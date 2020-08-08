import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export const TextSkeleton = ({ style = {}, ...props }) => (
  <Skeleton
    animation="wave"
    height={32}
    width="50%"
    {...props}
    style={{ "display": "inline-flex", ...style }}
  />
);

export const CircleSkeleton = ({ style = {}, ...props }) => (
  <Skeleton
    variant="circle"
    animation="wave"
    width={40}
    height={40}
    style={{ "display": "inline-flex", ...style }}
    {...props}
  />
);

export const RectangleSkeleton = ({ style = {}, ...props }) => (
  <Skeleton
    variant="rect"
    animation="wave"
    width="80%"
    height={200}
    style={{ "display": "inline-flex", ...style }}
    {...props}
  />
);

export const ButtonSkeleton = ({ style = {}, ...props }) => (
  <Skeleton
    variant="rect"
    animation="wave"
    width={90}
    height={24}
    style={{ "display": "inline-flex", "margin": "8px 16px", ...style }}
    {...props}
  />
);
