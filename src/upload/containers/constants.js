import { API } from "../../config";
// redux actions
export const SET_FILES_LIST = "SET_FILES_LIST";
export const DATA_CHANGE = "DATA_CHANGE";
export const DATA_DELETE = "DATA_DELETE";
export const DATA_MANY_CHANGE = "DATA_MANY_CHANGE";
export const DATA_MANY_DELETE = "DATA_MANY_DELETE";

// events constants for admin
export const _FILE_CHANGE = "_fileChange";
export const _FILE_CREATE = "_filecreate";
export const _FILE_MANY_CREATE = "_filemanycreate";
export const _FILE_UPDATE = "_fileupdate";
export const _FILE_MANY_UPDATE = "_filemanyupdate";
export const _FILE_REMOVE = "_fileremove";
export const _FILE_MANY_REMOVE = "_filemanyremove";

// events constants for user and they is event operation
export const FILE_CHANGE = "fileChange";
export const FILE_CREATE = "filecreate";
export const FILE_MANY_CREATE = "filemanycreate";
export const FILE_UPDATE = "fileupdate";
export const FILE_MANY_UPDATE = "filemanyupdate";
export const FILE_REMOVE = "fileremove";
export const FILE_MANY_REMOVE = "filemanyremove";

// url
export const LIST_FIlES_URL = `${API}/files/`;
