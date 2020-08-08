import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import LinearProgress from "@material-ui/core/LinearProgress";

// import ErrorBoundarySuspense from "../ErrorBoundarySuspense";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  button: {
    textTransform: "unset",
    fontSize: "16px",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      key={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box pt={1} pb={1}>
          <Typography></Typography>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const SimpleTabs = ({
  components = [],
  initial = 0,
  tabsProps = {},
  tabProps = {},
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(initial);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    setValue(initial);
  }, [initial]);

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        // centered
        variant="fullWidth"
        aria-label="tabs"
        {...tabsProps}
      >
        {components.map((item, index) => {
          const { handleClick, title } = item;
          return (
            <Tab
              key={index}
              onClick={handleClick && handleClick}
              className={classes.button}
              disableRipple
              label={title}
              {...tabProps}
            />
          );
        })}
      </Tabs>

      <Divider />
      <div>
        {components.map((item, index) => (
          <TabPanel value={value} key={index} index={index}>
            {item.content}
          </TabPanel>
        ))}
      </div>
    </>
  );
};

export default React.memo(SimpleTabs);
