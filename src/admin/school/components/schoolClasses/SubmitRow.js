import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SubmittingButton from "../../../../components/SubmittingButton";
import { FormSpy } from "react-final-form";
import Button from "@material-ui/core/Button";

const SubmitRow = ({ form }) => {
  const classes = useStyles();
  return (
    <FormSpy subscription={{ values: true, submitting: true, pristine: true }}>
      {({ values, submitting, pristine }) => {
        return (
          <div className={classes.appBar}>
            <Box display="flex" p={0} style={{ width: "100%" }}>
              <Box flexGrow={1}></Box>
              <Box>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => form.reset()}
                  disabled={submitting || pristine}
                  className={classes.button}
                >
                  Initialise
                </Button>
              </Box>
              <Box p={0}>
                <SubmittingButton
                  variant={"contained"}
                  color="primary"
                  type="submit"
                  // disabled={submitting}
                  loading={submitting}
                  success={false}
                  label="Valider"
                />
              </Box>
            </Box>
          </div>
        );
      }}
    </FormSpy>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    margin: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  appBar: {
    top: "auto",
    bottom: 0,
    position: "sticky",
    marginTop: theme.spacing(5),
    width: "100%",
    backgroundColor: "#fff",
  },
}));

export default SubmitRow;
