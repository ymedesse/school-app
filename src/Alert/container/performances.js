import actions from "./actions";

const adressPerformances = (dispatch) => {
  const setError = (data) => {
    dispatch(actions.setErrorAction({ message: data }));
  };

  const setSuccess = (data) => {
    dispatch(actions.setSucessAction({ message: data }));
  };

  const setFullError = (data) => {
    dispatch(actions.setErrorAction(data));
  };

  const setFullSuccess = (data) => {
    dispatch(actions.setSucessAction(data));
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

  const performFullErrorAlert = (error, data) => {
    const type = typeof error;
    error && type === "string" && setFullError({ ...data, message: error });
    error &&
      type !== "string" &&
      setFullError({ ...data, message: "une erreur s'est produite" }) &&
      console.log({ error });
  };
  const performFullSuccessAlert = (
    message = "opération effectuée avec succès",
    data
  ) => {
    setFullSuccess({ ...data, message });
  };

  return {
    setError,
    setSuccess,
    initialize,
    performErrorAlert,
    setFullError,
    setFullSuccess,
    performFullErrorAlert,
    performFullSuccessAlert,
  };
};

export default adressPerformances;
