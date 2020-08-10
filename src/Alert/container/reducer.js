import * as types from "./constants";

const init = {
  error: false,
  success: false,
  next: undefined,
  message: undefined,
  title: undefined,
  action: undefined,
};

const reducer = (state, action) => {
  if (!action.payload) return state;
  const { next, title, action: alertAction, message } = action.payload;
  switch (action.type) {
    case types.SET_ERROR:
      return {
        ...state,
        sucess: false,
        error: true,
        next,
        title,
        action: alertAction,
        message,
      };
    case types.SET_SUCCESS:
      return {
        ...state,
        error: false,
        success: true,
        next,
        title,
        action: alertAction,
        message,
      };
    case types.INITIALIZE:
      return { ...state, ...init };
    default:
      return state;
  }
};

const key = "alert";
export { key, init };
export default reducer;
