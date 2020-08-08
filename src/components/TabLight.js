import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Suspenser from "./Suspenser";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { ClearIconButton } from "./assets";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FeedBack from "./CircularProgressFeedBack";
import clsx from "clsx";
import { ReactReduxContext } from "react-redux";

function TabPanel(props) {
  const { children, value, index, isAddButton, ...other } = props;

  return (
    !isAddButton && (
      <div
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    )
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
    // backgroundColor: theme.palette.background.paper
  }
}));

export default function TabLigth({
  contents,
  tabsProps,
  AppBarProps,
  addButton,
  rootTabClassName,
  footer
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const itemKey = (item, index) =>
    item.key ? item.key : item.label ? item.label : index;

  const isAddButton =
    contents.length && addButton && value === contents.length ? true : false;
  isAddButton && setValue(value - 1);

  return (
    <div className={clsx(classes.root, rootTabClassName)}>
      <AppBar position="sticky" color="inherit" elevation={0} {...AppBarProps}>
        <AntTabs
          value={value}
          onChange={handleChange}
          scrollButtons="auto"
          indicatorColor="primary"
          centered
          variant="fullWidth"
          textColor="primary"
          aria-label="scrollable force tabs example"
          {...tabsProps}
        >
          {contents.map((item, index) => (
            <AntTab
              key={itemKey(item, index)}
              label={
                item.handleDelete && contents.length > 1 ? (
                  <div style={{ display: "inline" }}>
                    {item.label}
                    <ClearIconButton
                      color="default"
                      onClick={item.handleDelete}
                    />
                  </div>
                ) : (
                  item.label
                )
              }
              icon={item.icon}
              {...item.props}
              {...a11yProps(index)}
            />
          ))}
          {addButton && <AntTab key="addButton" label={addButton} />}
        </AntTabs>
      </AppBar>

      {contents.map((item, index) => (
        <TabPanel
          isAddButton={isAddButton}
          key={itemKey(item, index)}
          value={value}
          index={index}
        >
          <Suspenser fallback={<FeedBack />} height={100}>
            {item.content}
          </Suspenser>
        </TabPanel>
      ))}

      {footer && footer}
    </div>
  );
}

const AntTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    //fontWeight: theme.typography.fontWeightRegular,
    // marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
    // '&:hover': {
    //   color: '#40a9ff',
    //   opacity: 1,
    // },
    // '&$selected': {
    //   color: '#1890ff',
    //   fontWeight: theme.typography.fontWeightMedium,
    // },
    // '&:focus': {
    //   color: '#40a9ff',
    // },
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8"
  },
  indicator: {
    // backgroundColor: '#1890ff',
  }
})(Tabs);
