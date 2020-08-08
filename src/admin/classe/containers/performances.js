// import actions from "./actions";
import { createApi, updateApi, removeApi } from "./api";
import { fetcherWithToken } from "../../../utils/fecthers";
import { API } from "../../../config";
import queryString from "query-string";

const performances = (dispatch, auth) => {
  const create = (items, next) => {
    const { user, token } = auth;
    createApi(user._id, token, items).then((data) => {
      next(data);
    });
  };

  const update = (id, items, next) => {
    const { user, token } = auth;
    updateApi(user._id, token, id, items).then((data) => {
      next(data);
    });
  };

  const removeMany = (ids, next) => {
    const { user, token } = auth;
    removeApi(user._id, token, ids).then((data) => {
      next(data);
    });
  };

  const getFetcher = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  const getPartialSearch = (searchData) => {
    // const { user } = auth;
    // const { search, limit, offset } = searchData;

    const query = queryString.stringify({ ...searchData });
    return `${API}/classes/partial-search?${query}`;
  };

  /**
   * contenu du panier
   * @param {string} id
   */
  const getReadUrl = (id) => {
    const { user } = auth;
    return `${API}/classe/${id}/${user._id}`;
  };

  return {
    getFetcher,
    getReadUrl,
    create,
    update,
    removeMany,
    getPartialSearch,
  };
};

export default performances;
