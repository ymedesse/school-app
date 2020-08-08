import * as type from "./constants";

const actions = {
  signinAction: payload => ({
    type: type.SIGNIN,
    payload
  }),
  signUpAction: payload => ({
    type: type.SIGNUP,
    payload
  }),
  authenticateAction: payload => ({
    type: type.AUTHENTICATE,
    payload
  }),
  signoutAction: payload => ({
    type: type.SIGNOUT,
    payload
  }),
  setOpenSigninAction: payload => ({
    type: type.SET_OPEN_SIGNIN,
    payload
  }),
  setOpenSignupAction: payload => ({
    type: type.SET_OPEN_SIGNUP,
    payload
  }),
  setAdminModeAction: payload => ({
    type: type.SET_ADMIN_MODE,
    payload
  }),
  setsetSessionIdAction: payload => ({
    type: type.SET_CURRENT_SESSION,
    payload
  }),

};

export default actions;
