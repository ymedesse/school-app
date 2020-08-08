import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import useSWR from "swr";
import Fade from "@material-ui/core/Fade";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { TitleTypography } from "../../../../components/Typography";

import { STATUS_UPDATE } from "../../container/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
}));

const LoacalStatusList = ({
  current,
  setCurrent,
  getListUrl,
  fetcher,
  localisation,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(current);
  const url = getListUrl();
  // const isSimple = localisation === STATUS_UPDATE;
  const { data } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    suspense: true,
  });

  const error = !data ? true : data.error ? true : false;

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
  const count = !error ? data.length : 0;

  return !error ? (
    <>
      {count > 0 ? (
        <List className={classes.root}>
          {data.map((item, index) => show(item, index))}
        </List>
      ) : (
        <Typography> Aucun status trouvé </Typography>
      )}
    </>
  ) : (
    <Typography color="secondary"> Une erreur s'est produite </Typography>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      localisation: prev !== null ? prev.localisation : "",
      current: prev !== null ? prev.current : "",
    }) ===
    JSON.stringify({
      localisation: next.localisation,
      current: next.current,
    })
  );
};

export default React.memo(LoacalStatusList, isEqual);
