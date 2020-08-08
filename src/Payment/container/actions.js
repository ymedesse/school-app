

import * as type from "./constants";

const actions = {
    createNewOrderAction: payload => ({
    type: type.CREATE_NEW_ORDER,
    payload
  }),
};

export default actions;
