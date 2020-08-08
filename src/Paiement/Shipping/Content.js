import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
// import MenuBookIcon from "@material-ui/icons/MenuBook";
import AddIcon from "@material-ui/icons/Add";
import { FormSpy } from "react-final-form";
import ListSkeleton from "../../components/ListSkeleton";
import IconButtonMedia from "../../components/IconButtonMedia";
import { ButtonWithIcon } from "../../components/Buttons";
import { SimpleTextField } from "../../components/TextFieldMUI";

const Description = React.lazy(() => import("./Description"));
const Form = React.lazy(() => import("../../address/components/content/Form"));

const CartList = ({ form, handleNew, handleReset }) => {
  // const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  const showFormulaire = (value) => {
    return (
      <React.Suspense fallback={<ListSkeleton count={3} />}>
        <Form isNew={value.address.isNew} field="remoteShipping.address" />
      </React.Suspense>
    );
  };

  const showFormulaireWitheditButton = (value) => (
    <Grid container item xs={12}>
      {showButton(false, true)}
      {showFormulaire(value)}
    </Grid>
  );

  const showFormulaireWithBookButton = (value) => (
    <Grid container xs={12} item>
      {showButton(true, false, true)}
      {showFormulaire(value)}
    </Grid>
  );

  const showButton = (showopenButton, showEditButton, showFormButton) => (
    <Box display="flex" width="100%">
      {/* <Box flexGrow={1}>{showopenButton && onPenBookButton}</Box> */}
      {showEditButton && <Box> {editButton} </Box>}
      {showFormButton && (
        <>
          <Box> {resetButton()}</Box> <Box flexGrow={1}> </Box>{" "}
          <Box> {newButton()} </Box>
        </>
      )}
    </Box>
  );

  const showDescription = (value) => (
    <React.Suspense fallback={<ListSkeleton count={3} />}>
      <Description shipping={value} />
    </React.Suspense>
  );

  const showDescriptionWithButtons = (value) => (
    <Grid container item xs={12}>
      {showButton(true, true)}
      {showDescription(value)}
    </Grid>
  );

  const showRemoteAddress = (value) => {
    if (value.edit) return showFormulaireWitheditButton(value);
    else return showDescriptionWithButtons(value);
  };

  const editButton = (
    <ButtonWithIcon
      variant="text"
      color="primary"
      startIcon={<EditIcon fontSize="large" color="primary" />}
      onClick={() => form.change("edit", true)}
      size="medium"
    >
      Modifier l'addresse de livraison
    </ButtonWithIcon>
  );

  const newButton = () => (
    <IconButtonMedia
      icon={<AddIcon color="primary" />}
      textButtonProps={{ label: "Nouveau" }}
      onClick={() => handleNew && handleNew(form)}
      size="medium"
    />
  );

  const resetButton = () => (
    <IconButtonMedia
      icon={<SettingsBackupRestoreIcon color="action" />}
      textButtonProps={{ label: "Rafraichir" }}
      onClick={() => handleReset && handleReset(form)}
      size="medium"
    />
  );

  // const editButton = (
  //   <IconButtonMedia
  //     icon={<EditIcon fontSize="large" color="action" />}
  //     textButtonProps={{ label: "Modifier votre addresse" }}
  //     onClick={() => form.change("edit", true)}
  //     size="medium"
  //   />
  // );

  // const onPenBookButton = (
  //   <ButtonWithIcon
  //     variant="text"
  //     color="primary"
  //     startIcon={<MenuBookIcon fontSize="large" color="primary" />}
  //     onClick={() => {
  //       setOpen((open) => true);
  //     }}
  //     size="medium"
  //   >
  //     Vos adresses livraisons
  //   </ButtonWithIcon>
  // );

  // const showAddressBook = () => <AddressBook />;

  const showContent = (values) => {
    const { localShipping, remoteShipping, edit } = values;
    if (values.local === true) return showDescription(localShipping);
    else if (values.remote === true) {
      return (
        <>
          {edit
            ? showFormulaireWithBookButton(remoteShipping)
            : showRemoteAddress(remoteShipping)}

          <SimpleTextField
            label={"Laissez une note"}
            name="note"
            placeholder={"Laissez une note"}
            variant="outlined"
          />
        </>
      );
    }
    return <div></div>;
  };

  return (
    <>
      <FormSpy subscription={{ values: true }}>
        {({ values }) => showContent(values)}
      </FormSpy>
    </>
  );
};

// const useStyles = makeStyles((theme) => ({}));
// export default React.memo(CartList);

export default CartList;

// const AddressBook = ({}) => <div> Book </div>;
