import { useGoogleLogout } from "react-google-login";

const clientId =
  "293291852258-5gqc781popuraabh8q797q533qvc62tk.apps.googleusercontent.com";

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
