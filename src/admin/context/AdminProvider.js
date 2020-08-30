import React from "react";
import { useReducer } from "reinspect";
import combineReducer from "../../utils/combineReducer";
import MainContext from "./AdminContext";
import { performContextInitial } from "../../utils";
import RootContext from "../../rootContext/context";

import managerReducer, {
  key as managerKey,
  init as managerInit,
} from "../manager/containers/reducer";
import managerPerformances from "../manager/containers/performances";
import * as managerAccesses from "../manager/containers/accesses";

import ProductReducer, {
  key as ProductKey,
  init as ProductInit,
} from "../Product/container/reducer";
import ProductPerformance from "../Product/container/performances";
import * as productAccesses from "../Product/container/accesses";

import orderReducer, {
  key as orderKey,
  init as orderInit,
} from "../order/container/reducer";
import orderPerformance from "../order/container/performances";
import * as orderAccesses from "../order/container/accesses";

// import clientReducer, {
//   key as clientKey,
//   // init as clientInit,
// } from "../Client/containers/reducer";
// import clientPerformance from "../Client/containers/performances";
// import * as clientAccesses from "../Client/containers/accesses";

import LayoutReducer, {
  key as LayoutKey,
  init as LayoutInit,
} from "../layout/containers/reducer";
import LayoutPerformance from "../layout/containers/performances";

import wooCategoryReducer, {
  key as wooCategoryKey,
  init as wooCategoryInit,
} from "../../Categories/containers/reducer";
import wooCategoryPerformance from "../../Categories/containers/performances";
import * as wooCategoryAccesses from "../../Categories/containers/accesses";

import settingReducer, {
  key as settingKey,
  init as settingInit,
} from "../../setting/container/reducer";
import settingPerformance from "../../setting/container/performances";

import schoolReducer, {
  key as schoolKey,
  init as schoolInit,
} from "../school/containers/reducer";
import schoolPerformance from "../school/containers/performances";
import * as schoolAccesses from "../school/containers/accesses";

import classeReducer, {
  key as classeKey,
  init as classeInit,
} from "../classe/containers/reducer";
import classePerformance from "../classe/containers/performances";
import * as classeAccesses from "../classe/containers/accesses";

import wishedReducer, {
  key as wishedKey,
  init as wishedInit,
} from "../wished/containers/reducer";
import wishedPerformance from "../wished/containers/performances";
import * as wishedAccesses from "../wished/containers/accesses";

import cityReducer, {
  key as cityKey,
  init as cityInit,
} from "../city/containers/reducer";
import cityPerformance from "../city/containers/performances";
import * as cityAccesses from "../city/containers/accesses";

const HomeProvider = (props) => {
  const rootContext = React.useContext(RootContext);
  const auth = React.useMemo(() => rootContext.auth, [rootContext.auth]);
  const user = React.useMemo(() => rootContext.user, [rootContext.user]);
  const alert = React.useMemo(() => rootContext.alert, [rootContext.alert]);
  // const school = React.useMemo(() => rootContext.school, [rootContext.school]);

  // initial rootstate

  const initialValue = {
    [ProductKey]: ProductInit,
    [orderKey]: orderInit,
    [LayoutKey]: LayoutInit,
    [managerKey]: managerInit,
    [wooCategoryKey]: wooCategoryInit,
    [settingKey]: settingInit,
    [schoolKey]: schoolInit,
    [classeKey]: classeInit,
    [wishedKey]: wishedInit,
    [cityKey]: cityInit,
    permission: {
      accesses: {
        ...managerAccesses,
        ...productAccesses,
        ...orderAccesses,
        ...wooCategoryAccesses,
        ...schoolAccesses,
        ...classeAccesses,
        ...wishedAccesses,
        ...cityAccesses,
      },
    },
  };

  // root reducer
  const rootReducer = combineReducer({
    [ProductKey]: ProductReducer,
    [orderKey]: orderReducer,
    [LayoutKey]: LayoutReducer,
    [managerKey]: managerReducer,
    [wooCategoryKey]: wooCategoryReducer,
    [settingKey]: settingReducer,
    [schoolKey]: schoolReducer,
    [classeKey]: classeReducer,
    [wishedKey]: wishedReducer,
    [cityKey]: cityReducer,
  });

  // root state and dispatch
  const [state, dispatch] = useReducer(
    rootReducer,
    initialValue,
    (state) => state,
    "adminState"
  );

  // state with dispacth actions

  let initial = {
    ...state,
  };

  initial = performContextInitial(state, dispatch, initial, [
    {
      key: wooCategoryKey,
      Performance: wooCategoryPerformance,
      auth: auth.isAuthenticatedUser,
    },
    {
      key: managerKey,
      Performance: managerPerformances,
      auth: auth.isAuthenticatedUser,
    },
    {
      key: ProductKey,
      Performance: ProductPerformance,
      auth: auth.isAuthenticatedUser,
    },
    {
      key: orderKey,
      Performance: orderPerformance,
      auth: auth.isAuthenticatedUser,
    },
    {
      key: settingKey,
      Performance: settingPerformance,
      auth: auth.isAuthenticatedUser,
    },

    {
      key: schoolKey,
      Performance: schoolPerformance,
      auth: auth.isAuthenticatedUser,
    },
    {
      key: classeKey,
      Performance: classePerformance,
      auth: auth.isAuthenticatedUser,
    },
    {
      key: wishedKey,
      Performance: wishedPerformance,
      auth: auth.isAuthenticatedUser,
    },
    {
      key: cityKey,
      Performance: cityPerformance,
      auth: auth.isAuthenticatedUser,
    },

    { key: LayoutKey, Performance: LayoutPerformance },
  ]);

  const { initialize: initializeSetting } = initial.setting;
  const { initialize: initSchoolsList } = initial.school;

  const { isAuthenticatedUser } = auth;

  React.useEffect(() => {
    if (isAuthenticatedUser) initializeSetting(isAuthenticatedUser);
    initSchoolsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticatedUser]);

  return (
    <MainContext.Provider
      displayName="adminState"
      value={{ ...initial, auth, user, alert }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default HomeProvider;
