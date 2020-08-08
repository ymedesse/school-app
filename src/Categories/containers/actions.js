import * as type from "./constants";
const actions = {
  getCategoriesAction: (payload) => ({
    type: type.GET_CATEGORIES,
    payload,
  }),
  createCategoryAction: (payload) => ({
    type: type.CREATE_CATEGORY,
    payload,
  }),
  setCategoriesListActions: (payload) => ({
    type: type.SET_CATEGORIES_LIST,
    payload,
  }),
};

export default actions;
