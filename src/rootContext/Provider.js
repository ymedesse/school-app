import React from "react";
import { useReducer } from "reinspect";
import combineReducer from "../utils/combineReducer";
import MainContext from "./context";
import { performContextInitial } from "../utils";
import useSWR from "swr";

// Auth reducers

import AuthReducer, {
  key as AuthKey,
  init as AuthInit,
} from "../auth/containers/reducer.js";
import AuthPerformances from "../auth/containers/performances";

import userReducer, {
  key as userKey,
  init as userInit,
} from "../user/containers/reducer.js";
import userPerformances from "../user/containers/performances";
import * as userAccesses from "../user/containers/accesses";

import cartReducer, {
  key as cartKey,
  init as cartInit,
} from "../cart/containers/reducer";
import cartPerformances from "../cart/containers/performances";
import * as cartAccesses from "../cart/containers/accesses";

import orderReducer, {
  key as orderKey,
  init as orderInit,
} from "../order/container/reducer";
import orderPerformances from "../order/container/performances";

import checkoutReducer, {
  key as checkoutKey,
  init as checkoutInit,
} from "../Paiement/container/reducer";
import checkoutPerformances from "../Paiement/container/performances";

import addressReducer, {
  key as addressKey,
  init as addressInit,
} from "../address/container/reducer";
import addressPerformances from "../address/container/performances";

import alertReducer, {
  key as alertKey,
  init as alertInit,
} from "../Alert/container/reducer";
import alertPerformances from "../Alert/container/performances";

import ProductReducer, {
  key as ProductKey,
  init as ProductInit,
} from "../Product/container/reducer";
import ProductPerformance from "../Product/container/performances";
import * as productAccesses from "../Product/container/accesses";

import LayoutReducer, {
  key as LayoutKey,
  init as LayoutInit,
} from "../layout/containers/reducer";
import LayoutPerformance from "../layout/containers/performances";

import wooCategoryReducer, {
  key as wooCategoryKey,
  init as wooCategoryInit,
} from "../Categories/containers/reducer";
import wooCategoryPerformance from "../Categories/containers/performances";
import * as wooCategoryAccesses from "../Categories/containers/accesses";

import settingReducer, {
  key as settingKey,
  init as settingInit,
} from "../setting/container/reducer";
import settingPerformance from "../setting/container/performances";

import uploadReducer, {
  key as uploadKey,
  init as uploadInit,
} from "../upload/containers/reducer";
import uploadPerformance from "../upload/containers/performances";

const RootProvider = (props) => {
  // initial rootstate

  const initialValue = {
    [AuthKey]: AuthInit,
    [ProductKey]: ProductInit,
    [LayoutKey]: LayoutInit,
    [alertKey]: alertInit,
    [userKey]: userInit,
    [cartKey]: cartInit,
    [addressKey]: addressInit,
    [orderKey]: orderInit,
    [checkoutKey]: checkoutInit,
    [wooCategoryKey]: wooCategoryInit,
    [settingKey]: settingInit,
    [uploadKey]: uploadInit,
    permission: {
      accesses: {
        ...userAccesses,
        ...cartAccesses,
        ...productAccesses,
        ...wooCategoryAccesses,
      },
    },
  };

  // root reducer
  const rootReducer = combineReducer({
    [ProductKey]: ProductReducer,
    [LayoutKey]: LayoutReducer,
    [alertKey]: alertReducer,
    [userKey]: userReducer,
    [cartKey]: cartReducer,
    [addressKey]: addressReducer,
    [orderKey]: orderReducer,
    [checkoutKey]: checkoutReducer,
    [wooCategoryKey]: wooCategoryReducer,
    [settingKey]: settingReducer,
    [uploadKey]: uploadReducer,
    [AuthKey]: AuthReducer,
  });

  // root state and dispatch
  const [state, dispatch] = useReducer(
    rootReducer,
    initialValue,
    (state) => state,
    "rootState"
  );

  // state with dispacth actions

  let initial = {
    ...state,
  };

  const auth = state[AuthKey].isAuthenticatedUser;
  initial = performContextInitial(state, dispatch, initial, [
    { key: LayoutKey, Performance: LayoutPerformance },
    { key: alertKey, Performance: alertPerformances },
    {
      key: wooCategoryKey,
      Performance: wooCategoryPerformance,
      auth,
    },
    {
      key: userKey,
      Performance: userPerformances,
      auth,
    },
    {
      key: cartKey,
      Performance: cartPerformances,
      auth,
    },
    {
      key: orderKey,
      Performance: orderPerformances,
      auth,
    },
    {
      key: checkoutKey,
      Performance: checkoutPerformances,
      auth,
    },
    {
      key: addressKey,
      Performance: addressPerformances,
      auth,
    },
    {
      key: ProductKey,
      Performance: ProductPerformance,
      auth,
    },
    {
      key: settingKey,
      Performance: settingPerformance,
      auth,
    },
    {
      key: uploadKey,
      Performance: uploadPerformance,
      auth,
    },
    { key: AuthKey, Performance: AuthPerformances },
  ]);

  const {
    getFetcher,
    getUserInfoUrl,
    setUserInfo,
    isAuthenticatedUser,
  } = initial.auth;

  const { setCartFromUserInfo, cart: oldCart, commande: oldCmd } = initial.cart;

  const { initialize: initializeSetting } = initial.setting;

  const { data } = useSWR(
    getUserInfoUrl(isAuthenticatedUser),
    getFetcher(isAuthenticatedUser),
    {
      refreshInterval: 5000,
      suspense: false,
      revalidateOnFocus: true,
    }
  );

  React.useEffect(() => {
    if (isAuthenticatedUser) initializeSetting(isAuthenticatedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticatedUser]);

  React.useEffect(() => {
    setUserInfo(data, auth);
    setCartFromUserInfo(data, oldCart, oldCmd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <MainContext.Provider displayName="wooback" value={{ ...initial }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default RootProvider;
