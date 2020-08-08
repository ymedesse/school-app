import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

// import StarIcon from "@material-ui/icons/Star";
// import Radio from "@material-ui/icons/Radio";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { Radios } from "mui-rff";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    },
    textAlign: props => (!props.showLabel ? "center" : "left")

    // marginLeft: " 0px",
    // marginRight: " 0px"
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3"
    }
  }
});

// function StyledRadio(props) {
//   const classes = useStyles();

//   return (
//     <Radio
//       className={classes.root}
//       //  color="default"
//       color="primary"
//       icon={<StarIcon />}
//       {...props}
//     />
//   );
// }

// Inspired by blueprintjs
function StyledRadioMui({
  name,
  label,
  checklabel,
  className,
  value,
  hideFeaturedCheckLabel,
  ...props
}) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const showLabel =
    (!mobile && !hideFeaturedCheckLabel) || !hideFeaturedCheckLabel;
  const classes = useStyles({ showLabel });

  
  return (
    <Radios
      label={showLabel && label}
      name={name}
      formControlProps={{ margin: "none", style: { margin: "0px" } }}
      formControlLabelProps={{
        style: {
          margin: "0px",
          maxHeight: "30px"
        },
        color: "primary"
      }}
      data={[
        {
          label: showLabel && checklabel,
          value: value
        }
      ]}
      className={clsx(className, classes.root)}
      {...props}
    />
  );
}

export default StyledRadioMui;
