import React from "react";
import FormValidator from "../../../../components/FormValidator";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ListSkeleton from "../../../../components/ListSkeleton";
import useSWR from "swr";
import validate from "./validations";
// import { CREATE_ACTION, UPDATE_ACTION } from "../../container/accesses";

// import { Debug } from "mui-rff";
const SubmitRow = React.lazy(() => import("./SubmitRow"));
const Form = React.lazy(() => import("./Form"));

const Content = ({
  fetcher,
  getReadUrl,
  submit,
  nextStep,
  value: initialData = {},
  id,
  isNew = id === undefined,
}) => {
  const url = getReadUrl(id);

  const { data = initialData } = useSWR(() => id && url, fetcher, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    initialData: initialData,
    suspense: true,
  });

  const onSubmit = async (values, form, complete) => {
    submit &&
      submit({ ...values }, () => {
        nextStep(values);
      });
  };

  const contents = ({ form, ...props }) => (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <React.Suspense fallback={<ListSkeleton count={5} />}>
        <Form form={form} />
      </React.Suspense>

      <Divider />
      <React.Suspense fallback={<ListSkeleton count={1} />}>
        <SubmitRow form={form} />
      </React.Suspense>
      {/* <Debug /> */}
    </Grid>
  );

  return (
    <>
      <FormValidator
        onSubmit={onSubmit}
        initialValues={data || defaultValue}
        subscription={{ pristine: true, submitting: true }}
        contents={contents}
        validate={validate}
      />
    </>
  );
};

const defaultValue = {
  slug: "",
  name: "",
  description: "",
  price: "",
  sale_price: "",
  order_price: "",
  stock: "",
  stock_ordered: "",
  usedStock: 0,
  status: "publish",
  type: "root",
  isbn: "",
  tva: 0,
  assets: {
    images: [],
  },
};

const isEqual = (prev, next) => {
  return JSON.stringify(prev.initialData) === JSON.stringify(next.initialData);
};

export default React.memo(Content, isEqual);
