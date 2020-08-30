import React from "react";
import ListSkeleton from "../../../components/ListSkeleton";
import { INSTALLMENT_PAYMENT_LINK } from "../../../routerLinks";

import BoundarySuspense from "../../../components/ErrorBoundarySuspense";
import compareProps from "../../../utils/compareProps";
import ConfirmationCancel from "../../../components/ConfirmationDialog";
// import { CREATE_ACTION, UPDATE_ACTION } from "../../container/accesses";

const Form = React.lazy(() => import("./Form"));

const Content = ({
  getFetcher,
  history,
  setCurrentOrder,
  getReadUrl,
  id,
  cancelOrder,
  performErrorAlert,
  setSuccess,
}) => {
  const url = getReadUrl(id);
  const fetcher = getFetcher();
  const [state, setState] = React.useState({
    nextFunc: () => {},
    openCancler: false,
  });
  const handlePay = (id) => (order) => {
    setCurrentOrder(order);
    history.push(INSTALLMENT_PAYMENT_LINK + "/" + id);
  };

  const { openCancler, nextFunc } = state;

  const onCancelStatus = (next) => {
    cancelOrder(id, (data) => {
      if (data) {
        const { error } = data;
        performErrorAlert(error);
        if (!error) {
          setSuccess("Commande annulée avec succès");

          nextFunc && nextFunc();
          handleCancel(false)();
        }
      }
    });
  };

  const handleCancel = (val = true) => (next) => {
    setState((state) => ({ ...state, openCancler: val, nextFunc: next }));
  };

  const showForm = () => {
    return (
      <>
        <BoundarySuspense fallback={<ListSkeleton count={5} />}>
          <Form
            fetcher={fetcher}
            url={url}
            handlePay={handlePay(id)}
            handleCancel={handleCancel(true)}
            history={history}
          />
        </BoundarySuspense>
        <ConfirmationCancel
          title="Annulation de commande"
          submit={() => onCancelStatus(handleCancel(false))}
          externalOpen={openCancler}
          setTExternalOpen={handleCancel(false)}
          contentText={"Êtes vous sur de vouloir annuler votre commande " + id}
        />
      </>
    );
  };
  return showForm();
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["id"]);
};

export default React.memo(Content, isEqual);
