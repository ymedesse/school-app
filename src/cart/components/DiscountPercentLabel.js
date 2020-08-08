import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

/**
 * 
 * @param {int} discount 
 */
const Percent = ({ discount, classes }) => {
  const localClasses = useStyles();

  return (
    <>
      {discount > 0 && (
        <Typography
          color="textSecondary"
          className={clsx(localClasses.discount, classes)}
          variant="caption"
          display="block"
        >
          -{discount}%
        </Typography>
      )}
    </>
  );
};

const useStyles = makeStyles(theme => ({
  discount: {
    // font-size: 18px;
    //fontWeight: "500",
    padding: "2px 5px 2px 5px",
    backgroundColor: "#d51317",
    color: "#fff",

    margin: "auto",

    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(1)
    },
    width: "fit-content"
  }
}));

export default Percent;
