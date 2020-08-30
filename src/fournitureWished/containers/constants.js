import { API } from "../../config";

export const UPDATE_LIST_ACTION = "update_list_action";
export const CREATE_List_ACTION = "create_list_action";
export const LIST_URL = API + "/schools";
export const LIST_CLASSE_URL = `${API}/classes-by-school-id/`;
export const LIST_CLASSE_BY_SCHOOL_SLUG_URL = `${API}/classes-by-school-slug/`;
export const LIST_FOURNITURE_URL = `${API}/school-fournitures/`;
export const LIST_FOURNITURE_BY_SCHOOL_CLASSE = "/school-fournitures/";
