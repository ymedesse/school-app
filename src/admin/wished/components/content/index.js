import React from "react";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ListSkeleton from "../../../../components/ListSkeleton";


const Form = React.lazy(() => import("./Form"));

const Content = ({
  submit,
  nextStep,
  values = {},
  id,
  isNew = id === undefined,
}) => {
  // const onSubmit = async (values, form, complete) => {
  //   // submit &&
  //   //   submit({ ...values }, () => {
  //   //     nextStep(values);
  //   //   });
  // };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <React.Suspense fallback={<ListSkeleton count={5} />}>
        <Form values={values} />
      </React.Suspense>

      <Divider />
      <Divider />
      <Divider />

      {/* <Debug /> */}
    </Grid>
  );
};


const isEqual = (prev, next) => {
  return JSON.stringify(prev.values) === JSON.stringify(next.values);
};

export default React.memo(Content, isEqual);
