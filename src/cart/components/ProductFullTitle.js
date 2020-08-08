import React from "react";
// import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { PRODUCT_LINK } from "../../routerLinks";

/**
 *
 * @param {int} discount
 */
const Title = ({ item, quantity }) => {
  return (
    <>
      <Link
        component={RouterLink}
        variant="subtitle2"
        to={PRODUCT_LINK + "/" + item.slug}
      >
        {quantity}
        {" x "}
        {item.name}
        {/* {item.variant && (
          <>
            <br /> {item.variant.name}{" "}
          </>
        )} */}
      </Link>

      <Typography noWrap={true} style={{ maxWidth: "95%" }} variant="body2">
        {item.isbn && <> {item.isbn}</>}

        {item.brands && (
          <>
            <br /> {item.brands[0]}
          </>
        )}
      </Typography>
    </>
  );
};

export default Title;
