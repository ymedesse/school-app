import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Box from "@material-ui/core/Box";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ButtonWithIcon } from "../../components/assets";

import StepButton from "@material-ui/core/StepButton";

export default function CustomizedSteppers({
  steps,
  activeStep,
  setActiveStep,
  stepContent,
  validateStep,
  validateButton = <div></div>,
  validateForm,
  showStepperButton = true,
  hideNext = false
}) {
  const classes = useStyles();

  const handleNext = () => {
    validateStep === undefined && setActiveStep(activeStep + 1);

    validateStep !== undefined && validateStep && setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleStep = step => event => {
    if (step > activeStep) {
      validateForm === undefined && setActiveStep(step);
      validateForm !== undefined &&
        validateForm(event).then(valid => valid && setActiveStep(step));
    } else {
      setActiveStep(step);
    }
  };

  return (
    <div className={classes.root}>
      {!showStepperButton && (
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Box display="flex" p={0} style={{ width: "100%" }}>
                <Box p={0}>
                  {activeStep > 0 && (
                    <ButtonWithIcon
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                      startIcon={<NavigateBeforeIcon />}
                      variant="text"
                    >
                      Retour
                    </ButtonWithIcon>
                  )}
                </Box>
                <Box p={0} flexGrow={1}></Box>
                <Box p={0}>
                  {!hideNext &&
                    (activeStep < steps.length - 1 ? (
                      <ButtonWithIcon
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                        variant="text"
                      >
                        Suivant
                      </ButtonWithIcon>
                    ) : (
                      validateButton
                    ))}
                </Box>
              </Box>
            </div>
          )}
        </div>
      )}
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label} disabled={false}>
            <StepButton
              onClick={handleStep(index)}
              children={
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              }
            />
          </Step>
        ))}
      </Stepper>

      <div className={classes.instructions}>{stepContent}</div>
    </div>
  );
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },

  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    margin: "0px"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));
