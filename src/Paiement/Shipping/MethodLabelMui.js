import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { FormSpy } from "react-final-form";
import CheckBoxLine from "../../components/CheckBoxLineMui";
import { ValueText } from "../../components/LabelValueTypography";
import compareProps from "../../utils/compareProps";

const MethodLabelMui = ({ name, label, amountLabel }) => {
  const classes = useStyles();
  return (
    <FormSpy subscription={{ values: true }}>
      {({ values }) => {
        const checked = values[`${name}`];
        return (
          <Paper variant="outlined" square className={classes.root}>
            <Box display="flex" width="100%">
              <Box flexGrow={1}>
                <CheckBoxLine
                  disabled={checked}
                  name={name}
                  label={label}
                  variant="outlined"
                />
              </Box>
              <Box textAlign="right" alignSelf="center" width="30%">
                <ValueText>{amountLabel}</ValueText>
              </Box>
            </Box>
          </Paper>
        );
      }}
    </FormSpy>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
  },
}));

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["name", "label", "amountLabel"]);
};

export default React.memo(MethodLabelMui, isEqual);
