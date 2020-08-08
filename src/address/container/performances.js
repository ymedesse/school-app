import actions from "./actions";
import { fetcherWithToken } from "../../utils/fecthers";
import { getAddressesApi, createAddressApi, updateAddressApi } from "./api";

const adressPerformances = (dispatch, auth) => {
  const geAddresses = () => {
    auth &&
      getAddressesApi(auth.user._id, auth.token).then((data) => {
        if (data.error) {
          console.log(data.error);
          return [];
        } else {
          dispatch(actions.setAddressesAction(data));
        }
      });
  };

  const createAddress = (isauth, address, next) => {
    isauth &&
      createAddressApi(isauth.user._id, isauth.token, address).then((data) => {
        if (data.error) {
          console.log(data.error);
          next({ error: data.error });
        } else {
          next({ success: true, address: data.address });
        }
      });
  };

  const updateAddress = (isauth, address, next) => {
    isauth &&
      updateAddressApi(isauth.user._id, isauth.token, address).then((data) => {
        if (data.error) {
          console.log(data.error);
          next({ error: data.error });
        } else {
          next({ success: true, address: data.address });
        }
      });
  };

  const listenSocketAction = (address) => {
    dispatch(actions.setInAddressesAction(address));
  };

  const initActions = () => {
    if (auth) {
      geAddresses();
    }
  };

  const getFetcher = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  return {
    geAddresses,
    createAddress,
    initActions,
    listenSocketAction,
    updateAddress,
    getFetcher,
    // listenSocket
  };
};

export default adressPerformances;
