import actions from "./actions";
import { createCategoryApi, wooCategoriesApi } from "./api";
import { fetcherWithToken } from "../../utils/fecthers";
import { API } from "../../config";

const performances = (dispatch, auth) => {
  const createCategory = (category, next) => {
    const { user, token } = auth;
    createCategoryApi(user._id, token, category).then((data) => {
      next(data);
      // dispatch(actions.createCategoryAction(data));
    });
  };

  const getFetcher = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  const getProductsCategoriesUrl = (searchData) => {
    const { user } = auth;
    return `${API}/categories/${user._id}`;
  };

  const getWooCategories = async (next) => {
    let end = false;
    let resultat = [];
    let page = 1;
    do {
      try {
        const result = await fetchCategories({ per_page: 100, page });
        if (result.length === 0) end = true;
        resultat = [...resultat, ...result];
        page++;
      } catch (error) {
        console.log({ error });
        next && next({ error: " une erreur s'est produite" });
        break;
      }
    } while (!end);

    if (end) {
      await dispatch(actions.setCategoriesListActions(resultat));
      next && next(resultat);
    }
  };

  const fetchCategories = async (options) => {
    return new Promise((resolve, reject) => {
      wooCategoriesApi(options)
        .then(async (response) => {
          if (response !== undefined) {
            resolve(response.data);
          } else reject("contenu vide");
        })
        .catch((err) => {
          console.log({ "categories_error ": { err } });
          reject(err);
        });
    });
  };

  return {
    createCategory,
    getFetcher,
    getProductsCategoriesUrl,
    getWooCategories: (arg) => getWooCategories(arg),
  };
};

export default performances;
