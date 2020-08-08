import actions from "./actions";
import { getSettings } from "./api";
const performances = (dispatch, auth) => {
  const initialize = (isAuthenticatedUser) => {
    const { user, token } = isAuthenticatedUser;
    getSettings(user._id, token).then((data) => {
      if (data && !data.error) dispatch(actions.setSettings(data));
    });
  };

  return { initialize };
};

export default performances;
