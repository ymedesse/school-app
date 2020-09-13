import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import CheckIcon from "@material-ui/icons/Check";

import SuspensePaper from "../../../components/SuspensePaper";
import SubmitButton from "../../../components/SimpleSubmitButton";
import { SimpleTextField } from "../../../components/TextFieldMUI";
import SelectorFieldMui from "../../../admin/classe/components/Selector/SelectorFieldMui";
import { FULL_FORM } from "./constants";

const ListeImages = React.lazy(() => import("./images"));

const Form = ({ formType, values, classes = {} }) => {
  const isNew = values.liste._id === undefined;
  return (
    <>
      {formType === FULL_FORM && (
        <Paper
          square
          variant="outlined"
          style={{ padding: "8px", marginBottom: "16px" }}
        >
          <SimpleTextField
            placeholder="contact 1 , contact 2 , ..."
            label="Contact"
            helperText="Numéros de téléphones par les quelles nous pouvons vous joindre"
            required={true}
            fullWidth
            name="phone"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ContactPhoneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      )}

      <SimpleTextField
        placeholder="Nom de l'école"
        className={classes.textField}
        name="liste.school"
        label="Nom de l'école"
      />

      <SelectorFieldMui
        name="liste.classe"
        variant="outlined"
        fullWidth={true}
        placeholder="Choisissez une classe"
        selectedValues={values.liste.classe}
        isNew={isNew}
      />

      <SimpleTextField
        placeholder="Contacts de l'école"
        required={true}
        fullWidth
        name="liste.phone"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneAndroidIcon />
            </InputAdornment>
          ),
        }}
      />

      <SimpleTextField
        placeholder="Ville, quartier, rue etc..."
        label="Adresse de l'école"
        required={true}
        fullWidth
        name="liste.address"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeIcon />
            </InputAdornment>
          ),
        }}
      />

      <div style={{ marginBottom: "16px" }} />

      <SuspensePaper>
        <ListeImages classes={classes} ligthForm={true} />
      </SuspensePaper>

      <SubmitButton fullWidth={true} icon={<CheckIcon />} label="Valider" />
    </>
  );
};

export default Form;
