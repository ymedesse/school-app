import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddressListRow from "../AddressListRow";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const AddressesBook = ({
  open,
  onClose,
  addressId,
  addresses,
  getReadUrl,
  ...other
}) => {
  const [state, setState] = useState(addressId);
  const radioGroupRef = React.useRef(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const url = getReadUrl(addressId);

  const { data } = useSWR(() => addressId && url, fetcher, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    suspense: true,
  });

  React.useEffect(() => {
    if (!open) {
      setCurrent(addressId);
    }
  }, [addressId, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose({ id: current });
  };

  const handleNew = () => {
    onClose({ action: "new" });
  };

  const handleChange = (event) => {
    setCurrent(event.target.value);
  };

  const handleUpdate = (id) => {
    onClose({ id, action: "update" });
  };

  return (
    <Dialog
      fullWidth={true}
      onEntering={handleEntering}
      open={open}
      fullScreen={fullScreen}
      onClose={handleCancel}
      {...other}
    >
      <DialogTitle>Mon carnet d'adresses</DialogTitle>
      <DialogContent
        classes={{
          dividers: classes.dividers,
        }}
        dividers
      >
        <RadioGroup
          ref={radioGroupRef}
          name="ringtone"
          value={current}
          onChange={handleChange}
        >
          {addresses.map((address, index) => (
            <AddressRadioChoice
              address={address}
              key={index}
              updateAddress={() => handleUpdate(address._id)}
              classes={classes}
              addressId={addressId}
            />
          ))}
        </RadioGroup>
      </DialogContent>

      <DialogActions>
        {addressId && (
          <Button autoFocus onClick={handleNew} color="primary">
            Nouveau
          </Button>
        )}
        <Button
          disabled={current === undefined}
          variant="contained"
          onClick={handleOk}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddressesBook.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  addressId: PropTypes.string,
  addresses: PropTypes.array.isRequired,
};

const useStyles = makeStyles((theme) => ({
  dividers: {
    padding: theme.spacing(2, 1),
  },
  formControlLabelRoot: {
    marginRight: "0px",
  },
}));

const areEqual = (prevProps, nextProps) => {
  const val =
    JSON.stringify({
      addresses: prevProps.addresses,
      addressId: prevProps.addressId,
      open: prevProps.open,
    }) ===
    JSON.stringify({
      addresses: nextProps.addresses,
      addressId: nextProps.addressId,
      open: nextProps.open,
    });
  return val;
};

export default React.memo(AddressesBook, areEqual);

const AddressRadioChoice = React.memo(
  ({ address, updateAddress, classes, addressId }) => (
    <FormControlLabel
      value={address._id}
      key={address._id}
      control={<Radio />}
      defaultChecked={(addressId = address._id)}
      label={<AddressListRow address={address} handleUpdate={updateAddress} />}
      classes={{
        root: classes.formControlLabelRoot,
      }}
    />
  ),
  areEqualRadio
);
function areEqualRadio(prevProps, nextProps) {
  const val =
    JSON.stringify(prevProps.address) === JSON.stringify(nextProps.address);
  return val;
}
