import * as type from "./constants";

const key = "wooCategory";
const init = { categories: [] };

const reducer = (state = { ...init }, action) => {
  switch (action.type) {
    case type.SET_CATEGORIES_LIST:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export { key, init };
export default reducer;
