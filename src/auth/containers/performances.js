import actions from "./actions";
import { signupApi, signinApi, signoutApi, externalSigninApi } from "./api";
import { API } from "../../config";
import { fetcherWithToken } from "../../utils/fecthers";

const authPerformances = (dispatch) => {
  const signin = async (user, next) => {
    signinApi(user).then(async (data) => {
      await checkErrorData(data, next, async () => {
        !data.error &&
          authenticate(data, async () => {
            await dispatch(actions.signinAction(data));
            next(data);
          });
      });
    });
  };

  const externalSignin = async (sdata, next) => {
    externalSigninApi(sdata).then(async (data) => {
      await checkErrorData(data, next, async () => {
        if (!data.error) {
          const val = { ...data, connectByGoogle: true };

          authenticate(val, async () => {
            await dispatch(actions.signinAction(val));
            next && next(val);
          });
        }
      });
    });
  };

  const signup = async (user, next) => {
    signupApi(user).then(async (data) => {
      checkErrorData(data, next, async () => {
        !data.error &&
          authenticate(data, async () => {
            dispatch(actions.signUpAction(data));
            next(data);
          });
      });
    });
  };

  const authenticate = async (data, next) => {
    if (typeof window !== undefined) {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
    }
  };

  // si il y a une erreur il déconnecte tous les clients du meme user
  const setUserInfo = async (data, auth) => {
    if (data) {
      let result = false;
      if (data.error || !(data.user || {}).isConnected) {
        await authOut();
      } else {
        const { user } = data;
        result = { ...auth, user };
      }

      dispatch(actions.setUserInfoAction(result));
    }
  };

  const setOpenSigninDialog = (open) => {
    dispatch(actions.setOpenSigninAction(open));
  };

  const setOpenSignupDialog = (open) => {
    dispatch(actions.setOpenSignupAction(open));
  };

  const signout = (auth, next) => {
    auth &&
      signoutApi(auth.user._id).then(async (data) => {
        await authOut();
        next && next();
        dispatch(actions.signoutAction(data));
      });
  };

  const setAdminMode = (mode) => {
    dispatch(actions.setAdminModeAction(mode));
  };

  const setsetSessionId = (session) => {
    dispatch(actions.setsetSessionIdAction(session));
  };

  const getUserInfoUrl = (auth) => {
    const { user = {} } = auth;

    return () => (auth ? `${API}/user/info/${user._id}` : null);
  };

  const getFetcher = (auth) => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };
  const authOut = async () => {
    if (typeof window !== undefined) {
      await localStorage.removeItem("jwt");
    }
  };

  const isAuthenticated = () => {
    if (typeof window === undefined) return false;
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    }
    return false;
  };

  return {
    signin,
    signup,
    signout,
    setOpenSigninDialog,
    setOpenSignupDialog,
    setAdminMode,
    setsetSessionId,
    getUserInfoUrl,
    getFetcher,
    setUserInfo,
    isAuthenticated,
    externalSignin,
  };
};
export default authPerformances;

const checkErrorData = (data, sendError, next) => {
  if (data === undefined || (data && data.error)) {
    data && sendError({ error: data.error });
    !data && sendError({ error: "Connexion failed" });
  } else {
    next();
  }
};
