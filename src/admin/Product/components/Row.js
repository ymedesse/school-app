import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Fade from "@material-ui/core/Fade";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import { TitleTypography } from "../../../components/Typography";
import SuspensePaper from "../../../components/SuspensePaper";
import useProductAssets from "../../../components/hook/useProductAssets";

const Images = React.lazy(() => import("./ImagesLine"));

const Row = ({
  handleToggle,
  checked,
  checkable,
  value = {},
  isCurrent,
  idField = "_id",
  handleClick,
}) => {
  const classes = useStyles({ status: value.status });
  const { first, images } = useProductAssets(value.assets);

  const labelStatus =
    ["draft", "pending"].indexOf((value || {}).status) !== -1
      ? `~~${value.status}`
      : "";

  const price = value.price || 0;
  const regular_price = value.regular_price || 0;
  const sale_price = value.sale_price || 0;

  const catCount = value.categories ? value.categories.length : 0;
  const classeCount = value.classes ? value.classes.length : 0;
  const useByListes = value.useByListes || [];
  const listCount = useByListes.length;
  const currentAchat = value.currentAchat || [];
  const achatCount = currentAchat.length;
  const currentCommande = value.currentCommande || [];
  const commandeCount = currentCommande.length;
  const sommeInclus = commandeCount + achatCount + listCount;

  const priceToText = () => {
    let val = "";
    val = sale_price || regular_price || price || 0;

    val =
      regular_price > sale_price && sale_price > 0 ? (
        <>
          {" "}
          <strike> {regular_price}</strike> {sale_price}{" "}
        </>
      ) : (
        val
      );

    return val;
  };

  const pluriel = (count) => {
    return count > 1 ? "s" : "";
  };

  const classesListChip = () => {
    const { classes: classesValue } = value;
    return classesValue ? (
      classesValue.map((item, index) => (
        <Chip
          key={index}
          component="li"
          size="small"
          className={classes.path}
          label={item.code}
        />
      ))
    ) : (
      <></>
    );
  };

  const categoriesListChip = () => {
    const { categories } = value;
    return categories ? (
      categories.map((item, index) => (
        <Chip
          key={index}
          component="li"
          size="small"
          className={classes.path}
          label={item.name}
        />
      ))
    ) : (
      <></>
    );
  };

  const secondaryInformation = () => {
    const { brands, tva, selections } = value;
    const tvaValue = tva && tva !== 0 ? tva : undefined;

    const brandsValue =
      brands && brands.length > 0
        ? brands.map((item) => item.name).toString() + ", "
        : "";

    const selectionsValue =
      selections && selections.length > 0
        ? selections.map((item) => item.name).toString() + ", "
        : "";

    return (
      <>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
        >
          CFA {priceToText()}
        </Typography>
        {tva && ` TVA : ${tvaValue}`}
        <Typography
          component="span"
          variant="body2"
          style={{ display: "block" }}
          color="inherit"
        >
          {value.isbn && ` ISBN : ${value.isbn} , `}
          {sommeInclus > 0 && " inclus dans "}
          {listCount > 0 && (
            <ChipState label={`${listCount} liste${pluriel(listCount)}`} />
          )}

          {achatCount > 0 && (
            <ChipState
              color="#01579b"
              label={`${achatCount} achat${pluriel(achatCount)} `}
            />
          )}
          {commandeCount > 0 && (
            <ChipState
              color="#9c27b0"
              label={`${commandeCount} commande${pluriel(commandeCount)}`}
            />
          )}

          {brandsValue}
          {selectionsValue}
          {catCount > 0 && <> catégories : {categoriesListChip()} </>}
          {classeCount > 0 && <> , classes : {classesListChip()} </>}
        </Typography>
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
          checkable ? handleToggle(value[`${idField}`]) : handleClick()
        }
      >
        {checkable && (
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
              <>
                <SuspensePaper>
                  <Images tileData={images || []} />
                </SuspensePaper>
              </>
            }
          >
            <Avatar variant="rounded" alt={value.name} src={first} />
          </LightTooltip>
        </ListItemAvatar>

        <ListItemText
          disableTypography
          primary={
            <>
              <TitleTypography
                component="span"
                variant="subtitle2"
                className={classes.inline}
                color="primary"
              >
                {value.name}
                <i className={classes.status}> {labelStatus} </i>
              </TitleTypography>
              {value.featured && (
                <FavoriteIcon fontSize="small" color="secondary" />
              )}
            </>
          }
          secondary={secondaryInformation()}
        />
        <ListItemSecondaryAction>
          <Typography>{value.stock}</Typography>
        </ListItemSecondaryAction>
      </ListItem>

      {/* <Divider variant="inset" component="div" /> */}
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      checked: prev.checked,
      checkable: prev.checkable,
      value: prev.value,
      isCurrent: prev.isCurrent,
    }) ===
    JSON.stringify({
      checked: next.checked,
      checkable: next.checkable,
      value: next.value,
      isCurrent: next.isCurrent,
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
  status: {
    color: "chocolate",
  },
  chip: {
    color: (props) => props.color || `${theme.palette.text.default}`,
    maxWidth: "fit-content",
    marginLeft: "24px",
    fontSize: "12px",
    background: `${theme.palette.background.default}`,
    height: "20px",
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

const ChipState = ({ color, label }) => {
  const classes = useStyles({ color });
  return (
    <Chip
      component={Typography}
      className={classes.chip}
      size="small"
      label={label}
    />
  );
};
