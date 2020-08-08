import * as type from "./constants";

const actions = {
  setListAction: payload => ({
    type: type.SET_FILES_LIST,
    payload
  }),
  dataChangeAction: payload => ({
    type: type.DATA_CHANGE,
    payload
  }),
  dataDeletedAction: payload => ({
    type: type.DATA_DELETE,
    payload
  }),
  dataManyChangeAction: payload => ({
    type: type.DATA_MANY_CHANGE,
    payload
  }),
  dataManyDeletedAction: payload => ({
    type: type.DATA_MANY_DELETE,
    payload
  })
};

export default actions;
