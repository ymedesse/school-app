import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Skeleton from "@material-ui/lab/Skeleton";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import purple from "@material-ui/core/colors/purple";
import { TitleTypography } from "../../../../../components/Typography";
import useProductAssets from "../../../../../components/hook/useProductAssets";

const Images = React.lazy(() => import("../../ImagesLine"));

const ProductRow = ({
  handleToggle,
  checked,
  checkable = true,
  value = {},
  isCurrent,
  idField = "id",
  handleClick,
  isMobile,
}) => {
  const classes = useStyles({ status: value.status });
  const { images = [] } = useProductAssets(value.assets || {});

  const secondaryInformation = () => {
    const { quantity = 0, price, total } = value;
    return (
      <>
        <Box display="flex" p={0} style={{ width: "100%" }}>
          <Box flexGrow={1}>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {value.sku}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="body2" color="inherit">
              {quantity} x {price}
            </Typography>
            <Typography variant="subtitle2" className={classes.purple}>
              {total} Fcfa
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <ListItem
        ContainerComponent="div"
        role={undefined}
        dense
        button
        selected={isCurrent}
        onClick={() =>
          checkable
            ? handleToggle(value[`${idField}`])
            : handleClick && handleClick()
        }
      >
        {!isMobile && checkable && (
          <Fade in={checkable} timeout={2000}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value[`${idField}`]) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `value-list-${value[`${idField}`]}`,
                }}
              />
            </ListItemIcon>
          </Fade>
        )}

        <ListItemAvatar>
          <LightTooltip
            placement="right-start"
            interactive
            arrow
            title={
              <React.Suspense
                fallback={<Skeleton variant="circle" width={40} height={40} />}
              >
                <Images tileData={images || []} />
              </React.Suspense>
            }
          >
            <Avatar variant="rounded" alt={value.name} src={value[0]} />
          </LightTooltip>
        </ListItemAvatar>

        <ListItemText
          primary={
            <>
              <TitleTypography
                component="span"
                variant="subtitle2"
                className={classes.inline}
                color="primary"
              >
                {value.name}
              </TitleTypography>
            </>
          }
          disableTypography
          secondary={secondaryInformation()}
        />
      </ListItem>
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      checked: prev.checked,
      checkable: prev.checkable,
      value: prev.value,
      isMobile: prev.isMobile,
    }) ===
    JSON.stringify({
      checked: next.checked,
      checkable: next.checkable,
      value: next.value,
      isMobile: next.isMobile,
    })
  );
};

export default React.memo(ProductRow, isEqual);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  status: {
    color: "chocolate",
  },
  purple: {
    color: purple[500],
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: "0px",
  },
}))(Tooltip);
