import React from "react";
import LazyLoad from "react-lazyload";
const LazyLoadComponent = ({ children, ...props }) => {
  return (
    <LazyLoad width="100%" once={true} offset={100} {...props}>
      {children}
    </LazyLoad>
  );
};

export default LazyLoadComponent;
