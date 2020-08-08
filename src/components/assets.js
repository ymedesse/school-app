import React from "react";
import MuiTypography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MailIcon from "@material-ui/icons/Mail";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import ClearAllIcon from "@material-ui/icons/ClearAll";

import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { TextField } from "mui-rff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import ClearIcon from "@material-ui/icons/Clear";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MuiButton from "@material-ui/core/Button";
import ReplayIcon from "@material-ui/icons/Replay";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

const NextIconButton = ({ size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ padding: size === "small" ? "4px" : "8px" }}
    {...props}
  >
    <ArrowForwardIosIcon
      style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }}
    />
  </IconButton>
);

const PreviousIconButton = ({ style = {}, size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ ...style, padding: size === "small" ? "4px" : "8px" }}
    {...props}
  >
    <ArrowBackIosIcon
      style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }}
    />
  </IconButton>
);

const NextFabButton = ({ size = "medium", ...restProps }) => (
  <Fab size={size}>
    <ArrowForwardIosIcon
      style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }}
    />
  </Fab>
);

const PreviousFabButton = ({ size = "small", ...restProps }) => (
  <Fab size={size} {...restProps}>
    <ArrowBackIosIcon
      style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }}
    />
  </Fab>
);

const MoreHorizIconButton = ({ size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ padding: size === "small" ? "4px" : "8px" }}
    {...props}
  >
    <MoreHorizIcon style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }} />
  </IconButton>
);

const EditIconButton = ({ size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ padding: size === "small" ? "4px" : "8px" }}
    {...props}
  >
    <EditIcon style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }} />
  </IconButton>
);

const MailIconButton = ({ size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ padding: size === "small" ? "4px" : "8px" }}
    {...props}
  >
    <MailIcon style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }} />
  </IconButton>
);

const AddIconButton = ({ size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ padding: size === "small" ? "4px" : "8px" }}
    component="span"
    {...props}
  >
    <AddIcon style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }} />
  </IconButton>
);

const SaveIconButton = ({ size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ padding: size === "small" ? "4px" : "8px" }}
    {...props}
  >
    <SaveIcon style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }} />
  </IconButton>
);

const ClearAllIconButton = ({ size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ padding: size === "small" ? "4px" : "8px" }}
    component="span"
    {...props}
  >
    <ClearAllIcon style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }} />
  </IconButton>
);

const InsertPhotoIconButton = ({ size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ padding: size === "small" ? "4px" : "8px" }}
    component="span"
    {...props}
  >
    <InsertPhotoIcon
      style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }}
    />
  </IconButton>
);

const PhotoCameraIconButton = ({ size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ padding: size === "small" ? "4px" : "8px" }}
    component="span"
    {...props}
  >
    <PhotoCamera style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }} />
  </IconButton>
);

const ClearIconButton = ({ size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ padding: size === "small" ? "4px" : "8px" }}
    color="secondary"
    {...props}
  >
    <ClearIcon style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }} />
  </IconButton>
);

const DeleteIconButton = ({ size = "small", ...props }) => (
  <IconButton
    size={size}
    style={{ padding: size === "small" ? "4px" : "8px" }}
    {...props}
    color="secondary"
  >
    <DeleteIcon style={{ fontSize: size === "small" ? "1rem" : "1.3rem" }} />
  </IconButton>
);

const AddFabButton = ({ size = "medium", ...restProps }) => (
  <Fab color="primary" size={size} {...restProps} aria-label="add">
    <AddIcon />
  </Fab>
);

const EditFabButton = ({ size = "medium", ...restProps }) => (
  <Fab color="secondary" size={size} {...restProps} aria-label="edit">
    <EditIcon />
  </Fab>
);

const DeleteFabButton = ({ size = "medium", ...restProps }) => (
  <Fab color="primary" size={size} {...restProps} aria-label="delete">
    <ClearIcon />
  </Fab>
);

const BootomMoreDetail = ({ title, handleClick, resProps }) => (
  <Header
    title={title}
    headerHeight="30px"
    style={{ background: "#fff" }}
    rightComponent={<NextIconButton onClick={handleClick} />}
  />
);

const TitleTypography = withStyles({
  root: {
    fontWeight: "500",
  },
})((props) => <MuiTypography variant="subtitle1" {...props} />);

const TableHeaderTypography = withStyles({
  root: {
    fontWeight: "500",
  },
})((props) => <MuiTypography variant="subtitle2" {...props} />);

const LargeTypography = withStyles({
  root: {
    //fontWeight: "500"
  },
})((props) => <MuiTypography variant="h5" {...props} />);

const SubLargeTypography = withStyles({
  root: {
    // fontWeight: "500"
  },
})((props) => <MuiTypography variant="subtitle1" {...props} />);

const SubTitleTypography = withStyles({
  root: {
    fontWeight: "300",
  },
})((props) => <MuiTypography variant="body2" {...props} />);

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "0 12px",
    height: (props) => props.headerHeight,
    background: `${theme.palette.grey["50"]}`,
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "unset",
    color: theme.palette.grey["A400"],
    lineHeight: "1",
  },
}));

const Header = ({
  title,
  rightComponent = "qt",
  handleNext = () => {},
  headerHeight = "50px",
  ...resProps
}) => {
  const classes = useStyles({ headerHeight });
  return (
    <>
      <Grid
        container
        justify="space-around"
        alignItems="flex-end"
        className={classes.header}
        {...resProps}
      >
        <Grid item xs={11}>
          {title}
        </Grid>

        <Grid item xs={1} style={{ textAlign: "right" }}>
          <Typography variant="subtitle2">{rightComponent}</Typography>
        </Grid>
      </Grid>
      <Divider light={true} />
    </>
  );
};

const ButtonWithIcon = withStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    textTransform: "unset",
    //  color: theme.palette.grey["A400"],
    lineHeight: "1",
  },
}))(({ icon = <ReplayIcon />, ...props }) => (
  <MuiButton
    size="small"
    startIcon={icon}
    variant="outlined"
    color="inherit"
    {...props}
  />
));

const ButtonSimple = withStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    textTransform: "unset",
    //  color: theme.palette.grey["A400"],
    lineHeight: "1",
  },
}))(({ ...props }) => (
  <MuiButton size="small" variant="outlined" color="inherit" {...props} />
));

const ButtonSave = ({ className, submitting, ...props }) => {
  return (
    <ButtonWithIcon
      variant="contained"
      color="primary"
      type="submit"
      icon={<SaveIcon />}
      {...props}
    >
      Enregistrer
    </ButtonWithIcon>
  );
};

export {
  TitleTypography,
  NextIconButton,
  PreviousIconButton,
  MoreHorizIconButton,
  MailIconButton,
  BootomMoreDetail,
  DeleteIconButton,
  Header,
  EditIconButton,
  SubTitleTypography,
  LargeTypography,
  SubLargeTypography,
  AddIconButton,
  InsertPhotoIconButton,
  PhotoCameraIconButton,
  TableHeaderTypography,
  ButtonWithIcon,
  NextFabButton,
  PreviousFabButton,
  ClearIconButton,
  AddFabButton,
  EditFabButton,
  DeleteFabButton,
  ButtonSave,
  ClearAllIconButton,
  SaveIconButton,
  ButtonSimple,
};
