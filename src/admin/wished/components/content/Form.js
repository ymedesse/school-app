import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Info";
import purple from "@material-ui/core/colors/purple";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AttachmentIcon from "@material-ui/icons/Attachment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import { API } from "../../../../config";
import useDataDisplayer from "../../../../components/hook/useDataFieldsDisplayer";
import { TitleTypography } from "../../../../components/Typography";
import { MiniValueText } from "../../../../components/LabelValueTypography";
import SuspensePaper from "../../../../components/SuspensePaper";
import { infoConfig, wishedConfig } from "./fieldsConfig.js";
import ImageViewer from "../../../../components/ImageViewer";

const Form = ({ values, ...props }) => {
  const classes = useStyles();
  const { displayFields } = useDataDisplayer(values);

  const { wished, ...list } = values || {};

  const showFields = (config, source, title) => {
    return displayFields(
      config,
      {
        rootGridProps: { spacing: 1 },
        itemGridProps: {},
        title,
      },
      source
    );
  };

  const showInfoTitle = (title, icon) => (
    <Box alignItems="center" display="flex" width="100%">
      <Box mt={1} mr={1}>
        {icon}
      </Box>
      <Box flexGrow={1}>
        <TitleTypography className={classes.inline}>{title}</TitleTypography>
      </Box>
    </Box>
  );

  const showInfo = () => {
    const {
      phone,
      user: { nomAfficher },
    } = wished;

    const source = {
      phone,
      nomAfficher,
    };

    return (
      <SuspensePaper>
        {showInfoTitle("Information du compte", <InfoIcon />)}
        {showFields(infoConfig, source)}
      </SuspensePaper>
    );
  };

  const showListe = () => {
    const {
      status,
      files,
      school,
      address,
      mail,
      classe,
      phone,
      updatedAt,
    } = list;

    const source = {
      status,
      files,
      school,
      address,
      mail,
      classe: classe.code,
      phone,
      updatedAt,
    };

    return (
      <SuspensePaper>
        {showInfoTitle("Fourniture", <LocalShippingIcon />)}
        {showFields(wishedConfig, source)}
      </SuspensePaper>
    );
  };
  const showFiles = () => {
    const { files = [] } = list;
    const count = files.length;
    const images = files.map((item) => ({
      src: API + "/photo/" + item,
      alt: item,
      downloadUrl: API + "/photo/" + item,
    }));

    return (
      <SuspensePaper>
        {showInfoTitle("Fichier joints", <AttachmentIcon />)}
        <MiniValueText>{`${count} fichier(s)`} </MiniValueText>
        {count > 0 && <ImageViewer images={images} />}
      </SuspensePaper>
    );
  };

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      alignItems="flex-start"
      className={classes.root}
    >
      <CssBaseline />

      <div className={classes.margin} />
      <Grid container item sm={6} xs={12}>
        {showInfo()}
      </Grid>
      <Grid container item sm={6} xs={12}>
        {showListe()}
      </Grid>
      <Grid container item sm={6} xs={12}>
        {showFiles()}
      </Grid>
    </Grid>
  );
};

export default React.memo(Form);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
  },
  inline: {
    display: "inline",
  },
  status: {
    color: "chocolate",
  },
  total: {
    color: purple[500],
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
}));
