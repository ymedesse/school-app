// import actions from "./actions";
import { updateOneListeApi, updateInfoApi, removeOneApi } from "./api";
import { fetcherWithToken } from "../../utils/fecthers";
import { API } from "../../config";

const performances = (dispatch, auth) => {
  const updateOneListe = (data, next) => {
    const { user, token } = auth;
    updateOneListeApi(user._id, token, data).then((data) => {
      next(data);
    });
  };

  const removeOne = (liste, next) => {
    const { user, token } = auth;
    removeOneApi(user._id, token, liste).then((data) => {
      next(data);
    });
  };

  const updateInfo = (liste, next) => {
    const { user, token } = auth;
    updateInfoApi(user._id, token, liste).then((data) => {
      next(data);
    });
  };

  const getFetcher = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  const getReadUrl = () => {
    const { user } = auth;
    return `${API}/wished-list/${user._id}`;
  };

  return {
    getFetcher,
    getReadUrl,
    updateOneListe,
    removeOne,
    updateInfo,
  };
};

export default performances;
