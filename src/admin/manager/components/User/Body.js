import React from "react";
// import Content from "./Info";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useSWR from "swr";
import LinearProgress from "@material-ui/core/LinearProgress";
import Suspenser from "../../../../components/Suspenser";
import CssBaseline from "@material-ui/core/CssBaseline";

import FormValidator, {
  defaultSuscriptioin,
} from "../../../../components/FormValidator";

const Additionnel = React.lazy(() => import("./Additionnel"));
const Form = React.lazy(() => import("./Form"));

const useStyles = makeStyles((theme) => ({
  paper: {
    // maxWidth: "400px",
    // margin: "auto",
  },
}));

const Body = ({
  setCurrentViewerTitleAndAction,
  user: sourceUser,
  getUserInfoUrl,
  fetcher,
  nextStep,
  previous,
  setError,
  submit,
  roles,
}) => {
  const classes = useStyles();
  const [user, setUser] = React.useState(sourceUser);
  const [validateHandler, setValidateHandler] = React.useState({
    submiting: false,
  });

  React.useEffect(() => {
    setCurrentViewerTitleAndAction("Information utilisateur", <></>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { submiting } = validateHandler;

  const url = getUserInfoUrl(sourceUser._id);

  // eslint-disable-next-line no-unused-vars
  const { data, mutate } = useSWR(url, fetcher, {
    initialData: sourceUser,
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    suspense: true,
    onSuccess: (data) => {
      setUser({ ...data.user });
    },
  });

  const { error } = data;
  error && setError({ error });

  const onSubmit = async (values, form) => {
    setValidateHandler({ ...validateHandler, submiting: true });
    submit &&
      submit(values, () => {
        setValidateHandler({
          submiting: false,
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
        <CssBaseline />
        <Grid
          container
          spacing={1}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item sm={6} xs={12}>
            <Suspenser height={100}>
              <Form user={user} />
            </Suspenser>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Suspenser height={100}>
              <Additionnel
                classes={classes}
                submiting={submiting}
                pristine={pristine}
                valid={valid}
                submitting={submitting}
                form={form}
                handleSubmit={handleSubmit}
                user={user}
              />
            </Suspenser>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      {submiting && <LinearProgress />}
      <div
        style={{
          maxHeight: "80vh",
        }}
      >
        <FormValidator
          onSubmit={onSubmit}
          initialValues={user ? user : initialValue}
          subscription={{
            ...defaultSuscriptioin,
          }}
          // validate={React.useCallback(() => validation, [])}
          contents={contents}
        />
      </div>
    </>
  );
};

const initialValue = {
  "roles": [
    {
      name: "",
      permissions: [],
    },
  ],
};

export default Body;
