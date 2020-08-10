import React from "react";
import {
  SimpleTextField,
  PriceTextField,
  NumberTextField,
  PriceSimpleTextField,
} from "../../../../components/TextFieldMUI";
import Grid from "@material-ui/core/Grid";
import { FormSpy } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import InputAdornment from "@material-ui/core/InputAdornment";
import Divider from "@material-ui/core/Divider";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import Checkboxes from "../../../../components/CheckBoxLineMui";
import SimpleSelctor from "../../../../components/SimpleSelectorMUI";

import { TitleTypography } from "../../../../components/Typography";
import SuspensePaper from "../../../../components/SuspensePaper";

const ProductImages = React.lazy(() => import("../images/ProductImages"));
const Form = ({ classes = {}, form, ...props }) => {
  return (
    <>
      <Grid container item sm={6} xs={12}>
        <SuspensePaper>
          <SimpleTextField
            placeholder="Libeller"
            className={classes.textField}
            name="name"
            label="Libeller"
          />

          <SimpleTextField
            placeholder="Description"
            className={classes.textField}
            name="description"
            label="Description"
          />
        </SuspensePaper>
        {/* <SuspensePaper>
          <FormSpy subscription={{ values: true }}>
            {({ values }) => {
              return (
                <CatgoriesFields
                  classes={classes}
                  className={classes.TextField}
                  sourceCategories={categories}
                  selectedValues={values.categories || []}
                />
              );
            }}
          </FormSpy>
        </SuspensePaper> */}
        <SuspensePaper>
          <ProductImages classes={classes} ligthForm={true} />
            
        </SuspensePaper>
      </Grid>

      <Grid container item xs={12} sm={5}>
        <SuspensePaper>
          <TitleTypography>Tarification</TitleTypography>
          <Divider />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <PriceTextField
                placeholder="Prix"
                className={classes.textField}
                name="price"
                label="Prix"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <PriceTextField
                placeholder="Prix de vente"
                className={classes.textField}
                name="sale_price"
                label="Prix de vente"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <PriceSimpleTextField
                placeholder="Prix pour commander"
                className={classes.textField}
                name="order_price"
                label="Prix pour commander"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberTextField
                className={classes.textField}
                name="tva"
                label="Tva"
                helperText="Tva"
                type="number"
              />
            </Grid>

            <Grid item xs={12}>
              <Checkboxes name="featured" label="Mettre en avant" />
            </Grid>

            <Grid item xs={12} sm={12}>
              <FormSpy subscription={{ values: true }}>
                {({ values }) => (
                  <SimpleSelctor
                    labelId={values.status}
                    classes={classes}
                    name="status"
                    values={["draft", "pending", "private", "publish"]}
                    label="Status"
                    helper="status"
                  />
                )}
              </FormSpy>
            </Grid>
          </Grid>
        </SuspensePaper>

        <SuspensePaper>
          <TitleTypography>Stockage</TitleTypography>
          <Divider />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <SimpleTextField
                placeholder="SKU, Isbn .... "
                className={classes.textField}
                name="isbn"
                label="isbn"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ViewWeekIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <NumberTextField
                className={classes.textField}
                name="stock"
                label="Stock"
                helperText="Stock, si vide donc stock infini"
                type="number"
              />
            </Grid>
          </Grid>
        </SuspensePaper>
        <OnChange name="price">
          {(newVal, oldVal) => {
            form.change("sale_price", newVal);
          }}
        </OnChange>
      </Grid>
    </>
  );
};

export default React.memo(Form);
