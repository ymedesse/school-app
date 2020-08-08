/* eslint-disable no-use-before-define */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon color="primary" fontSize="small" />;

export default function Grouped() {
  const classes = useStyles();

  const [values, setValues] = React.useState([...initValue]);


  const optionRender = (option, { selected }) => (
    <>
      <Grid direction="column" spacing={0} container>
        <FormControlLabel
          className={classes.label}
          control={
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={selected}
            />
          }
          label={<Typography>{option.name}</Typography>}
        />

        <Chip
          component={Typography}
          className={classes.path}
          size="small"
          label={option.path}
        />
      </Grid>
    </>
  );

  return (
    <>
      <Autocomplete
        multiple
        value={values}
        disableCloseOnSelect
        options={top100Films}
        noOptionsText="aucun resultat"
        getOptionLabel={option => option.name}
        style={{ width: 300 }}
        renderOption={optionRender}
        onChange={(event, values) => setValues(values)}
        renderInput={params => (
          <TextField
            {...params}
            label="With categories"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <div style={{ background: "#b5f" }}>
        {optionRender({ name: "k,lkk,", path: "moi/moijh" }, {})}
      </div>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  label: {
    //  marginTop:"8px",
    //  marginLeft:"4px",
    height: "32px"
  },
  path: {
    maxWidth: "fit-content",
    marginLeft: "24px",
    fontSize: "12px",
    background: `${theme.palette.background.default}`,
    color: `${theme.palette.text.default}`,
    height: "20px"
  }
}));

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  {
    _id: "5da430c16db3d719f0b6ca3f",
    name: "papeterie",
    description: "papeterie",
    slug: "papeterie",
    fullPath: "papeterie",
    path: "/",
    parent: {},

    createdAt: "2019-10-14T08:24:33.370Z",
    updatedAt: "2019-10-14T08:24:33.370Z"
  },
  {
    _id: "5da431076db3d719f0b6ca40",
    name: "journaux",
    description: "journaux",
    parent: {
      _id: "5da430c16db3d719f0b6ca3f",
      name: "papeterie",
      description: "papeterie",
      slug: "papeterie",
      fullPath: "papeterie",
      path: "/",
      createdAt: "2019-10-14T08:24:33.370Z",
      updatedAt: "2019-10-14T08:24:33.370Z"
    },
    slug: "journaux",
    path: "papeterie",
    fullPath: "papeterie/journaux",
    createdAt: "2019-10-14T08:25:43.600Z",
    updatedAt: "2019-10-14T08:25:43.600Z"
  },
  {
    _id: "5da431196db3d719f0b6ca41",
    name: "cahier",
    description: "cahier",
    parent: {
      _id: "5da430c16db3d719f0b6ca3f",
      name: "papeterie",
      description: "papeterie",
      slug: "papeterie",
      fullPath: "papeterie",
      path: "/",
      createdAt: "2019-10-14T08:24:33.370Z",
      updatedAt: "2019-10-14T08:24:33.370Z"
    },
    slug: "cahier",
    path: "papeterie",
    fullPath: "papeterie/cahier",
    createdAt: "2019-10-14T08:26:01.008Z",
    updatedAt: "2019-10-14T08:26:01.008Z"
  },
  {
    _id: "5da4312a6db3d719f0b6ca42",
    name: "notes",
    description: "notes",
    parent: {
      _id: "5da431196db3d719f0b6ca41",
      name: "cahier",
      description: "cahier",
      parent: "5da430c16db3d719f0b6ca3f",
      slug: "cahier",
      path: "papeterie",
      fullPath: "papeterie/cahier",
      createdAt: "2019-10-14T08:26:01.008Z",
      updatedAt: "2019-10-14T08:26:01.008Z"
    },
    slug: "notes",
    path: "papeterie/cahier",
    fullPath: "papeterie/cahier/notes",
    createdAt: "2019-10-14T08:26:18.302Z",
    updatedAt: "2019-10-14T08:26:18.302Z"
  },
  {
    _id: "5da431446db3d719f0b6ca43",
    name: "scolaire",
    description: "scolaire",
    parent: {
      _id: "5da430c16db3d719f0b6ca3f",
      name: "papeterie",
      description: "papeterie",
      slug: "papeterie",
      fullPath: "papeterie",
      path: "/",
      createdAt: "2019-10-14T08:24:33.370Z",
      updatedAt: "2019-10-14T08:24:33.370Z",
      __v: 0
    },
    slug: "scolaire",
    path: "papeterie",
    fullPath: "papeterie/scolaire",
    createdAt: "2019-10-14T08:26:44.609Z",
    updatedAt: "2019-10-14T08:26:44.609Z",
    __v: 0
  },

  {
    _id: "5da770c262cfa2090c034db9",
    name: "Sacs",
    description: "sac",
    parent: {
      _id: "5da431836db3d719f0b6ca46",
      name: "professionnel",
      description: "professionnel",
      parent: "5da431646db3d719f0b6ca45",
      slug: "professionnel",
      path: "papeterie/scolaire/dessin",
      fullPath: "papeterie/scolaire/dessin/professionnel",
      createdAt: "2019-10-14T08:27:47.855Z",
      updatedAt: "2019-10-14T08:27:47.855Z",
      __v: 0
    },
    slug: "sacs",
    path: "papeterie/scolaire/dessin/professionnel",
    fullPath: "papeterie/scolaire/dessin/professionnel/sacs",
    createdAt: "2019-10-16T19:34:26.447Z",
    updatedAt: "2019-10-16T19:34:26.447Z",
    __v: 0
  },
  {
    _id: "5da80694e65d1724701c218b",
    name: "Jeunesse et loisir",
    description: "Les livres de la jeunesse",
    parent: {
      _id: "5da431646db3d719f0b6ca45",
      name: "dessin",
      description: "dessin",
      parent: "5da431446db3d719f0b6ca43",
      slug: "dessin",
      path: "papeterie/scolaire",
      fullPath: "papeterie/scolaire/dessin",
      createdAt: "2019-10-14T08:27:16.286Z",
      updatedAt: "2019-10-14T08:27:16.286Z",
      __v: 0
    },
    slug: "jeunesse-et-loisirr",
    path: "papeterie/scolaire/dessin",
    fullPath: "papeterie/scolaire/dessin/jeunesse-et-loisirr",
    createdAt: "2019-10-17T06:13:40.578Z",
    updatedAt: "2019-10-17T06:13:40.578Z",
    __v: 0
  },
  {
    _id: "5dd1ea9b38289e1020c006a5",
    name: "Papeterie",
    description: "Article de la papeterie",
    parent: {
      _id: "5da431446db3d719f0b6ca43",
      name: "scolaire",
      description: "scolaire",
      parent: "5da430c16db3d719f0b6ca3f",
      slug: "scolaire",
      path: "papeterie",
      fullPath: "papeterie/scolaire",
      createdAt: "2019-10-14T08:26:44.609Z",
      updatedAt: "2019-10-14T08:26:44.609Z",
      __v: 0
    },
    slug: "papeterie",
    path: "papeterie/scolaire",
    fullPath: "papeterie/scolaire/papeterie",
    createdAt: "2019-11-18T00:49:31.928Z",
    updatedAt: "2019-11-18T00:49:31.928Z",
    __v: 0
  },
  {
    _id: "5dd2a4a1ef43c537c82eeee9",
    name: "MEDESSE Yvon",
    description: "qsq",
    parent: {
      _id: "5da431196db3d719f0b6ca41",
      name: "cahier",
      description: "cahier",
      parent: "5da430c16db3d719f0b6ca3f",
      slug: "cahier",
      path: "papeterie",
      fullPath: "papeterie/cahier",
      createdAt: "2019-10-14T08:26:01.008Z",
      updatedAt: "2019-10-14T08:26:01.008Z",
      __v: 0
    },
    slug: "medesse-yvon",
    path: "papeterie/cahier",
    fullPath: "papeterie/cahier/medesse-yvon",
    createdAt: "2019-11-18T14:03:13.736Z",
    updatedAt: "2019-11-18T14:03:13.736Z",
    __v: 0
  },
  {
    _id: "5dd2a55def43c537c82eeeeb",
    name: "MEDESSE Yvonz",
    description: "zez",
    parent: {
      _id: "5da431076db3d719f0b6ca40",
      name: "journaux",
      description: "journaux",
      parent: "5da430c16db3d719f0b6ca3f",
      slug: "journaux",
      path: "papeterie",
      fullPath: "papeterie/journaux",
      createdAt: "2019-10-14T08:25:43.600Z",
      updatedAt: "2019-10-14T08:25:43.600Z",
      __v: 0
    },
    slug: "medesse-yvonz",
    path: "papeterie/journaux",
    fullPath: "papeterie/journaux/medesse-yvonz",
    createdAt: "2019-11-18T14:06:21.579Z",
    updatedAt: "2019-11-18T14:06:21.579Z",
    __v: 0
  },
  {
    _id: "5dd2a60cef43c537c82eeeec",
    name: "MEDESSE Yvonqsqs",
    description: "qsq",
    parent: {
      _id: "5da431196db3d719f0b6ca41",
      name: "cahier",
      description: "cahier",
      parent: "5da430c16db3d719f0b6ca3f",
      slug: "cahier",
      path: "papeterie",
      fullPath: "papeterie/cahier",
      createdAt: "2019-10-14T08:26:01.008Z",
      updatedAt: "2019-10-14T08:26:01.008Z",
      __v: 0
    },
    slug: "medesse-yvonqsqs",
    path: "papeterie/cahier",
    fullPath: "papeterie/cahier/medesse-yvonqsqs",
    createdAt: "2019-11-18T14:09:16.594Z",
    updatedAt: "2019-11-18T14:09:16.594Z",
    __v: 0
  }
];

const initValue = [
  {
    _id: "5da430c16db3d719f0b6ca3f",
    name: "papeterie",
    description: "papeterie",
    slug: "papeterie",
    fullPath: "papeterie",
    path: "/",
    parent: {},

    createdAt: "2019-10-14T08:24:33.370Z",
    updatedAt: "2019-10-14T08:24:33.370Z"
  },
  {
    _id: "5da431076db3d719f0b6ca40",
    name: "journaux",
    description: "journaux",
    parent: {
      _id: "5da430c16db3d719f0b6ca3f",
      name: "papeterie",
      description: "papeterie",
      slug: "papeterie",
      fullPath: "papeterie",
      path: "/",
      createdAt: "2019-10-14T08:24:33.370Z",
      updatedAt: "2019-10-14T08:24:33.370Z"
    },
    slug: "journaux",
    path: "papeterie",
    fullPath: "papeterie/journaux",
    createdAt: "2019-10-14T08:25:43.600Z",
    updatedAt: "2019-10-14T08:25:43.600Z"
  }
];
