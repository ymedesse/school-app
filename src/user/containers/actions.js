import * as type from "./constants";

const actions = {
  readUserAction: payload => ({
    type: type.READ_USER,
    payload
  }),
  updateUserAction: payload => ({
    type: type.UPDATE_USER,
    payload
  })
};

export default actions;
