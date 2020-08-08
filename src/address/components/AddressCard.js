import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import {
  TitleTypography,
  SubLargeTypography
} from "../../components/assets";
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "230px",
    border: props => props.active && "1px solid #F3A847"
  },
  content: {
    padding: theme.spacing(1)
  }
}));

const AddressCard = ({ address, handleClick, active = false }) => {
  const classes = useStyles({ active });
  // console.log(product._id)
  return (
    <>
      <Card className={classes.card}>
        <CardActionArea onClick={() => handleClick(address._id)}>
          <CardContent className={classes.content}>
            <TitleTypography>{address.name}</TitleTypography>
            <div>
              <SubLargeTypography>
                {address.address}
                <br />
                {address.phone}
                <br />
                {address.postal}
              </SubLargeTypography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default React.memo(AddressCard);
