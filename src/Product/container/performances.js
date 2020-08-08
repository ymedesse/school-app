import actions from "./actions";
import { getProductsApi, listRelatedApi } from "./api";

const authPerformances = (dispatch) => {
  const getProducts = (sortBy) => {
    getProductsApi(sortBy).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        dispatch(actions.signinAction(data));
      }
    });
  };

  const listRelated = (productId) => {
    listRelatedApi(productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        dispatch(actions.signinAction(data));
      }
    });
  };

  return {};
};

export default authPerformances;
