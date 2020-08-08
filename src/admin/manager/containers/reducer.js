import * as type from "./constants";

const key = "manager";
const init = { users: [] };

const reducer = (state = { init }, action) => {
  switch (action.type) {
    case type.GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};

export { key, init };
export default reducer;
