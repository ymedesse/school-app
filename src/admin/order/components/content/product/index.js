import React from "react";
import Box from "@material-ui/core/Box";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import EditIcon from "@material-ui/icons/Edit";
import IconButtonMedia from "../../../../../components/IconButtonMedia";
import ListSkeleton from "../../../../../components/ListSkeleton";
import { ValueText } from "../../../../../components/LabelValueTypography";
import { TitleTypography } from "../../../../../components/Typography";
import SuspensePaper from "../../../../../components/SuspensePaper";
import { getStatusColor } from "../../../container/utils";
import {
  ACTION_UPDATE_LOCAL_STATUS,
  ACTION_VIEW_LOCAL_STATUS,
  ACTION_VIEW_PORDUCT_ORDERED,
} from "../../../container/accesses";
const ProductsOdered = React.lazy(() =>
  import("../../../../../order/components/fournitureList")
);

const OrderProducts = ({
  value,
  handleUpdateStatus = () => {},
  checkPermission,
  ...props
}) => {
  const [view, setView] = React.useState(false);
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
    contents,
    payment,
    customerData,
    totalAmount,
    leftToPay = 0,
    notes,
    count,
    type,
    createdBy,
    createdAt,
  } = value;

  const labelView = () => (view ? "cacher" : "Visualiser");
  const allow_updateLocalStatus = checkPermission(ACTION_UPDATE_LOCAL_STATUS);
  const allow_viewLocalStatus = checkPermission(ACTION_VIEW_LOCAL_STATUS);
  const allow_viewProduct = checkPermission(ACTION_VIEW_PORDUCT_ORDERED);

  const color = getStatusColor(localStatus.id);
  return (
    <SuspensePaper>
      <Box display="flex" alignItems="center" width="100%">
        <Box flexGrow={1}>
          <TitleTypography style={{ display: "inline" }}>
            {" "}
            Produits{" "}
          </TitleTypography>
          {allow_viewLocalStatus && (
            <ValueText style={{ color, display: "inline" }}>
              {" "}
              {localStatus.label}{" "}
            </ValueText>
          )}{" "}
        </Box>
        {allow_updateLocalStatus && (
          <Box>
            <IconButtonMedia
              icon={<EditIcon color="primary" />}
              onClick={handleUpdateStatus}
              textButtonProps={{ label: "Modifier" }}
            />
          </Box>
        )}
      </Box>

      <Box display="flex" alignItems="center" width="100%">
        <Box flexGrow={1}>
          <ValueText>
            {count} produits commandé{pluriel(count)}
          </ValueText>
        </Box>
        {allow_viewProduct && (
          <Box>
            <IconButtonMedia
              icon={view ? <VisibilityOffIcon /> : <VisibilityIcon />}
              onClick={() => setView(!view)}
              textButtonProps={{ label: labelView() }}
            />
          </Box>
        )}
      </Box>
      {allow_viewProduct && view && (
        <React.Suspense fallback={<ListSkeleton count={6} />}>
          <ProductsOdered order={value} showTitle="Produits" />
        </React.Suspense>
      )}
    </SuspensePaper>
  );
};

const pluriel = (count) => {
  return count > 1 ? "s" : "";
};

export default React.memo(OrderProducts);
