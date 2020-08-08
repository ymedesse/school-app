import React from "react";
import context from "../context/AdminContext";
import LinearProgress from "@material-ui/core/LinearProgress";

// import CategoryForm from "./components/CategoryForm"

const List = React.lazy(() => import("./components/User"));
const Manager = ({ ...props }) => {
  const {
    getFetcher,
    getUsersListUrl,
    updateRole,
    removeUsers,
    getUserInfoUrl,
    
  } = React.useContext(context).manager;

  const fetcher = getFetcher();
  const url = getUsersListUrl();

  return (
    <>
      <React.Suspense fallback={<LinearProgress />}>
        <List
          fetcher={fetcher}
          url={url}
          removeUsers={removeUsers}
          updateRole={updateRole}
          getUserInfoUrl={getUserInfoUrl}
          {...props}
        />
      </React.Suspense>
    </>
  );
};

export default Manager;
