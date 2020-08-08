import * as types from "./constants";

const init = {
  addresses: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_ADDRESSES:
      return { ...state, addresses: action.payload };
    case types.SET_IN_ADRESSES:
      return {
        ...state,
        addresses: [...performSetInAdress(state, action.payload)]
      };
    default:
      return state;
  }
};

const key = "address";
const socketEvent = ["addressChange"];
export { key, init, socketEvent };
export default reducer;

const performSetInAdress = (state, add) => {
  const index = state.addresses.findIndex(item => item._id === add._id);
  if (index === -1) {
    return [...state.addresses, { ...add }];
  } else {
    const all = [...state.addresses];
    all[index] = add;
    return all;
  }
};
