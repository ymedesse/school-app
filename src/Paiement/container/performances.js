import actions from "./actions";
import {
  createOrderApi,
  submitShippingApi,
  processPaymentApi,
  checkPaymentStausApi,
} from "./api";
import { API } from "../../config";
import { fetcherWithToken } from "../../utils/fecthers";

const authPerformances = (dispatch, auth) => {
  const submitOder = (orderData, next) => {
    const { user, token } = auth;
    createOrderApi(user._id, token, orderData).then((data) => {
      if (data && !data.error) {
        dispatch(actions.setNewOrderAction(data));
      }
      next(data);
    });
  };

  const submitShipping = (shipping, next, file) => {
    const { user, token } = auth;
    submitShippingApi(user._id, token, shipping, file).then((data) => {
      next(data);
    });
  };

  const submitPayment = (oderId, payment, next, file) => {
    // const { user, token } = auth;
    // submitShippingApi(user._id, token, shipping, file).then((data) => {
    //   next(data);
    // });
  };

  const processQosPayment = (payData, next, file) => {
    const { user, token } = auth;
    processPaymentApi(user._id, token, payData).then((data) => {
      next(data);
    });
  };

  const checkQosPaymentStatus = (values, next, file) => {
    const { user, token } = auth;
    return new Promise((resolve, reject) => {
      checkPaymentStausApi(user._id, token, values).then((data) => {
        data && resolve(data);
      });
    });
  };

  const setShippingRange = (data, oldShippingPrice) => {
    if (data) {
      const { shippingRange } = data;
      if (
        shippingRange &&
        isDifferentShippingRange(shippingRange, oldShippingPrice)
      ) {
        dispatch(actions.setShippingRangeAction(shippingRange));
      }
    }
  };

  const isDifferentShippingRange = (newVal, oldVal) => {
    return JSON.stringify(newVal) !== JSON.stringify(oldVal);
  };

  const getReadOrderUrl = (id) => {
    const { user } = auth;
    return `${API}/order/${id}/${user._id}`;
  };

  const getFetcher = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  return {
    submitOder,
    setShippingRange,
    submitShipping,
    processQosPayment,
    checkQosPaymentStatus,
    getReadOrderUrl,
    getFetcher,
    submitPayment,
  };
};

export default authPerformances;
