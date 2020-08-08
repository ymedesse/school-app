import actions from "./actions";
import { submitInstallmentPaymentApi, submitCancelOrderApi } from "./api";
import { API } from "../../config";
import { fetcherWithToken } from "../../utils/fecthers";
import queryString from "query-string";

const authPerformances = (dispatch, auth) => {
  const submitInstallmentPayment = (orderId, paymentData, next) => {
    const { user, token } = auth;
    submitInstallmentPaymentApi(user._id, token, orderId, paymentData).then(
      (data) => {
        if (data && !data.error) {
          dispatch(actions.setCurrentOrderAction(data));
        }
        next(data);
      }
    );
  };

  const cancelOrder = (orderId, next) => {
    const { user, token } = auth;
    submitCancelOrderApi(user._id, token, orderId).then((data) => {
      if (data && !data.error) {
        dispatch(actions.setCurrentOrderAction(data));
      }
      next(data);
    });
  };

  const setCurrentOrder = (order, next) => {
    dispatch(actions.setCurrentOrderAction(order));
  };

  const getReadUrl = (id) => {
    const { user } = auth;
    return `${API}/order/${id}/${user._id}`;
  };

  const getPaymentsListUrl = (id) => {
    const { user } = auth;
    return `${API}/order/payments/${id}/${user._id}`;
  };

  const getOrdersList = (filter) => {
    const { user } = auth;
    const query = queryString.stringify(filter);

    return `${API}/orders/byuser/${user._id}?${query}`;
  };

  const getFetcher = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  return {
    setCurrentOrder,
    getOrdersList,
    submitInstallmentPayment,
    cancelOrder,
    getReadUrl,
    getFetcher,
    getPaymentsListUrl,
  };
};

export default authPerformances;
