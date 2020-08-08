import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  button: {
    textTransform: "unset"
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        // centered
        variant="fullWidth"
        aria-label="scrollable auto tabs example"
      >
        <Tab
          onClick={() => {}}
          className={classes.button}
          disableRipple
          label="Votre Panier"
        />
        <Tab
          disableRipple
          className={classes.button}
          label="Votre liste à commander"
        />
      </Tabs>

      <Divider />
      <TabPanel value={value} index={0}>
        Mon panier
      </TabPanel>
      <TabPanel value={value} index={1}>
        Liste à commander
      </TabPanel>
    </>
  );
}
