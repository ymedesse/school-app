import React, { useState, useEffect } from "react";

import { LargeTypography } from "../../components/assets";
import { makeStyles } from "@material-ui/core/styles";

import ShippingPanel from "../../address/ShippingPanel";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";

import EditIcon from "@material-ui/icons/Edit";
import { ButtonWithIcon } from "../../components/assets";
import ShippingMethodeItem from "../../address/components/AddressListRow";
import AdressForm from "../../address/components/AdressForm";

import AddressesBook from "../../address/components/book/AddressesBook";

const Shipping = ({
  auth,
  shipping,
  setShipping,
  setAddressValidateFunc,
  addresses
}) => {
  const classes = useStyles();
  const { user } = auth;

  // data for layout
  const [layoutValue, setLayoutValue] = useState(() => {
    return {
      expanded: false,
      radioValue: "",
      openBook: false
    };
  });

  // useEffect when address is swiping
  useEffect(() => {
    setLayoutValue({
      ...layoutValue,
      expanded: shipping.method,
      radioValue: shipping.method,
      openBook: false
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipping.address]);

  // effet when current methode change
  useEffect(() => {
    const method = layoutValue.expanded;
    const newField =
      method === "home" && !shipping.address ? { new: true } : {};
    setShipping({
      ...shipping,
      method,
      ...newField,
      price: method === "shop" ? 0 : 500
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutValue.expanded]);

  //===>Panel methods
  // handle for shipping method, when method is swipping
  const handleChange = panel => (event, isExpanded) => {
    setLayoutValue({
      ...layoutValue,
      expanded: panel,
      radioValue: panel
    });
  };
  
  
  // handle for open address book
  const handleOpenBook = () => {
    setLayoutValue({ ...layoutValue, openBook: true });
  };

  // handle for open address book
  const handleUpdateAddress = () => {
    setShipping({ ...shipping, new: true });
  };

  // handle when addressBook was closed
  const handleCloseBook = async bookProps => {
  
    const initialLayout = {
      ...layoutValue,
      openBook: false,
      expanded: shipping.method,
      radioValue: shipping.method
    };

    if (bookProps) {
      const { id, action } = bookProps;
      switch (action) {
        case "new":
          setShipping({ ...shipping, address: undefined, new: true });
          break;
        case "update":
          setLayoutValue({ ...layoutValue, openBook: false });
          setShipping({
            ...shipping,
            address: addresses.find(item => item._id === id),
            new: true
          });
          break;
        case undefined && id:
          setLayoutValue(initialLayout);
          setShipping({
            ...shipping,
            address: addresses.find(item => item._id === id)
          });

          break;
        default:
          setLayoutValue(initialLayout);
          break;
      }
    } else {
      setLayoutValue(initialLayout);
    }
  };

  // Button to open addressBook was closed
  const openAddressesButton = (
    <ButtonWithIcon
      color="primary"
      variant="text"
      onClick={handleOpenBook}
      icon={<EditIcon />}
    >
      Mon carnet d'adresse
    </ButtonWithIcon>
  );

  const updateAddressesButton = (
    <ButtonWithIcon
      color="primary"
      variant="text"
      onClick={handleUpdateAddress}
      icon={<EditIcon />}
    >
      Modifier
    </ButtonWithIcon>
  );

  // address form to create new address

  const setSubmitAddressHandle = ({ handleSubmit, values, valid, dirty }) => {
    // dirty permet de savoir si le formulaire de l'address à été modifier par rapport à l'initial
    const func = event =>
      new Promise(async (resolve, callback) => {
        await handleSubmit(event);
        valid && submitNewAddress(values, dirty);
        resolve(valid);
      });
    setAddressValidateFunc(func);
  };

  const addressForm = (
    <AdressForm
      sendLocalSubmit={setSubmitAddressHandle}
      address={shipping.address}
      customActionButon={openAddressesButton}
    />
  );

  const submitNewAddress = (value, dirty) => {
    setShipping({ ...shipping, address: value, dirty });
  };

  return (
    <div className={classes.root}>
      <LargeTypography>Je choisis mon mode de livraison </LargeTypography>
      <div className={classes.margin} />
      <div className={classes.margin} />
    
      <FormControl component="fieldset" className={classes.form}>
        <RadioGroup
          defaultValue={user.address && "home"}
          value={layoutValue.radioValue}
          name="customized-radios"
        >
          <ShippingPanel
            panelId="shop"
            expanded={layoutValue.expanded}
            handleChange={handleChange}
            panelSummaryName="En magasin"
            panelSummaryDetail="Dans 3 heures"
            panelSummaryRight="GRATUIT"
            panelContent={
              <ShippingMethodeItem
                address={shipping.storeAdress}
                //  handleUpdate={handleOpenBook}
              />
            }
          />

          {/* Livraison à domicile */}
          <ShippingPanel
            panelId="home"
            expanded={layoutValue.expanded}
            handleChange={handleChange}
            panelSummaryName="A domicile"
            panelSummaryDetail="Sous 1 à 2 jours ouvrés"
            panelSummaryRight={
              !shipping.address
                ? " à partir de CFA 500"
                : " à " + shipping.price
            }
            panelContent={
              <>
                {!shipping.address || shipping.new ? (
                  addressForm
                ) : (
                  <>
                    <ShippingMethodeItem
                      address={shipping.address}
                      cusTomisedAction={
                        <>
                          {openAddressesButton} {updateAddressesButton}
                        </>
                      }
                    />
                  </>
                )}
                <AddressesBook
                  id="addresses-book"
                  keepMounted
                  open={layoutValue.openBook}
                  onClose={handleCloseBook}
                  addressId={shipping.address && shipping.address._id}
                  addresses={addresses}
                />
              </>
            }
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Shipping;

/* <AdressForm address={shipping.address} handleSubmit={() => {}} /> */

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  margin: {
    marginBottom: theme.spacing(2)
  },
  form: {
    width: "100%"
  }
}));
