import React from "react";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
// import EditIcon from "@material-ui/icons/Edit";
import IconButtonMedia from "../../../../../components/IconButtonMedia";
import ListSkeleton from "../../../../../components/ListSkeleton";
import ReceiptIcon from "@material-ui/icons/Receipt";

import {
  ValueText,
  LabelText,
} from "../../../../../components/LabelValueTypography";
import { TitleTypography } from "../../../../../components/Typography";
import SuspensePaper from "../../../../../components/SuspensePaper";
import {
  ACTION_SUBMIT_PAYMENTS,
  ACTION_VIEW_PAYMENTS_RESUME,
  ACTION_VIEW_PAYMENTS_LIST,
} from "../../../container/accesses";
const PaymentsList = React.lazy(() =>
  import("../../../../../order/InstallmentsPayment/history")
);

const Payments = ({
  value,
  handleUpdateStatus = () => {},
  checkPermission,
  getPaymentsListUrl,
  getFetcher,
  ...props
}) => {
  const history = useHistory();
  const [view, setView] = React.useState(false);
  const { id, payment, amountPaid = 0, leftToPay } = value;

  const labelView = () => (view ? "cacher" : "Visualiser");
  const allow_submitPayments = checkPermission(ACTION_SUBMIT_PAYMENTS);
  const allow_viewPaimentsResume = checkPermission(ACTION_VIEW_PAYMENTS_RESUME);
  const allow_viewPaimentsList = checkPermission(ACTION_VIEW_PAYMENTS_LIST);
  const count = (payment || []).length;

  return (
    <SuspensePaper>
      <Box display="flex" alignItems="center" width="100%">
        <Box mt={1} mr={1}>
          <ReceiptIcon />
        </Box>

        <Box flexGrow={1}>
          <TitleTypography style={{ display: "inline" }}>
            Paiements
          </TitleTypography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" width="100%">
        {allow_viewPaimentsResume && (
          <Box width="100%" display="flex">
            <Box flexGrow={1}>
              <LabelText>Montant payé : </LabelText>
              <ValueText>{` ${amountPaid} f`}</ValueText>
            </Box>
            {leftToPay > 0 && (
              <>
                <LabelText>Reste : </LabelText>
                <ValueText color="secondary">{` ${leftToPay} fcfa`}</ValueText>
              </>
            )}
          </Box>
        )}
        {allow_submitPayments && (
          <Box>
            {/* <IconButtonMedia
              icon={<EditIcon color="primary" />}
              onClick={handleUpdateStatus}
              textButtonProps={{ label: "Modifier" }}
            /> */}
          </Box>
        )}
      </Box>

      <Box display="flex" alignItems="center" width="100%">
        <Box flexGrow={1}>
          <ValueText>{`${count} paiement${pluriel(count)} au total`}</ValueText>
        </Box>
        {allow_viewPaimentsList && (
          <Box>
            <IconButtonMedia
              icon={view ? <VisibilityOffIcon /> : <VisibilityIcon />}
              onClick={() => setView(!view)}
              textButtonProps={{ label: labelView() }}
            />
          </Box>
        )}
      </Box>
      {allow_viewPaimentsList && view && (
        <React.Suspense fallback={<ListSkeleton count={6} />}>
          <PaymentsList
            id={id}
            inAdminMode={true}
            getPaymentsListUrl={getPaymentsListUrl}
            getFetcher={getFetcher}
            history={history}
            order={value}
            showTitle="Produits"
          />
        </React.Suspense>
      )}
    </SuspensePaper>
  );
};

const pluriel = (count) => {
  return count > 1 ? "s" : "";
};

export default React.memo(Payments);
