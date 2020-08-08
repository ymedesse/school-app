import * as type from "./constants";

const init = { files: [] };

const reducer = (state = { init }, action) => {
  switch (action.type) {
    case type.SET_FILES_LIST:
      return {
        ...state,
        files: action.payload
      };

    case type.DATA_CHANGE:
      return {
        ...state,
        files: [...performChanged(state.files, action.payload)]
      };
    case type.DATA_DELETE:
      return {
        ...state,
        files: [...performDeleted(state.files, action.payload)]
      };

    case type.DATA_MANY_CHANGE:
      return {
        ...state,
        files: [...performManyChanged(state.files, action.payload)]
      };
    case type.DATA_MANY_DELETE:
      return {
        ...state,
        files: [...performManyDeleted(state.files, action.payload)]
      };

    default:
      return state;
  }
};

const performDeleted = (items, id) => {
  const newItems = items.filter(item => item._id !== id);
  return newItems;
};

const performManyDeleted = (items, ids) => {
  let newItems = [...items];
  for (let i = 0; i < ids.length; i++) {
    newItems = newItems.filter(item => item._id !== ids[i]);
  }

  return newItems;
};

const performChanged = (files, newFile) => {
  let m = [...files];
  const index = m.findIndex(o => o._id === newFile._id);
  if (index !== -1) {
    m[index] = { ...newFile };
  } else {
    m = [...files, { ...newFile }];
  }

  return m;
};

const performManyChanged = (files, newFiles) => {
  let m = [...files];

  for (let i = 0; i < newFiles.length; i++) {
    const newFile = newFiles[i];
    const index = m.findIndex(o => o._id === newFile._id);
    if (index !== -1) {
      m[index] = { ...newFile };
    } else {
      m = [{ ...newFile }, ...m];
    }
  }

  return m;
};

const socketEvent = [
  //type._FILE_CHANGE,
  type._FILE_MANY_CREATE,
  type._FILE_UPDATE,
  type._FILE_MANY_UPDATE,
  type._FILE_REMOVE,
  type._FILE_MANY_REMOVE
];

const key = "upload";
export { key, init, socketEvent };
export default reducer;
