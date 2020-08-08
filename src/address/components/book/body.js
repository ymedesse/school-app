import React, { useState } from "react";
import PropTypes from "prop-types";
import DialogContent from "@material-ui/core/DialogContent";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddressListRow from "../AddressListRow";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";

const BodyBook = ({
  open,
  submit,
  addressId,
  getReadUrl,
  fetcher,
  ...other
}) => {
  const radioGroupRef = React.useRef(null);
  const classes = useStyles();
  const [state, setState] = useState({ current: addressId, addresses: [] });
  const { current, addresses } = state;

  const url = getReadUrl(addressId);

  const { data } = useSWR(() => addressId && url, fetcher, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    suspense: true,
  });

  React.useEffect(() => {
    if (data && !data.error) {
      setState((state) => ({ ...state, addresses: data }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressId]);

  const handleChange = async (event) => {
    await event.persist();
    const id = event.target.value;
    setState((state) => ({ ...state, current: id }));
  };

  const handleUpdate = (address) => {
    
    submit({ item:address, action: "update" });
  };

  return (
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
            updateAddress={() => handleUpdate(address)}
            classes={classes}
            addressId={addressId}
          />
        ))}
      </RadioGroup>
    </DialogContent>
  );
};

BodyBook.propTypes = {
  addressId: PropTypes.string,
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
    }) ===
    JSON.stringify({
      addresses: nextProps.addresses,
      addressId: nextProps.addressId,
    });
  return val;
};

export default React.memo(BodyBook, areEqual);

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
