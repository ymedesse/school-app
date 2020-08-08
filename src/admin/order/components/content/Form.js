import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import purple from "@material-ui/core/colors/purple";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListSkeleton from "../../../../components/ListSkeleton";
import { dateToText } from "../../../../utils";
import IconButtonMedia from "../../../../components/IconButtonMedia";
import StatusDialog from "../localStatus";
import UserPhoto from "../../../../components/Badge";
import {
  TitleTypography,
  LargeTypography,
} from "../../../../components/Typography";
import SuspensePaper from "../../../../components/SuspensePaper";
import {
  LabelText,
  ValueText,
} from "../../../../components/LabelValueTypography";

import {
  ACTION_UPDATE_STATUS,
  ACTION_VIEW_STATUS,
  ACTION_VIEW_ORDER_AMOUNT,
} from "../../container/accesses";

import {
  LOCAL_STATUS_UPDATE,
  STATUS_UPDATE,
  LOCAL_STATUS,
  STATUS,
} from "../../container/constants";

const Product = React.lazy(() => import("./product"));
const Payments = React.lazy(() => import("./payments"));

const Form = ({
  value,
  updateStatus,
  fetcher,
  getStatusListUrl,
  refresh,
  checkPermission,
  getPaymentsListUrl,
  ...props
}) => {
  const classes = useStyles();

  const allow_viewAmountStatus = checkPermission(ACTION_VIEW_ORDER_AMOUNT);
  const allow_viewStatus = checkPermission(ACTION_VIEW_STATUS);
  const allow_updateStatus = checkPermission(ACTION_UPDATE_STATUS);

  const [state, setState] = React.useState({
    statusOpen: false,
    localisation: false,
  });
  const { statusOpen, localisation } = state;

  const {
    _id,
    id,
    // date_created,
    completedDate,
    updatedAt,
    shipping,
    localStatus,
    status,
    user,
    customerData,
    totalAmount,
    leftToPay = 0,
    type,
    createdAt,
  } = value;

  const handleOpenStatusUpdater = (local) => {
    setState((state) => ({
      ...state,
      localisation: local,
      statusOpen: !statusOpen,
    }));
  };


  const getCurrentStatusToUpdate = () => {
    return localisation === STATUS_UPDATE ? status : localStatus;
  };

  const statusToUpdateType = () => {
    return localisation === STATUS_UPDATE ? STATUS : LOCAL_STATUS;
  };

  const statusOpener = () => (
    <StatusDialog
      submit={updateStatus(id, statusToUpdateType())}
      fetcher={fetcher}
      externalOpen={statusOpen}
      setTExternalOpen={(value) => {
        handleOpenStatusUpdater("");
        refresh();
      }}
      status={getCurrentStatusToUpdate()}
      getListUrl={() => getStatusListUrl(statusToUpdateType())}
      localisation={localisation}
    />
  );

  const showTitle = () => {
    return (
      <>
        {" "}
        <Box display="flex" alignItems="center" width="100%">
          <Box alignSelf="center" flexGrow={1}>
            <LargeTypography className={classes.inline}>
              {" "}
              {`Commande n° ${id || _id}`}{" "}
            </LargeTypography>
            <LabelText> {`( ${type} )`} </LabelText>
            {allow_viewStatus && (
              <ValueText
                className={classes.inline}
                style={{ color: status.color }}
              >
                {status.label}
              </ValueText>
            )}
          </Box>
          {allow_updateStatus && (
            <IconButtonMedia
              icon={<EditIcon fontSize="large" color="action" />}
              onClick={() => handleOpenStatusUpdater(STATUS_UPDATE)}
              textButtonProps={{ label: "Modifier l'état de la commande" }}
              size="medium"
            />
          )}
        </Box>
        <Grid container item>
          {allow_viewAmountStatus && (
            <Grid item sm={4} xs={6}>
              <TitleTypography className={classes.total}>
                <strong> {totalAmount} </strong> Fcfa
              </TitleTypography>

              {leftToPay > 0 && (
                <>
                  <LabelText> Dû </LabelText>
                  <ValueText color="secondary">{leftToPay} fcfa</ValueText>
                </>
              )}
            </Grid>
          )}

          <Grid item sm={4} xs={6}>
            <LabelText className={classes.inline}> Date : </LabelText>
            <ValueText variant="subtitle2">
              {dateToText(createdAt)} Fcfa
            </ValueText>
            <br />
            {completedDate && (
              <>
                <LabelText className={classes.inline}> Validée le </LabelText>
                <ValueText variant="subtitle2">
                  {dateToText(completedDate)} Fcfa
                </ValueText>
              </>
            )}
          </Grid>

          <Grid item sm={4} xs={12}>
            <LabelText className={classes.inline}> Modifiée le : </LabelText>
            <ValueText variant="subtitle2">
              {dateToText(updatedAt)} Fcfa
            </ValueText>
          </Grid>
        </Grid>
        {statusOpen && statusOpener()}
      </>
    );
  };

  const showCustomer = () => {
    const { firstName, lastName, email, phone, id } = user.firstName
      ? user
      : customerData;

    return (
      <SuspensePaper>
        <Box display="flex" alignItems="center" width="100%">
          <Box marginRight={2}>
            <UserPhoto
              user={customerData || shipping.address}
              large
              avatarProps={{ className: classes.purple }}
            />
            <Divider orientation="vertical" flexItem />
          </Box>

          <Box flexGrow={1}>
            <TitleTypography> {`Client #${id || _id}`} </TitleTypography>
            <Typography variant="subtitle2">
              {firstName} {lastName}
            </Typography>
            <Typography variant="subtitle2"> {email}</Typography>
          </Box>
        </Box>
        {phone && (
          <Box marginLeft="56px" display="block">
            <LabelText>Téléphone : </LabelText>
            <ValueText>{phone}</ValueText>
          </Box>
        )}
      </SuspensePaper>
    );
  };

  const showProduct = () => {
    return (
      <React.Suspense fallback={<ListSkeleton count={1} />}>
        <Product
          handleUpdateStatus={() =>
            handleOpenStatusUpdater(LOCAL_STATUS_UPDATE)
          }
          value={value}
          checkPermission={checkPermission}
        />
      </React.Suspense>
    );
  };

  const showPayments = () => {
    return (
      <React.Suspense fallback={<ListSkeleton count={1} />}>
        <Payments
          value={value}
          checkPermission={checkPermission}
          getPaymentsListUrl={getPaymentsListUrl}
          getFetcher={() => fetcher}
        />
      </React.Suspense>
    );
  };

  const showShipping = () => {
    const { method_title, address, total: shippingTotal, note } =
      shipping || {};

    const { firstName, lastName, description, phone, city, postal } = address;

    const addressText = `${firstName} ${lastName},   ${description}, ${postal} ${
      city && city.name
    }`;

    return (
      <SuspensePaper>
        <Box alignItems="center" display="flex" width="100%">
          <Box mt={1} mr={1}>
            <LocalShippingIcon />
          </Box>
          <Box flexGrow={1}>
            <TitleTypography className={classes.inline}>
              Livraison
            </TitleTypography>
          </Box>
        </Box>

        <Grid container>
          <Grid item xs={6}>
            <LabelText> Méthode : </LabelText>
            <ValueText> {method_title} </ValueText>
          </Grid>
          <Grid item xs={6}>
            <LabelText> Montant : </LabelText>
            <ValueText> {shippingTotal} </ValueText>
          </Grid>

          <Grid item xs={12}>
            <LabelText> Addresse : </LabelText>
            <ValueText> {addressText} </ValueText>
          </Grid>

          {phone && (
            <Grid item xs={12}>
              <LabelText> Téléphone : </LabelText>
              <ValueText> {phone} </ValueText>
            </Grid>
          )}

          {note && (
            <Grid item xs={12}>
              <LabelText> Note : </LabelText>
              <ValueText> {note} </ValueText>
            </Grid>
          )}
        </Grid>
      </SuspensePaper>
    );
  };

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      alignItems="flex-start"
      className={classes.root}
    >
      <CssBaseline />
      {showTitle()}
      <Grid container item sm={6} xs={12}>
        {showCustomer()}
        {showShipping()}
        {showPayments()}
      </Grid>
      <Grid container item sm={6} xs={12}>
        {showProduct()}
      </Grid>
    </Grid>
  );
};

export default React.memo(Form);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
  },
  inline: {
    display: "inline",
  },
  status: {
    color: "chocolate",
  },
  total: {
    color: purple[500],
  },
}));

// const showBilling = () => {
//   const {
//     firstName: b_first_name,
//     lastName: b_last_name,
//     postcode: b_postcode,
//     address_1: b_address_1,
//     address_2: b_address_2,
//     city: b_city,
//     state: b_state,
//     phone,
//     email: b_email,
//   } = billing;

//   const billing_name = b_first_name + b_last_name;
//   const billing_address = `${b_postcode}  ${b_address_1}  ${b_address_2}  ${b_city}  ${b_state}`;

//   return (
//     billing && (
//       <SuspensePaper>
//         <Box alignItems="center" display="flex" width="100%">
//           <Box mt={1} mr={1}>
//             <ReceiptIcon />
//           </Box>
//           <Box flexGrow={1}>
//             <TitleTypography className={classes.inline}>
//               Facturation{" "}
//             </TitleTypography>
//           </Box>
//         </Box>

//         <Grid container>
//           <Grid item xs={12}>
//             <LabelText> Nom : </LabelText>
//             <ValueText> {billing_name} </ValueText>
//           </Grid>

//           <Grid item xs={12}>
//             <LabelText> Addresse : </LabelText>
//             <ValueText> {billing_address} </ValueText>
//           </Grid>

//           <Grid item xs={12}>
//             <LabelText> Addresse messagerie: </LabelText>
//             <ValueText> {b_email} </ValueText>
//           </Grid>

//           <Grid item xs={12}>
//             <LabelText> Contact téléphonique: </LabelText>
//             <ValueText> {phone} </ValueText>
//           </Grid>
//         </Grid>
//       </SuspensePaper>
//     )
//   );
// };
