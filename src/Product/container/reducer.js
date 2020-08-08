import * as types from "./constants";

const checkAuthenticated = () => {
  if (typeof window === undefined) return false;
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  }
  return false;
};

const init = {
  isAuthenticatedUser: checkAuthenticated(),
  openSigninDialog: false,
  openSignupDialog: false,
  signupError: "",
  signinError: "",
  adminMode: false,
  sessionId: ""
};

const reducer = (state, action) => {
  let update;
  switch (action.type) {
    case types.SIGNIN:
      update = signIn(action.payload);

      return { ...state, ...update };

    case types.SIGNUP:
      update = signUp(action.payload);
      return { ...state, ...update };

    case types.SIGNOUT:
      return { ...state, isAuthenticatedUser: false };

    case types.AUTHENTICATE:
      return { ...state, isAuthenticatedUser: action.payload };

    case types.SET_OPEN_SIGNIN:
      return { ...state, openSigninDialog: action.payload };

    case types.SET_OPEN_SIGNUP:
      return { ...state, openSignupDialog: action.payload };
    case types.SET_ADMIN_MODE:
      return { ...state, adminMode: action.payload };
    case types.SET_CURRENT_SESSION:
      return { ...state, sessionId: action.payload };
    default:
      return state;
  }
};

const authenticate = async data => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};
const signUp = payload => {
  let update;
  if (payload.error) {
    update = {
      isAuthenticatedUser: false,
      signupError: payload.error
    };
  } else {
    authenticate(payload);
    update = { isAuthenticatedUser: payload, signupError: "", signinError: "" };
  }
  return update;
};

const signIn = payload => {
  let update;
  if (payload.error) {
    update = {
      isAuthenticatedUser: false,
      signinError: payload.error
    };
  } else {
    authenticate(payload);
    update = { isAuthenticatedUser: payload, signinError: "", signupError: "" };
  }
  return update;
};

const key = "auth";
export { key, init };
export default reducer;
