import React, { useState } from "react";
// import Paper from "@material-ui/core/Paper";
import { PreviousIconButton, NextIconButton } from "./assets";
import SwipeableViews from "react-swipeable-views";
import { makeStyles /*fade*/ } from "@material-ui/core/styles";
/**
 *
 * @param {Array} contents Array of component to show
 */
const Slider = ({ contents }) => {
  const max = contents.length - 1;
  const [index, setIndex] = useState(0);
  const viewHandleChange = (ndex, indexLatest, meta) => {
    setIndex(ndex);
  };

  const classes = useStyles();

  const incrementIndex = () => {
    if (index < contents.length - 1) {
      setIndex(index + 1);
    }
  };

  const decrementIndex = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className={classes.root}>
      {index !== 0 && (
        <PreviousIconButton
          className={`${classes.button} ${classes.buttonLeft}`}
          size="small"
          onClick={decrementIndex}
        />
      )}
      <SwipeableViews
        //enableMouseEvents
        style={style.swipper}
        slideStyle={style.slideStyle}
        containerStyle={style.sliderConatainer}
        index={index}
        onChangeIndex={viewHandleChange}
        threshold={10}
      >
        {contents.map((content, index) => (
          <div key={index}>{content}</div>
        ))}
      </SwipeableViews>

      {index < max && (
        <NextIconButton
          className={`${classes.button} ${classes.buttonRight}`}
          size="small"
          onClick={incrementIndex}
        />
      )}
    </div>
  );
};

const style = {
  swipper: {},
  slideStyle: {
    padding: "0px",
    width: "auto"
  },
  sliderConatainer: {
    maxWidth: 250
  }
};
const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex",
    padding: theme.spacing(1),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },

  slider: {
    position: "relative"
  },
  button: {
    position: "absolute",
    zIndex: 1,
    top: `calc(50%  - ${theme.spacing(2)}px)`,
    borderRadius: "5px",
    height: "20%",
    color: theme.palette.primary.contrastText,
    //  backgroundColor: fade(theme.palette.primary.main, 0.6),
    backgroundColor: theme.palette.primary.main,

    "&:hover": {
      //backgroundColor: fade(theme.palette.primary.main, 0.9),
      backgroundColor: theme.palette.primary.dark
    }
  },

  buttonLeft: {
    left: theme.spacing(1)
  },
  buttonRight: {
    right: theme.spacing(1)
  }
}));

export default Slider;
