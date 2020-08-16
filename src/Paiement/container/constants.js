import { API } from "../../config";
export const CART = "cart";
export const COMMANDE = "commande";
export const SET_NEW_ORDER = "CREATE_NEW_ORDER";

export const SET_SHIPPING_RANGE = "SET_SHIPPING_RANGE";
export const READ_CART_URL = `${API}/cart/`;
export const LOCAL_SHIPPING = "local";
export const REMOTE_SHIPPING = "remote";
export const LOCAL_SHIPPING_TITLE = "Point de vente LBU";
export const REMOTE_SHIPPING_TITLE = "Chez vous";

export const MOMO_PAYMENT_WAY = "momo";
export const LOCAL_PAYMENT_WAY = "localPayment";
export const VIREMENT_PAYMENT_WAY = "bankTransfer";
export const MOMO_PAYMENT_WAY_TITLE = "Paiement par Mobile ( MoMo )";
export const LOCAL_PAYMENT_WAY_TITLE = "Paiement en espèces";
export const VIREMENT_PAYMENT_WAY_TITLE = "Paiement par virement bancaire";
