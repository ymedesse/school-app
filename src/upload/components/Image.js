import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DeleteIconButton } from "../../components/Buttons";
import Checkbox from "@material-ui/core/Checkbox";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { API } from "../../config";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import StyledRadioMui from "../../components/StyledRadioMUI";

const Image = ({
  handleClick,
  handleChecked,
  value,
  handleDelete,
  isCurrent,
  isCurrentChecked = false,
  width = "150px",
  mobileWidth = "80px",
  subMenu = true,
  isUnique = false, // si l'image est l'unique dans la vue principale
  featuredImageField,
  hideFeaturedCheckLabel = false,
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const imageUrl = (value.id || "").startsWith("http")
    ? value.id
    : `${API}/photo/${value.id}`;

  const [checked, setChecked] = React.useState(isCurrentChecked);
  React.useEffect(() => {
    if (!isUnique) {
      const { isChecked } = value;
      setChecked(isChecked === undefined ? false : isChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const alignCenterFeaturedCheckLabel =
    !mobile && hideFeaturedCheckLabel ? true : mobile ? true : false;
  const classes = useStyles({
    width: mobile ? mobileWidth : width,
    isCurrent,
    mobile,
    isCurrentChecked,
    isUnique,
    alignCenterFeaturedCheckLabel,
  });

  const handleChange = (event) => {
    setChecked(event.target.checked);
    handleChecked(value.id)(event.target.checked);
  };
  return (
    <div
      className={classes.container}
      onClick={() => handleClick && handleClick(value.id)}
    >
      <img alt={value.label} src={`${imageUrl}`} className={classes.image} />
      {!hideFeaturedCheckLabel && subMenu && !isUnique && (
        <div className={classes.subAction}>
          {featuredImageField ? (
            <StyledRadioMui
              checklabel="Mise en avant"
              label=""
              fontSize="default"
              name={featuredImageField}
              value={value.label}
              className={classes.checkBox}
              hideFeaturedCheckLabel={hideFeaturedCheckLabel}
            />
          ) : (
            <Checkbox
              className={classes.checkbox}
              color="primary"
              checked={checked}
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              onChange={handleChange}
              indeterminate
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          )}
        </div>
      )}
      {handleDelete && (
        <DeleteIconButton
          onClick={() => handleDelete(value.id)}
          size="medium"
          color="secondary"
          className={classes.delete}
        />
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: (props) =>
      props.isCurrent ? `${props.width}+20` : `${props.width}`,
    height: (props) =>
      props.isCurrent ? `${props.width}+20` : `${props.width}`,
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: (props) => (props.mobile ? "5px" : "8px"),
    position: "relative",
    boxShadow: (props) =>
      props.isCurrent ? `${theme.shadows[15]}` : `${theme.shadows[3]}`,
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: (props) =>
        props.isCurrent && props.isUnique === false
          ? `${theme.shadows[15]}`
          : `${theme.shadows[7]}`,
    },
  },
  subAction: {
    height: "30px",
    width: "100%",
    bottom: "0px",
    backgroundColor: "rgba(127, 127, 127, 0.2)",
    position: "absolute",
    textAlign: (props) =>
      props.alignCenterFeaturedCheckLabel ? "center" : "left",
  },
  link: {
    margin: "4px",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    maxWidth: "100%",
    maxHeight: "100%",
  },

  checkbox: {
    position: "absolute",
    left: "0px",
    padding: "4px",
  },

  delete: {
    position: "absolute",
    top: "0px",
    right: "0px",
  },
}));

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      value: prev.value,
      isCurrent: prev.isCurrent,
      isCurrentChecked: prev.isCurrentChecked,
      handleClick: prev.handleClick,
      handleChecked: prev.handleChecked,
      handleDelet: prev.handleDelet,
      featuredImageField: prev.featuredImageField,
    }) ===
    JSON.stringify({
      value: next.value,
      isCurrent: next.isCurrent,
      isCurrentChecked: next.isCurrentChecked,
      handleClick: next.handleClick,
      handleChecked: next.handleChecked,
      handleDelet: next.handleDelet,
      featuredImageField: next.featuredImageField,
    })
  );
};

//  export default Image;
export default React.memo(Image, isEqual);
