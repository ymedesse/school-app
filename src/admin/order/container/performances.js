// import actions from "./actions";
import { updateStatusApi, updateApi, updateLocalStatusApi } from "./api";
import { fetcherWithToken } from "../../../utils/fecthers";
import { API } from "../../../config";
import queryString from "query-string";
import { LOCAL_STATUS } from "./constants";

const performances = (dispatch, auth) => {
  const update = async (_id, data, next) => {
    const { user, token } = auth;
    updateApi(user._id, token, _id, data).then((data) => {
      next && next(data);
    });
  };

  const updateStatus = (id, type, status, next) => {
    const { user, token } = auth;
    updateStatusApi(user._id, token, id, status, type).then((data) => {
      next && next(data);
    });
  };

  const getFetcher = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  const getPartialSearch = (searchData) => {
    const { user } = auth;
    // const { search, limit, offset } = searchData;
    const query = queryString.stringify({ ...searchData });
    return `${API}/orders/partial-search/${user._id}?${query}`;
  };

  const getReadUrl = (id) => {
    const { user } = auth;
    return `${API}/order/${id}/${user._id}`;
  };

  const getStatusListUrl = (type) => {
    const pref = type === LOCAL_STATUS ? "local-" : "";
    const { user } = auth;
    return `${API}/orders/${pref}status/${user._id}`;
  };

  const getPaymentsListUrl = (id) => {
    const { user } = auth;
    return `${API}/order/payments/${id}/${user._id}`;
  };

  const checkPermission = (access) => {
    const { user } = auth;

    let allow = false;
    if (user) {
      if (user.supUser) return true;

      const { accesses } = user;
      allow = access ? (accesses ? accesses[`${access}`] : undefined) : false;
    }
    return allow;
  };

  return {
    getFetcher,
    getReadUrl,
    getStatusListUrl,
    getPaymentsListUrl,
    getPartialSearch,
    updateStatus,
    checkPermission,
  };
};

export default performances;
