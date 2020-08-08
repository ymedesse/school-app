import React from "react";
import CustomDialog from "../../../../components/Dialog";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Body from "./Info";
export default function Content({
  closeDialog,
  onSubmitRole,
  handlePrvious,
  dialog = false,
  onSubmit,
  roles,
  user,
}) {
  const action = (
    <Box display="flex" p={0} style={{ width: "100%" }}>
      <Box ml={2} flexGrow={1}></Box>
      <Box p={0}>
        <Button
          onClick={() => {
            dialog && closeDialog();
            handlePrvious && handlePrvious();
          }}
          color="primary"
        >
          Retour
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <CustomDialog
        title={"Information utilisateur"}
        content={<Body onSubmitRole={onSubmitRole} user={user} roles={roles} />}
        actions={action}
        closeDialog={dialog ? closeDialog : handlePrvious}
      />
    </>
  );
}
