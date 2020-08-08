import React, { useState } from "react";
import RichTextEditor from "react-rte";

const Example = () => {
  const [state, setState] = useState({
    value: RichTextEditor.createEmptyValue()
  });

  const onChange = value => {
    setState({ value });

    // Send the changes up to the parent component as an HTML string.
    // This is here to demonstrate using `.toString()` but in a real app it
    // would be better to avoid generating a string on each change.
    
  };

  return <RichTextEditor value={state.value} onChange={onChange} />;
};

export default Example;
