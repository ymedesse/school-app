import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { TitleTypography } from "../../components/Typography";
import { ButtonNext, NextIconButton } from "../../components/Buttons";
import Fade from "@material-ui/core/Fade";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const Row = ({ value, handleClick, isMobile }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem
        ContainerComponent="div"
        role={undefined}
        button={isMobile}
        // dense={isMobile}
        onClick={isMobile ? handleClick : () => {}}
      >
        <Fade in={true} timeout={2000}>
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              alt={value.name}
              src={value.image}
              onClick={handleClick}
            />
          </ListItemAvatar>
        </Fade>
        <Fade in={true} timeout={2000}>
          <ListItemText
            primary={
              <TitleTypography
                variant="subtitle2"
                color="primary"
                className={classes.inline}
              >
                {value.name}
              </TitleTypography>
            }
            secondary={`${value.address} -- ${value.phone}`}
          />
        </Fade>
        <Fade in={true} timeout={2000}>
          <ListItemSecondaryAction>
            {isMobile ? (
              <NextIconButton onClick={handleClick} />
            ) : (
              <ButtonNext
                onClick={handleClick}
                variant="text"
                label="Voir les listes"
              />
            )}
          </ListItemSecondaryAction>
        </Fade>
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
}));
