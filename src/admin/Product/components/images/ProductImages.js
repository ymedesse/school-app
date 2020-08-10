import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { FormSpy } from "react-final-form";
import { TitleTypography } from "../../../../components/assets";
import { FieldArray } from "react-final-form-arrays";
import Dropzone from "../../../../upload/components/Dropzone";
import { LinkButton } from "../../../../components/LinkButton";
import Skeleton from "@material-ui/lab/Skeleton";
import { sleep } from "../../../../utils";
import ProductImagesSlider from "./ProductImagesSlider";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { SimpleTextField } from "../../../../components/TextFieldMUI";
import Divider from "@material-ui/core/Divider";

import IconButtonMedia from "../../../../components/IconButtonMedia";

const ProductImages = ({ classes, ligthForm = false }) => {
  const [loading, setLoading] = useState(false);

  const getNewFiles = (fields) => async (files) => {
    setLoading(true);
    const ids = files.map((item) => item.id);
    for (let i = 0; i < ids.length; i++) {
      fields.push(ids[i]);
    }

    await sleep(2000);
    setLoading(false);
  };

  const handleClear = async (fields) => {
    setLoading(true);
    for (let i = fields.length - 1; i > -1; i--) {
      fields.remove(i);
    }
    await sleep(2000);
    setLoading(false);
  };

  const checkUrls = (fields, values) => {
    const { urls } = values;
    let ids = urls ? urls.split(",") : [];
    ids = [...new Set(ids)];
    const vids = ids.map((item) => ({ id: item }));
    getNewFiles(fields)(vids);
  };

  const urlInput = (fields, values) => (
    <div style={{ display: "flex" }}>
      <SimpleTextField
        placeholder="Coller des url d'images séparés par des virgules (,("
        className={classes.textField}
        label="Url d'image"
        name="urls"
      />

      <IconButtonMedia
        icon={<SaveAltIcon />}
        onClick={() => checkUrls(fields, values)}
        textButtonProps={{ label: "Ok" }}
      />
    </div>
  );

  return (
    <>
      <TitleTypography>Images</TitleTypography>
      <FormSpy subscription={{ values: true }}>
        {({ values }) => {
          const { featuredImage } = values.assets || {};
          return (
            <>
              <FieldArray name="assets.images">
                {({ fields }) => (
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                  >
                    <Grid item xs={12}>
                      <Dropzone
                        // isDialogmode
                        postHandleAction={getNewFiles(fields)}
                        submitSelected={getNewFiles(fields)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ textAlign: "right" }}>
                        <ProductImagesSlider
                          fields={fields}
                          featuredImageField="assets.featuredImage"
                          featuredImage={featuredImage}
                          loading={loading}
                        />

                        {urlInput(fields, values)}
                        <Divider />

                        {fields.length > 0 && (
                          <>
                            {loading ? (
                              <Skeleton variant="text" width="50%" />
                            ) : (
                              <>
                                <LinkButton
                                  className={classes.actionButtonHelper}
                                  onClick={() => handleClear(fields)}
                                >
                                  <strong>Tout supprimer</strong>
                                </LinkButton>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                )}
              </FieldArray>
            </>
          );
        }}
      </FormSpy>
    </>
  );
};

export default ProductImages;
