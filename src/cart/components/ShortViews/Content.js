import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import List from "./List";
const Content = ({ handleClose, values, removeItem, file }) => {
  const { count } = values;
  return (
    <>
      <Header file={file} count={count} />
      <List values={values} removeItem={removeItem} file={file} />
      <Footer
        count={count}
        handleClose={handleClose}
        amount={values.total}
        file={file}
      />
    </>
  );
};

export default Content;
