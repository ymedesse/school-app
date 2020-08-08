import * as type from "./constants";
const actions = {
  setCurrentViewTitleAction: payload => ({
    type: type.SET_CURRENT_VIEWER_TITLE,
    payload
  }),
  setCurrentViewActionAction: payload => ({
    type: type.SET_CURRENT_VIEWER_ACTION,
    payload
  }),
  initializeViewerAction: payload => ({
    type: type.INITIALIZE_VIEWER,
    payload
  }),
  initializeViewerContentsAction: payload => ({
    type: type.INITIALIZE_VIEWER_CONTENTS,
    payload
  }),
  setCurrentStateActions: payload => ({
    type: type.SET_CURRENT_STATE,
    payload
  }),
  addNextComponentAction: payload => ({
    type: type.ADD_NEXT_COMPONENT,
    payload
  }),
  previousAction: payload => ({
    type: type.PREVIOUS,
    payload
  }),
  viewHandleChangeAction: payload => ({
    type: type.VIEW_HANDLE_CHANGE,
    payload
  }),
  setCurrentViewTitleAndActionAction: payload => ({
    type: type.SET_CURRENT_VIEWER_TITLE_ACTION,
    payload
  }),
};









export default actions;
