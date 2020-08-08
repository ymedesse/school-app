import React from "react";
import FormValidator from "../../../../components/FormValidator";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListSkeleton from "../../../../components/ListSkeleton";
import { SimpleTextField } from "../../../../components/TextFieldMUI";
import useSWR from "swr";
import validate from "./validations";

// import { CREATE_ACTION, UPDATE_ACTION } from "../../container/accesses";

// import { Debug } from "mui-rff";
const SubmitRow = React.lazy(() => import("./SubmitRow"));
const FournituresContent = React.lazy(() => import("../listesContent"));
const SelectorFieldMui = React.lazy(() =>
  import("../../../classe/components/Selector/SelectorFieldMui")
);

const ListContent = ({
  fetcher,
  getReadListeContentUrl,
  submit,
  nextStep,
  value: initialData = {},
  setCurrentViewerTitleAndAction,
  id,
  isNew = id === undefined,
  school,
}) => {
  const url = getReadListeContentUrl(id);

  const { data } = useSWR(() => (id ? url : undefined), fetcher, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    suspense: true,
  });

  const resetRank = async (products) => {
    for (let i = 0; i < products.length; i++) {
      products[i].rank = i;
    }
    return products;
  };

  const onSubmit = async (values, form, complete) => {
    const { products } = values;
    const formatedProducts = await resetRank(products);
    submit &&
      submit({ ...values, products: formatedProducts }, () => {
        nextStep && nextStep(values);
      });
  };

  const showContentList = (form, values) => (
    <React.Suspense fallback={<ListSkeleton count={5} />}>
      <FournituresContent
        setCurrentViewerTitleAndAction={setCurrentViewerTitleAndAction}
        form={form}
        values={values}
      />
    </React.Suspense>
  );

  const contents = ({ form, values, ...props }) => {
    // const v = isNew ? {} : { selectedValues: values.classe };
    return (
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item container sm={4} xs={12}>
          <Grid item xs={12}>
            <React.Suspense fallback={<ListSkeleton count={1} />}>
              <SelectorFieldMui
                name="classe"
                variant="outlined"
                selectedValues={values.classe}
                isNew={isNew}
              />
            </React.Suspense>
          </Grid>
          <Grid item xs={12}>
            <SimpleTextField
              rows={7}
              multiline={true}
              name="comment"
              label="ommentaire"
            />
          </Grid>
        </Grid>

        <Grid item container sm={8} xs={12}>
          {showContentList(form, values)}
        </Grid>
        <Divider />
        <React.Suspense fallback={<ListSkeleton count={1} />}>
          <SubmitRow form={form} />
        </React.Suspense>
        {/* <Debug /> */}
      </Grid>
    );
  };

  const error = isNew ? false : !data ? true : data && data.error;

  return !error ? (
    <FormValidator
      onSubmit={onSubmit}
      initialValues={isNew ? getDefaultValue(school) : data}
      subscription={{ pristine: true, submitting: true, values: true }}
      contents={contents}
      // validate={validate}
    />
  ) : (
    <Typography>Une erreur s'est produite</Typography>
  );
};

const getDefaultValue = (school) => {
  return {
    school,
    status: "publish",
    comment: "",
    products: [],
  };
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify(prev !== null ? prev.value : {}) ===
    JSON.stringify(next.value)
  );
};

export default React.memo(ListContent, isEqual);
