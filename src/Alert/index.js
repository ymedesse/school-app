import React, { useContext } from "react";
import Notifier from "./Notifier";

import context from "../rootContext/context";

const Alert = () => {
  const rootContext = useContext(context);
  const {
    success,
    error,
    next: rootNext,
    initialize,
    message,
    title,
    action,
  } = rootContext.alert;
  const next = () => {
    rootNext && rootNext();
    initialize();
  };

  const notificationType = success ? "success" : error ? "error" : undefined;
  const myMessage = notificationType ? message : undefined;

  return (
    <>
      <Notifier
        notificationType={notificationType}
        message={myMessage}
        nextClose={next}
        title={title}
        action={action}
      />
    </>
  );
};

export default React.memo(Alert, true);
