import React from "react";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

import { ButtonNext } from "../../../components/Buttons";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { TitleTypography } from "../../../components/Typography";
import { MiniLabelText } from "../../../components/LabelValueTypography";

const Row = ({ value, handleClick, isMobile }) => {
  const classes = useStyles();
  
  return (
    <>
      <ListItem
        ContainerComponent="div"
        role={undefined}
        button
        className={classes.list}
        onClick={isMobile ? handleClick : () => {}}
      >
        <Box display="flex" width="100%">
          <Box>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                alt={value.name}
                src={value.image}
                onClick={handleClick}
              />
            </ListItemAvatar>
          </Box>
          <Box flexGrow={1}>
            <TitleTypography
              variant="subtitle2"
              color="primary"
              className={classes.inline}
            >
              {value.name}
            </TitleTypography>
            <br />
            {value.address && (
              <MiniLabelText
                variant={!isMobile ? "body2" : "caption"}
              >{`${value.address} `}</MiniLabelText>
            )}
            {value.phone && (
              <MiniLabelText
                variant={!isMobile ? "body2" : "caption"}
                className={classes.contact}
              >
                Tel : {value.phone}
              </MiniLabelText>
            )}
          </Box>
          <Box>
            <ButtonNext
              onClick={handleClick}
              variant="text"
              label={isMobile ? "listes" : "Voir les listes"}
            />
          </Box>
        </Box>
      </ListItem>

      <Divider variant="inset" component="div" />
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      value: prev.value,
    }) ===
    JSON.stringify({
      value: next.value,
    })
  );
};

export default React.memo(Row, isEqual);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  list: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 0),
    },
  },
  contact: {
    [theme.breakpoints.down("sm")]: {
      display: "block !important",
    },
  },
}));
