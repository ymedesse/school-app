import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { CART_LINK, COMMANDE_LINK } from "../../../routerLinks";
import ToolTipMenu from "../../../components/ToolTipMenuCtrl";
import Content from "./Content";
// const Content = React.lazy(() => import("./Content"));
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  iconButton: {
    // padding: "12px",
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    },
  },
}));

const CommandeBadge = withStyles((theme) => ({
  badge: {
    // right: -3,
    // top: 13,
    backgroundColor: orange[700],
    // padding: "0 4px",
  },
}))(Badge);

const defaultCart = { count: 0, products: [] };

const ShortView = ({
  values = defaultCart,
  removeItem,
  file = "cart",
  icon = <ShoppingCartIcon />,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const isCommande = file === "commande";

  const content = ({ handleClose }) => (
    <Content
      removeItem={removeItem}
      values={values}
      handleClose={handleClose}
      file={file}
    />
  );

  const actionner = (handleClick) => (
    <IconButton
      aria-label="commande cart"
      className={classes.iconButton}
      color="inherit"
      onClick={() => history.push(isCommande ? COMMANDE_LINK : CART_LINK)}
    >
      {isCommande ? (
        <CommandeBadge badgeContent={values.count} color="secondary">
          {icon}
        </CommandeBadge>
      ) : (
        <Badge badgeContent={values.count} color="secondary">
          {icon}
        </Badge>
      )}
    </IconButton>
  );

  return (
    <div>
      <ToolTipMenu actionner={actionner} content={content} />
    </div>
  );
};

export default ShortView;
