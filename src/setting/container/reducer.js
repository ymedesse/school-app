import * as types from "./constants";

const init = {
  settings: [],
};

const reducer = (state = { ...init }, action) => {
  switch (action.type) {
    case types.SET_SETTING:
      return { ...state, settings: action.payload };
    default:
      return state;
  }
};

const key = "setting";
export { key, init };
export default reducer;
