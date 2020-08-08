import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import UploaderDialog from "../../upload/components/UploaderDialog";
import { ButtonWithIcon } from "../../components/assets";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "12px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  textAlign: "center"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const DropZone = ({
  handleReject,
  submitSelected,
  handleUpload,
  isDialogmode = false
}) => {
  const bookButton = (
    <UploaderDialog
      submitSelected={submitSelected}
      actionButton={handleClickOpen => (
        <ButtonWithIcon
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PhotoLibraryIcon />}
        >
          Bibliothèque
        </ButtonWithIcon>
      )}
    />
  );

  const onDrop = (files, rejectedFiles) => {
    files.length > 0 && handleUpload(files);
    rejectedFiles.length > 0 && handleReject(rejectedFiles);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: "image/*", onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragAccept, isDragActive, isDragReject]
  );

  return (
    <div style={{ width: "100%", position: "relative" }} className="container">
      {!isDialogmode && (
        <div style={{ position: "absolute" }}>{bookButton}</div>
      )}
      <div {...getRootProps({ style })}>
        <ButtonWithIcon> Bibliothèque </ButtonWithIcon>
        <input {...getInputProps()} />
        <p>Glisser et déposer des images ici ou cliquer pour en ajouter</p>
      </div>
    </div>
  );
};

export default DropZone;
