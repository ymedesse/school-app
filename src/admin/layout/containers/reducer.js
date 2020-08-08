import * as type from "./constants";

const key = "layout";
const initViewer = {
  currentState: {},
  index: 0,
  contents: [],
  viewerTitles: [],
  viewerActions: [],
};

const init = {
  currentViewerTitle: undefined,
  currentViewerAction: undefined,
  ...initViewer,
};

const reducer = (state, action) => {
  switch (action.type) {
    case type.SET_CURRENT_VIEWER_TITLE:
      state.viewerTitles[state.index] = action.payload;

      return {
        ...state,
        currentViewerTitle: action.payload,
      };
    case type.SET_CURRENT_VIEWER_ACTION:
      state.viewerActions[state.index] = action.payload;

      return {
        ...state,
        currentViewerAction: action.payload,
      };
    case type.SET_CURRENT_VIEWER_TITLE_ACTION:
      state.viewerActions[state.index] = action.payload.action;
      state.viewerTitles[state.index] = action.payload.title;

      return {
        ...state,
        currentViewerTitle: action.payload.title,
        currentViewerAction: action.payload.action,
      };
    case type.PREVIOUS:
      return {
        ...state,
        ...popViewer(state),
      };
    case type.VIEW_HANDLE_CHANGE:
      return {
        ...state,
        ...handleChangeIndex(action.payload, state),
      };
    case type.SET_CURRENT_STATE:
      return {
        ...state,
        currentState: action.payload,
      };
    case type.ADD_NEXT_COMPONENT: {
      const { component, title, actions } = action.payload;
      return {
        ...state,
        contents: [...state.contents, component],
        viewerTitles: title
          ? [...state.viewerTitles, title]
          : state.viewerTitles,
        viewerActions: actions
          ? [...state.viewerActions, actions]
          : state.viewerActions,

        currentViewerTitle: title ? title : state.currentViewerTitle,
        currentViewerAction: actions ? actions : state.currentViewerAction,
        index: state.index + 1,
      };
    }
    case type.INITIALIZE_VIEWER_CONTENTS:
      const { content, title: initTitle, action: initAction } = action.payload;

      return {
        ...state,
        ...initViewer,
        index: 0,
        contents: [content],
        viewerTitles: initTitle ? [initTitle] : [],
        viewerActions: initAction ? [initAction] : [],
        currentViewerTitle: initTitle,
        currentViewerAction: initAction,
      };
    case type.INITIALIZE_VIEWER:
      return {
        ...state,
        ...init,
      };

    default:
      return state;
  }
};

const popViewer = (state) => {
  const { contents, index, viewerTitles, viewerActions } = state;
  if (index > -1) {
    viewerTitles && viewerTitles.splice(index, 1);
    viewerActions && viewerActions.splice(index, 1);
    contents && contents.splice(index, 1);

    const popRslt = {
      contents,
      index: index - 1,
      currentViewerTitle: viewerTitles[index - 1],
      currentViewerAction: viewerActions[index - 1],
    };
    return popRslt;
  }
};

const handleChangeIndex = (position, state) => {
  const { index, contents } = state;
  if (position < index) {
    return popViewer({ index, contents });
  } else {
    return { index: position };
  }
};

export { key, init };
export default reducer;
