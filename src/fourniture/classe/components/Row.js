import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { TitleTypography } from "../../../components/Typography";
import { ButtonNext, NextIconButton } from "../../../components/Buttons";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Box from "@material-ui/core/Box";
import { LabelText } from "../../../components/LabelValueTypography";

const Row = ({ value, handleClick, isMobile }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem
        ContainerComponent="div"
        role={undefined}
        button
        className={classes.list}
        onClick={handleClick}
      >
        <Box display="flex" width="100%">
          <Box>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                value={value.code}
                src={value.code}
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
              {value.code}
            </TitleTypography>
            <br />
            {value.name && (
              <LabelText
                variant={!isMobile ? "body2" : "caption"}
              >{`${value.name} `}</LabelText>
            )}
          </Box>
          <Box>
            {isMobile ? (
              <NextIconButton onClick={handleClick} />
            ) : (
              <ButtonNext
                onClick={handleClick}
                variant="text"
                label="liste 2020"
              />
            )}
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
      isMobile: prev.isMobile,
    }) ===
    JSON.stringify({
      value: next.value,
      isMobile: next.isMobile,
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
