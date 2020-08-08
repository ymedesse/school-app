import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { Debug } from "mui-rff";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormValidator, {
  defaultSuscriptioin,
} from "../../../../components/FormValidator";
import Suspenser from "../../../../components/Suspenser";
import useSWR from "swr";
import Skeleton from "@material-ui/lab/Skeleton";
import FedBackdrop from "../../../../components/FedBackdrop";
import Paper from "@material-ui/core/Paper";
import ActionSelector from "../Action/MultiSelectorList";
import Form from "./Form";

import { FieldArray } from "react-final-form-arrays";

// const Form = React.lazy(() => import("./Form"));

const Body = ({
  isNew,
  intial,
  submit,
  fetcher,
  setCurrentViewerTitleAndAction,
  previous,
  url = "",
}) => {
  const classes = useStyles();
  const [validateHandler, setValidateHandler] = useState({
    success: false,
    submiting: false,
    refreshing: false,
    item: { ...intial },
  });

  React.useEffect(() => {
    setCurrentViewerTitleAndAction(item.name, <></>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { success, submiting, refreshing, item } = validateHandler;

  // eslint-disable-next-line no-unused-vars
  const { data, isValidating, error } = useSWR(
    url !== "" ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      suspense: true,
      onSuccess: (data) => {
        setValidateHandler({
          ...validateHandler,
          item: data.role,
          refreshing: false,
          refreshed: true,
        });
      },
    }
  );

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

  const onSubmit = async (values, form) => {
    setValidateHandler({ ...validateHandler, submiting: true, success: false });
    submit &&
      submit(values, (data) => {
        setValidateHandler({
          ...validateHandler,
          submiting: false,
          success: true,
        });
        previous && previous();
      });
  };

  const contents = ({
    form: {
      mutators: { push, pop },
    },
    form,
    submitting,
    pristine,
    handleSubmit,
    valid,
    dirty,
    modified,
    ...restProps
  }) => {
    return (
      <>
        <div
          style={{
            maxHeight: "80vh",
          }}
        >
          <CssBaseline />
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item sm={6} xs={12}>
              <Paper className={classes.paper}>
                <Suspenser height={100}>
                  <Form
                    classes={classes}
                    success={success}
                    submiting={submiting}
                    pristine={pristine}
                    valid={valid}
                    submitting={submitting}
                    form={form}
                    handleSubmit={handleSubmit}
                  />
                </Suspenser>
              </Paper>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FieldArray name="permissions">
                {({ fields }) => (
                  <ActionSelector
                    handleSelected={handleActionSelected(fields)}
                    selected={actions(fields)}
                  />
                )}
              </FieldArray>
            </Grid>
          </Grid>
        </div>
      </>
    );
  };

  return (
    <>
      {refreshing && <FedBackdrop open={refreshing} />}
      <FormValidator
        onSubmit={onSubmit}
        initialValues={item ? item : initialValue}
        subscription={{
          ...defaultSuscriptioin,
        }}
        // validate={React.useCallback(() => validation, [])}
        contents={contents}
      />
    </>
  );
};

const isEqual = (prev, next) => {
  return (prev ? prev.id : "") === next.id;
};

export default React.memo(Body, isEqual);

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
  },
  textField: {
    // margin: theme.spacing(1, 0)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    width: "100%",
    padding: theme.spacing(2, 2, 0),
    marginBottom: theme.spacing(2),
  },
  actionButtonHelper: {
    padding: "10px 8px",
  },
  tabLigthRoot: {
    maxHeight: "300px",
    display: "inline-block",
    position: "relative",
  },
  submitRow: {
    // position: "fixed",
    bottom: 0,
    top: "auto",
    width: "100%",
    // zIndex: 1
  },
}));

const initialValue = {
  name: "",
  permissions: [
    {
      access: {
        id: "",
        name: "",
      },
    },
  ],
};

export const SuspenseView = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rect" width={210} height={250} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rect" width={210} height={250} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rect" width={210} height={250} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rect" width={210} height={250} />
        </Grid>
      </Grid>
    </div>
  );
};
