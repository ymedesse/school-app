import { useGoogleLogout } from "react-google-login";

const clientId =
  "707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com";

function useLogoutHooks() {
  const onLogoutSuccess = (res) => {};

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut: googleSignOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return googleSignOut;
}

export default useLogoutHooks;
