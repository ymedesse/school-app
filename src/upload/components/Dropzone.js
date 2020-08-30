import React, { useContext } from "react";
import ReactDrop from "./ReactDrop";
import context from "../../rootContext/context";

/**
 *
 * @param {Object} notificationValues Notification back state
 * @param {function} setNotificationValues Notification back setState
 * @param {Object} initNotification Notification state initial value
 * @param {function} postHandleAction Function allow to collect new uploaded file
 *
 */

export default function Dropzone({
  postHandleAction,
  isDialogmode,
  submitSelected,
  hideButton,
  dropLabelComponent
}) {
  const rootContext = useContext(context);

  const { uploadFile } = rootContext.upload;
  const { performErrorAlert, setSuccess } = rootContext.alert;

  const handleUpload = async (sFiles) => {
    const formData = new FormData();

    for (let i = 0; i < sFiles.length; i++) {
      formData.append("photo", sFiles[i]);
    }

    uploadFile(formData, async (data) => {
      if (data) {
        const { error } = data;
        error && performErrorAlert(error);
        if (!error) {
          if (postHandleAction) {
            await postHandleAction(data);
          }

          setSuccess(
            `${data.length} fichier${
              data.length > 1 ? "s" : ""
            } uplodés avec succès`
          );
        }
      }
    });
  };

  const handleReject = (sFiles) => {
    if (sFiles) {
      const message =
        sFiles.length > 1
          ? `les fichiers ${sFiles.map(
              (item) => `${item.name},`
            )} n'ont pas pu être uploder `
          : `le fichier ${sFiles[0].name} n'a pas pu être uploder `;
      performErrorAlert(message);
    }
  };

  return (
    <ReactDrop
      hideButton={hideButton}
      handleReject={handleReject}
      isDialogmode={isDialogmode}
      handleUpload={handleUpload}
      submitSelected={submitSelected}
      dropLabelComponent={dropLabelComponent}
    />
  );
}
