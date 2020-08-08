import * as types from "./constants";

const init = {
  error: false,
  success: false,
  next: undefined,
};

const reducer = (state, action) => {
  if (!action.payload) return state;
  const { error, success, next } = action.payload;
  switch (action.type) {
    case types.SET_ERROR:
      return { ...state, sucess: false, error, next };
    case types.SET_SUCCESS:
      return { ...state, error: false, success, next };
    case types.INITIALIZE:
      return { ...state, error: false, success: false, next: undefined };
    default:
      return state;
  }
};

const key = "alert";
export { key, init };
export default reducer;
