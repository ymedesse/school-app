import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { Debug } from "mui-rff";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormValidator, {
  defaultSuscriptioin,
} from "../../../components/FormValidator";
import Suspenser from "../../../components/Suspenser";
import ValidationButton from "../../../components/ValidationButton";
import useSWR from "swr";
// import { readPostUrl } from "../container/urls";
import Skeleton from "@material-ui/lab/Skeleton";
import Form from "./content/vForm";
import FedBackdrop from "../../../components/FedBackdrop";

const ProductForm = ({
  submitProduct,
  setCurrentViewerTitleAndAction,
  newProduct = true,
  initialPost = initialValue,
  fetcher,
  id, //_id,
  nextStep,
  categories,
}) => {
  const [validateHandler, setValidateHandler] = useState({
    success: false,
    submiting: false,
    refreshing: false,
    post: { ...initialPost },
    url: "",
    refreshed: false,
  });

  const {
    success,
    submiting,
    refreshing,
    url,
    post,
    refreshed,
  } = validateHandler;

  const handleRefresh = () => {
    setValidateHandler({
      ...validateHandler,
      url: "",
      refreshing: true,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const { data, isValidating, error } = useSWR(url, fetcher, {
    // initialData: { post: initialPost },
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    // suspense: true,
    onSuccess: (data) => {
      setValidateHandler({
        ...validateHandler,
        post: JSON.parse(data.post),
        refreshing: false,
        refreshed: true,
      });
    },
  });

  const classes = useStyles();
  const onSubmit = async (values, form) => {
    setValidateHandler({ ...validateHandler, submiting: true, success: false });
    const modified = form.getState().modified;
    const operation = newProduct ? "create" : "update";
    const data = {};

    for (let [key, value] of Object.entries(modified)) {
      if (value) {
        data[key] = values[key];
      }
    }

    const formdData = {
      _id: post._id,
      value: {
        ...data,
        id: post.content.id,
        status: values.status,
        stock_status: values.stock_status,
        manage_stock: values.manage_stock,
      },
    };
    submitProduct &&
      submitProduct(operation, formdData, (data) => {
        setValidateHandler({
          ...validateHandler,
          submiting: false,
          success: true,
        });
        nextStep({ data, operation });
      });
  };

  const contents = ({
    form: {
      mutators: { push, pop },
    },
    form,
    submitting,
    pristine,
    handleSubmit,
    valid,
    dirty,
    modified,
    ...restProps
  }) => {
    return (
      <>
        <CssBaseline />
        <div
          style={{
            maxHeight: "80vh",
          }}
        >
          <Suspenser height={100}>
            <Form
              classes={classes}
              categories={categories}
              handleRefresh={handleRefresh}
              refreshed={refreshed}
            />
          </Suspenser>
          <ValidationButton
            form={form}
            submitting={submitting}
            valid={valid}
            pristine={pristine}
            rootStyle={classes.submitRow}
            classes={classes}
            modified={modified}
            submiting={submiting}
            handleRefresh={handleRefresh}
            success={success}
          />
        </div>
      </>
    );
  };

  return (
    <>
      {refreshing && <FedBackdrop />}
      <FormValidator
        onSubmit={onSubmit}
        initialValues={format(post ? post.content : initialValue.content)}
        subscription={{
          ...defaultSuscriptioin,
        }}
        // validate={React.useCallback(() => validation, [])}
        contents={contents}
      />
    </>
  );
};

const isEqual = (prev, next) => {
  return prev.id === next.id;
};

export default React.memo(ProductForm, isEqual);

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
  },
  textField: {
    // margin: theme.spacing(1, 0)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  actionButtonHelper: {
    padding: "10px 8px",
  },
  tabLigthRoot: {
    maxHeight: "300px",
    display: "inline-block",
    position: "relative",
  },
  submitRow: {
    // position: "fixed",
    bottom: 0,
    top: "auto",
    width: "100%",
    // zIndex: 1
  },
}));

const initialValue = {
  content: {
    sku: "",
    ugs: "",
    name: "",
    featured: false,
    short_description: "",
    description: "",
    manage_stock: true,
    stock_quantity: "",
    regular_price: "",
    categories: [],
    type: "",
    sale_price: "",
    status: "publish",
    stock_status: "instock",
  },
};

const format = (item) => {
  return {
    ...item,
    regular_price: parseInt(item.regular_price || "0"),
    sale_price: parseInt(item.sale_price || "0"),
    status:
      item.status === null || item.status === "" || !item.status
        ? "publish"
        : item.status,

    stock_status:
      item.stock_status === null ||
      item.stock_status === "" ||
      !item.stock_status
        ? "instock"
        : item.stock_status,

    manage_stock:
      item.manage_stock === null || item.manage_stock === ""
        ? true
        : item.manage_stock,
    ...item,
  };
};

export const SuspenseView = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rect" width={210} height={250} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rect" width={210} height={250} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rect" width={210} height={250} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rect" width={210} height={250} />
        </Grid>
      </Grid>
    </div>
  );
};
