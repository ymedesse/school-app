import * as types from "./constants";

const init = {
  profile: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.READ_USER:
      return {
        ...state,
        profile: action.payload
      };

    case types.UPDATE_USER:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};

const key = "user";
export { key, init };
export default reducer;
