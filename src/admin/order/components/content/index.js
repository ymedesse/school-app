import React from "react";
import ListSkeleton from "../../../../components/ListSkeleton";
import useSWR, { trigger } from "swr";
import { TitleTypography } from "../../../../components/Typography";

// import { CREATE_ACTION, UPDATE_ACTION } from "../../container/accesses";

const Form = React.lazy(() => import("./Form"));

const Content = ({
  fetcher,
  getReadUrl,
  value: initialData = {},
  id,
  updateStatus,
  getStatusListUrl,
  getPaymentsListUrl,
  checkPermission,
}) => {
  const url = getReadUrl(id);

  const { data } = useSWR(() => id && url, fetcher, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    suspense: true,
  });

  const error = !data ? true : data && data.error ? true : false;
  const showForm = () => {
    return (
      <React.Suspense fallback={<ListSkeleton count={5} />}>
        <Form
          value={data}
          updateStatus={updateStatus}
          fetcher={fetcher}
          getStatusListUrl={getStatusListUrl}
          refresh={() => trigger(url)}
          checkPermission={checkPermission}
          getPaymentsListUrl={getPaymentsListUrl}
        />
      </React.Suspense>
    );
  };
  return !error ? (
    showForm()
  ) : (
    <TitleTypography> Une erreur s'est produite</TitleTypography>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      initialData: prev ? prev.initialData : {},
    }) ===
    JSON.stringify({
      initialData: next.initialData,
    })
  );
};

export default React.memo(Content, isEqual);
