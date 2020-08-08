import React, { useContext } from "react";
import context from "../rootContext/context";
import useSWR from "swr";

const UserInfoListner = () => {
  const {
    getUserInfoUrl,
    isAuthenticatedUser,
    getFetcher,
    setUserInfo,
  } = useContext(context).auth;

  const { data } = useSWR(
    getUserInfoUrl(isAuthenticatedUser),
    getFetcher(isAuthenticatedUser),
    {
      refreshInterval: 3000,
      dedupingInterval: 2000,
      suspense: false,
      revalidateOnFocus: true,
    }
  );

  React.useEffect(() => {
    setUserInfo(data, isAuthenticatedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <></>;
};

export default UserInfoListner;
