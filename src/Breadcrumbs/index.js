import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import GrainIcon from "@material-ui/icons/Grain";
import compareProps from "../utils/compareProps";
import { getBreadcrumbsRoute } from "./config";

const IconBreadcrumbs = ({ routes = [], breads: initBread }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const history = useHistory();

  const [breads, setBreads] = React.useState(
    initBread || getBreadcrumbsRoute(routes)
  );

  React.useEffect(() => {
    if (!initBread) {
      const brea = getBreadcrumbsRoute(routes) || [];
      setBreads(brea);
    }
  }, [routes, initBread]);

  const handleClick = (item) => {
    item.handleClick && item.handleClick();
    item.href && history.push(item.href);
  };

  const last = breads[breads.length - 1];
  const linked = breads.filter((item) => item.name !== last.name);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {linked.map((item, index) => (
        <Link
          key={index}
          component="button"
          color="inherit"
          variant="body2"
          onClick={() => handleClick(item)}
          className={classes.link}
        >
          {!isMobile && item.icon && item.icon({ className: classes.icon })}
          {item.name}
        </Link>
      ))}

      <Typography color="textPrimary" className={classes.link}>
        {last.icon && last.icon({ className: classes.icon })}
        {last.name}
      </Typography>
    </Breadcrumbs>
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["routes"]);
};
export default React.memo(IconBreadcrumbs, isEqual);

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const demoRoutes = [
  {
    name: "Material-UI",
    icon: (props) => <HomeIcon {...props} />,
    href: "/",
    handleClick: () => {},
  },
  {
    name: "Core",
    icon: (props) => <WhatshotIcon {...props} />,
    href: "/getting-started/installation/",
    handleClick: () => {},
  },
  {
    name: "Breadcrumb",
    icon: (props) => <GrainIcon {...props} />,
  },
];
