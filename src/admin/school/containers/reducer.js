import * as types from "./constants";

const key = "school";
const init = {
  schools: [],
};

const reducer = (state = { init }, action) => {
  switch (action.type) {
    case types.SET_SCHOOLSLIST:
      return { ...state, schools: action.payload };
    default:
      return state;
  }
};

export { key, init };
export default reducer;