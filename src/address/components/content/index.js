import React from "react";
import FormValidator from "../../../../components/FormValidator";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ListSkeleton from "../../../../components/ListSkeleton";
import useSWR from "swr";
import validate from "./validations";
// import { Debug } from "mui-rff";
const SubmitRow = React.lazy(() => import("./SubmitRow"));
const Form = React.lazy(() => import("./Form"));

const AddressContent = ({
  fetcher,
  getReadUrl = () => null,
  submit,
  nextStep,
  initialData = {},
  exportState: sendState,
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

  const contents = ({
    form,
    submitting,
    pristine,
    handleSubmit,
    values,
    valid,
    submitSucceeded,
    dirty,
    ...props
  }) => {
    sendState({ handleSubmit, values, valid, submitSucceeded, dirty });

    return (
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <React.Suspense fallback={<ListSkeleton count={5} />}>
          <Form />
        </React.Suspense>

        <Divider />

        {submit && (
          <React.Suspense fallback={<ListSkeleton count={1} />}>
            <SubmitRow form={form} />
          </React.Suspense>
        )}

        {/* <Debug /> */}
      </Grid>
    );
  };

  return (
    <>
      <FormValidator
        onSubmit={onSubmit}
        initialValues={data || defaultValue}
        contents={contents}
        validate={validate}
      />
    </>
  );
};

const defaultValue = {
  firstName: "",
  lastName: "",
  description: "",
  phone: "",
  postal: "",
};

const isEqual = (prev, next) => {
  return JSON.stringify(prev.initialData) === JSON.stringify(next.initialData);
};

export default React.memo(AddressContent, isEqual);
