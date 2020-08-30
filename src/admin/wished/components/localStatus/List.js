import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { TitleTypography } from "../../../../components/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
}));

const LoacalStatusList = ({ current, status, setCurrent }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(current);

  const getId = (value) => {
    return value.id;
  };

  React.useEffect(() => {
    current && setChecked((checked) => getId(current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const handleToggle = (value) => {
    setChecked((checked) => getId(value));
    setCurrent(value);
  };

  const show = (item, index) => {
    const id = getId(item);
    const isChecked = checked === id;

    return (
      <ListItem
        key={id}
        ContainerComponent="div"
        role={undefined}
        dense
        button
        selected={isChecked}
        onClick={() => handleToggle(item)}
      >
        <Fade in={true} timeout={2000}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isChecked}
              tabIndex={-1}
              disableRipple
              inputProps={{
                "aria-labelledby": `value-list-${id}`,
              }}
            />
          </ListItemIcon>
        </Fade>

        <ListItemText
          primary={
            <>
              <TitleTypography
                component="span"
                variant="subtitle2"
                color="inherit"
              >
                {item.label}
              </TitleTypography>
            </>
          }
          disableTypography
        />
      </ListItem>
    );
  };
  const count = status.length;

  return (
    <>
      {count > 0 ? (
        <List className={classes.root}>
          {status.map((item, index) => show(item, index))}
        </List>
      ) : (
        <Typography> Aucun status trouvé </Typography>
      )}
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      current: prev !== null ? prev.current : "",
    }) ===
    JSON.stringify({
      current: next.current,
    })
  );
};

export default React.memo(LoacalStatusList, isEqual);
