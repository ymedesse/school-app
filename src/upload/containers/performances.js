import actions from "./actions";
import {
  createApi,
  readApi,
  listApi,
  removeApi,
  removeManyApi,
  updateApi,
  updateManyApi
} from "./api";
import * as events from "./constants.js";

const authPerformances = (dispatch, auth) => {
  const getFileDetails = id => {
    readApi(id).then(async data => {
      if (data.error) {
        console.log(data.error);
      } else {
        return data;
      }
    });
  };

  const listFiles = (next = () => {}) => {
    const { user, token } = auth;
    listApi(user._id, token).then(async data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setListFiles(data);
        next(data);
      }
    });
  };

  const setListFiles = cart => {
    dispatch(actions.setListAction(cart));
  };

  const uploadFile = (files, next = () => {}) => {
    const { user, token } = auth;
    createApi(user._id, token, files).then(async data => {
      next(data);
    });
  };

  const removeFile = (id, next) => {
    const { user, token } = auth;
    removeApi(user._id, token, id).then(async data => {
      next(data);
    });
  };

  const removeMany = (ids, next) => {
    const { user, token } = auth;
    removeManyApi(user._id, token, ids).then(async data => {
      next(data);
    });
  };

  const updateFiles = (files, next) => {
    const { user, token } = auth;

    if (files.length > 1) {
      updateManyApi(user._id, token, files).then(async data => {
        next(data);
      });
    } else {
      if (files.length === 0) {
        return next({ error: "auccun fichier n'est spécifié" });
      }
      updateApi(user._id, token, files[0]).then(async data => {
        next(data);
      });
    }
  };

  const fetchWithTooken = async (...args) => {
    const { token } = auth;
    return fetch(...args, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json());
  };  

  const performDataChange = data => {
    dispatch(actions.dataChangeAction(data));
  };

  const performDataManyChange = data => {
    dispatch(actions.dataManyChangeAction(data));
  };

  const performDataDeleted = id => {
    dispatch(actions.dataDeletedAction(id));
  };
  const performDataManyDeleted = id => {
    dispatch(actions.dataManyDeletedAction(id));
  };

  const listenSocketAction = ({ operation, data, id }) => {
    switch (operation) {
      case events.FILE_CHANGE:
        //     operation === "delete" && performDataDeleted(id);
        // operation === "replace" && performDataChange(data);
        // operation === "insert" && performDataChange(data);
        break;
      case events.FILE_MANY_CREATE:
        performDataManyChange(data);
        break;

      case events.FILE_UPDATE:
        performDataChange(data);
        break;

      case events.FILE_MANY_UPDATE:
        performDataManyChange(data);
        break;

      case events.FILE_REMOVE:
        performDataDeleted(id);
        break;

      case events.FILE_MANY_REMOVE:
        performDataManyDeleted(data);
        break;
      default:
        break;
    }
  };

  return {
    getFileDetails,
    listFiles,
    setListFiles,
    uploadFile,
    removeFile,
    removeMany,
    updateFiles,
    listenSocketAction,
    fetchWithTooken
  };
};

export default authPerformances;
