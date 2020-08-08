import actions from "./actions";

const performances = (dispatch) => {
  const setCurrentViewTitle = (title) => {
    dispatch(actions.setCurrentViewTitleAction(title));
  };

  const setCurrentViewAction = (action) => {
    dispatch(actions.setCurrentViewActionAction(action));
  };

  const initializeViewer = () => {
    dispatch(actions.initializeViewerAction({}));
  };

  const initializeViewerContents = (content, title) => {
    dispatch(actions.initializeViewerContentsAction({ content, title }));
  };

  const setCurrentState = (state) => {
    dispatch(actions.setCurrentStateActions(state));
  };

  const addNextComponent = (component, title, action) => {
    dispatch(actions.addNextComponentAction({ component, title, action }));
  };

  const previous = () => {
    dispatch(actions.previousAction(""));
  };

  const viewHandleChange = (component) => {
    dispatch(actions.viewHandleChangeAction(component));
  };

  const setCurrentViewerTitleAndAction = (title, action) => {
    dispatch(actions.setCurrentViewTitleAndActionAction({ title, action }));
  };

  return {
    setCurrentViewAction,
    setCurrentViewTitle,
    initializeViewer,
    setCurrentState,
    addNextComponent,
    previous,
    viewHandleChange,
    initializeViewerContents,
    setCurrentViewerTitleAndAction,
  };
};

export default performances;
