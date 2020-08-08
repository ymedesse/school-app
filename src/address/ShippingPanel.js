import React from "react";
import { TitleTypography, SubTitleTypography } from "../components/assets";
import { makeStyles } from "@material-ui/core/styles";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Radio from "../components/Radio";

import FormControlLabel from "@material-ui/core/FormControlLabel";

const Panel = ({
  panelId,
  expanded,
  handleChange,
  panelSummaryName,
  panelSummaryDetail,
  panelSummaryRight,
  panelContent
}) => {
  const classes = useStyles();

  return (
    <ExpansionPanel
      expanded={expanded === panelId}
      onChange={handleChange(panelId)}
    >
      <ExpansionPanelSummary
        classes={{
          content: classes.panelContent,
          expanded: classes.panelExpanded
        }}
        id={panelId}
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={0}
          wrap="nowrap"
        >
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              value={panelId}
              control={<Radio />}
              label={
                <TitleTypography className={classes.heading}>
                  {panelSummaryName}
                </TitleTypography>
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SubTitleTypography>{panelSummaryDetail}</SubTitleTypography>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
            <Typography
              color="primary"
              style={{ fontWeight: "600" }}
              variant="subtitle2"
            >
              {panelSummaryRight}
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.content}>
        {panelContent}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
export default Panel;

/* <AdressForm address={shipping.address} handleSubmit={() => {}} /> */

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  panelContent: {
    margin: "0px"
  },
  panelExpanded: {
    margin: "0px !important",
    minHeight: `${theme.spacing(5)}px !important`
  }
}));
