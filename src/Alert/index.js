import React, { useContext } from "react";
import Notifier from "./Notifier";

import context from "../rootContext/context";

const Alert = () => {
  const rootContext = useContext(context);
  const { success, error, next: rootNext, initialize } = rootContext.alert;
  const m = rootContext.auth;
  const next = () => {
    rootNext && rootNext();
    initialize();
  };

  return (
    <>
      <Notifier
        notificationType="success"
        message={typeof success !== "object" ? success : "succès"}
        nextClose={next}
      />
      <Notifier
        notificationType="error"
        message={typeof error !== "object" ? error : "error"}
        nextClose={next}
      />
    </>
  );
};

export default React.memo(Alert, true);
