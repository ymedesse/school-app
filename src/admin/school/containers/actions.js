import * as type from "./constants";
const actions = {
  setSetSchoolsListAction: (payload) => ({
    type: type.SET_SCHOOLSLIST,
    payload,
  }),
};

export default actions;
