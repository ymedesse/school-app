import actions from "./actions";
import { readApi, updateApi, updateLocalUser } from "./api";
import { fetcherWithToken } from "../../utils/fecthers";
import { API } from "../../config";

const userPerformances = (dispatch, auth) => {
  const readUser = (next) => {
    const { user, token } = auth;

    readApi(user._id, token).then(async (data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        await dispatch(actions.readUserAction(data));
        next();
      }
    });
  };

  const updateUser = async (userData, next) => {
    const { user, token } = auth;

    updateApi(user._id, token, userData).then(async (data) => {
      if (data.error) {
        next({ error: data.error });
      } else {
        await dispatch(actions.updateUserAction(data.profile));
        updateLocalUser(data.user, () => {});
        next({ success: true });
      }
    });
  };

  const getFetcher = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  const getUserInfoUrl = (id) => {
    const { user } = auth;
    return `${API}/user/${user._id}`;
  };

  return {
    readUser,
    updateUser,
    getFetcher,
    getUserInfoUrl,
  };
};

export default userPerformances;
