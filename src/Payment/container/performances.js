import actions from "./actions";
import { createOrderApi } from "./api";
import { API } from "../../config";

const authPerformances = (dispatch, auth) => {
  const createNewOrder = (auth, createOrderData, next) => {
    const { user, token } = auth;
    createOrderApi(user._id, token, createOrderData).then((data) => {
      dispatch(actions.createNewOrderAction(data));
      if (!data.error) {
        next();
      }
    });
  };


  return {
    createNewOrder,
  };
};

export default authPerformances;
