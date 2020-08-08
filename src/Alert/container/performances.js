import actions from "./actions";

const adressPerformances = (dispatch) => {
  const setError = (data) => {
    dispatch(actions.setErrorAction({ error: data }));
  };

  const setSuccess = (data) => {
    dispatch(actions.setSucessAction({ success: data }));
  };

  const initialize = (data) => {
    dispatch(actions.initializeAction({}));
  };

  const performErrorAlert = (error) => {
    const type = typeof error;
    error && type === "string" && setError(error);
    error &&
      type !== "string" &&
      setError("une erreur s'est produite") &&
      console.log({ error });
  };

  return { setError, setSuccess, initialize, performErrorAlert };
};

export default adressPerformances;
