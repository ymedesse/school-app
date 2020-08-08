import React from "react";
import SwipeableViews from "react-swipeable-views";
import Button from "@material-ui/core/Button";

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: "#fff"
  },
  slide1: {
    backgroundColor: "#FEA900"
  },
  slide2: {
    backgroundColor: "#B3DC4A"
  },
  slide3: {
    backgroundColor: "#6AC0FF"
  }
};

function DemoSimple() {
  const init = [
    <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>,
    <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>,
    <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
  ];

  const [value, setValue] = React.useState(0);
  const [content, setContent] = React.useState(init);

  const handleChangeIndex = index => {
    setValue(index);
  };

  const addComponent = () => {
    setContent([
      ...content,
      <div style={Object.assign({}, styles.slide, styles.slide3)}>
        slide n°{content.length + 1}
      </div>
    ]);

    setValue(content.length);
  };

  const pop = () => {
    content.splice(value, 1);
    setContent([...content]);
    setValue(content.length - 1);
  };

  return (
    <div>
      <SwipeableViews
        enableMouseEvents
        index={value}
        ignoreNativeScroll={true}
        onChangeIndex={handleChangeIndex}
      >
        {content.map(item => item)}
      </SwipeableViews>
      <Button onClick={() => addComponent()}>ajouter</Button>
      <Button onClick={() => pop()}>Precedent</Button>
    </div>
  );
}

export default DemoSimple;
