// import actions from "./actions";
import {
  updateRoleApi,
  deleteApi,
  updateManyAccessesApi,
  emptyAccessesApi,
  deleteManyAccessesApi,
  createRoleApi,
  deleteManyRoleApi,
  emptyRolesApi,
  updateManyRolesApi,
} from "./api";
import { fetcherWithToken } from "../../../utils/fecthers";
import { API } from "../../../config";

const performances = (dispatch, auth) => {
  const updateManyAccesses = (accesses, next) => {
    const { user, token } = auth;
    updateManyAccessesApi(user._id, token, accesses).then((data) => {
      next(data);
    });
  };

  const emptyAccesses = (next) => {
    const { user, token } = auth;
    emptyAccessesApi(user._id, token).then((data) => {
      next(data);
    });
  };

  const deleteManyAccesses = (ids, next) => {
    const { user, token } = auth;
    deleteManyAccessesApi(user._id, token, ids).then((data) => {
      next(data);
    });
  };

  const removeUsers = (ids, next) => {
    const { user, token } = auth;
    deleteApi(user._id, token, ids).then((data) => {
      next(data);
    });
  };

  const getFetcher = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  const getUsersListUrl = () => {
    const { user } = auth;
    return `${API}/users/${user._id}`;
  };

  const getActionsUrl = () => {
    const { user } = auth;
    return `${API}/accesses/${user._id}`;
  };

  const getUserInfoUrl = (id) => {
    const { user } = auth;
    return `${API}/user/${id}/${user._id}`;
  };

  const getRolesUrl = () => {
    const { user } = auth;
    return `${API}/roles/${user._id}`;
  };

  const getReadUrl = (id) => {
    const { user } = auth;
    return `${API}/role/${id}/${user._id}`;
  };

  const createRole = (roles, next) => {
    const { user, token } = auth;
    createRoleApi(user._id, token, roles).then((data) => {
      next(data);
    });
  };
  const updateRole = (userToManage, next) => {
    const { user, token } = auth;

    updateRoleApi(user._id, token, userToManage).then((data) => {
      next(data);
    });
  };

  const deleteManyRoles = (ids, next) => {
    const { user, token } = auth;
    deleteManyRoleApi(user._id, token, ids).then((data) => {
      next(data);
    });
  };

  const updateManyRoles = (accesses, next) => {
    const { user, token } = auth;
    updateManyRolesApi(user._id, token, accesses).then((data) => {
      next(data);
    });
  };

  const emptyRoles = (next) => {
    const { user, token } = auth;
    emptyRolesApi(user._id, token).then((data) => {
      next(data);
    });
  };

  return {
    updateRole,
    removeUsers,
    getFetcher,
    getUsersListUrl,
    getUserInfoUrl,
    getActionsUrl,
    updateManyAccesses,
    emptyAccesses,
    deleteManyAccesses,
    getRolesUrl,
    createRole,
    deleteManyRoles,
    emptyRoles,
    getReadUrl,
    updateManyRoles,
  };
};

export default performances;
