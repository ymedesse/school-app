import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SubLargeTypography, LargeTypography } from "../components/assets";
import FormValidator from "../components/FormValidator";
import Divider from "@material-ui/core/Divider";
import validate from "./validator";
import { Notifications } from "../components/ShowApiNotification";
import useSWR, { trigger } from "swr";
import CompteForm from "./Form";

const init = {
  error: false,
  success: false,
};

const Compte = ({ profile, user, updateUser, url, fetcher }) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    data: user,
    ...init,
  });

  const { error, success, data } = state;
  const { isOnlyExternal } = data;

  const { data: result } = useSWR(url, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: true,
    suspense: true,
  });

  React.useEffect(() => {
    if (result && !result.error) {
      setState((state) => ({ ...state, data: result }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const onSubmit = async (values) => {
    updateUser(values, ({ error, success }) => {
      error && handleInitLayout({ success: false, error });
      if (success) {
        trigger(url);
        handleInitLayout({
          success: " Votre compte a mise à jour avec succès ",
          error: false,
        });
      }
    });
  };

  const contents = ({ form, handleSubmit }) => (
    <CompteForm form={form} isOnlyExternal={isOnlyExternal} initState={data} />
  );

  const handleInitLayout = (val) => setState((state) => ({ ...state, ...val }));
  return (
    <div>
      <Notifications
        notificationType="success"
        message={success}
        nextClose={() => handleInitLayout(init)}
      />
      <Notifications
        notificationType="error"
        message={error}
        nextClose={() => handleInitLayout(init)}
      />

      <LargeTypography> Compte </LargeTypography>
      <SubLargeTypography>
        Modifier les paramètres de votre compte
      </SubLargeTypography>
      <div className={classes.margin} />
      <div className={classes.margin} />
      <Divider light={true} />
      <div className={classes.margin} />
      <div className={classes.margin} />

      <FormValidator
        onSubmit={onSubmit}
        initialValues={getInitialValues(data)}
        subscription={{ pristine: true, submitting: true }}
        validate={validate}
        contents={contents}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  title: {
    margin: theme.spacing(0, 3, 0, 1),
  },
}));

export default Compte;

const getInitialValues = (profile) => ({
  lastName: profile.lastName,
  firstName: profile.firstName,
  email: profile.email,
  nomAfficher: profile.nomAfficher,
  phone: profile.phone,
  password: "",
  newPassword: "",
  confirmation: "",
});
