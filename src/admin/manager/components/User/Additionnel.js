import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FieldArray } from "react-final-form-arrays";
import Permissions from "../Role/Permissions/List";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { TitleTypography } from "../../../../components/Typography";
import MultiSelectorDialog from "../Action/MultiSelectorDialog";

const Form = ({
  user,
  submiting,
  pristine,
  valid,
  submitting,
  form,
  handleSubmit,
}) => {
  const classes = useStyles();
  // const getRole = (roleId) => roles.find((item) => item.id === roleId);

  const [addMoreActions, setAddMoreActions] = React.useState(false);

  const handleActionSelected = (fields) => (access, operation) => {
    if (operation === "push") {
      const val = {
        access,
        level: {
          id: 0,
          label: "lecture",
        },
      };
      fields.push(val);
    }

    if (operation === "remove") {
      const { value } = fields;
      const index = value.findIndex((v) => v.access._id === access._id);
      index !== -1 && fields.remove(index);
    }
  };

  const actions = (fields) => {
    let accesses = [];
    if (fields.value) {
      accesses = fields.value.map((item) => item.access);
    }
    return accesses;
  };

  return (
    <Paper className={classes.paper}>
      <TitleTypography className={classes.title}>
        Accès additionnels
      </TitleTypography>
      <Divider />
      <FieldArray name="additionalPermissions">
        {({ fields }) => {
          return (
            <>
              <Permissions
                fieldName="additionalPermissions"
                fields={fields}
                pristine={pristine}
                valid={valid}
                submitting={submitting}
                form={form}
                handleSubmit={handleSubmit}
                withAddOptions={true}
                handleAdd={() => setAddMoreActions(true)}
              />

              <MultiSelectorDialog
                fieldName="additionalPermissions"
                handleSelected={handleActionSelected(fields)}
                selected={actions(fields)}
                initialOpen={addMoreActions}
                setInitialOpen={(val) => setAddMoreActions(val)}
              />
            </>
          );
        }}
      </FieldArray>
    </Paper>
  );
};
const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      user: prev.user,
      pristine: prev.pristine,
      valid: prev.valid,
      form: prev.form,
    }) ===
    JSON.stringify({
      user: next.user,
      pristine: next.pristine,
      valid: next.valid,
      form: next.form,
    })
  );
};

export default React.memo(Form, isEqual);

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // "& > *": {
    //   margin: theme.spacing(1)
    // }
  },
  icon: {
    marginRight: theme.spacing(1.8),
    marginTop: theme.spacing(0.25),
  },
  paper: {
    padding: theme.spacing(2, 1, 0),
  },
  body: {
    padding: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(0.5),
  },
  field: {
    // marginTop: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
}));
