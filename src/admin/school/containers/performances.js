import actions from "./actions";
import {
  createApi,
  updateApi,
  removeApi,
  createListeApi,
  updateListeApi,
  removeListesApi,
  getSchoolsListApi
} from "./api";
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
    const query = queryString.stringify({ ...searchData });
    return `${API}/schools/partial-search?${query}`;
  };

  const createListe = (items, next) => {
    const { user, token } = auth;
    createListeApi(user._id, token, items).then((data) => {
      next(data);
    });
  };

  const updateListe = (id, items, next) => {
    const { user, token } = auth;
    updateListeApi(user._id, token, id, items).then((data) => {
      next(data);
    });
  };

  const removeManyListe = (ids, next) => {
    const { user, token } = auth;
    removeListesApi(user._id, token, ids).then((data) => {
      next(data);
    });
  };

  /**
   * contenu du panier
   * @param {string} id
   */
  const getReadUrl = (id) => {
    const { user } = auth;
    return `${API}/school/${id}/${user._id}`;
  };

  const getSchoolClassesUrl = (schoolId) => {
    return `${API}/classes-by-school-id/${schoolId}`;
  };

  const getReadListeContentUrl = (listId) => {
    return `${API}/school-fournitures/${listId}`;
  };
  
  const initialize = () => {
    getSchoolsListApi().then((data) => {
      if (data && !data.error)
        dispatch(actions.setSetSchoolsListAction(data.results));
    });
  };

  return {
    initialize,
    getFetcher,
    getReadUrl,
    create,
    update,
    removeMany,
    getPartialSearch,
    listesActions: {
      createListe,
      updateListe,
      removeManyListe,
      getSchoolClassesUrl,
      getFetcher,
      getReadListeContentUrl,
    },
  };
};

export default performances;
