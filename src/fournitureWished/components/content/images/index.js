import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { FormSpy } from "react-final-form";
import { API } from "../../../../config";
import { sleep } from "../../../../utils";
import Skeleton from "@material-ui/lab/Skeleton";
import { FieldArray } from "react-final-form-arrays";
import ProductImagesSlider from "./Slider";
import Dropzone from "../../../../upload/components/Dropzone";
import { LinkButton } from "../../../../components/LinkButton";
import { ValueText } from "../../../../components/LabelValueTypography";
import ImageViewer from "../../../../components/ImageViewer/";

const ListeImage = ({ classes, ligthForm = false }) => {
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

  const getImages = (fields) => {
    const { value = [] } = fields;
    const images = value.map((item) => ({
      src: API + "/photo/" + item,
      alt: item,
      downloadUrl: API + "/photo/" + item,
    }));
    return images;
  };

  return (
    <>
      <ValueText>Ajouter vos listes de fournitures en images</ValueText>
      <div style={{ marginTop: "16px" }} />
      <FormSpy subscription={{ values: true }}>
        {({ values }) => {
          return (
            <>
              <FieldArray name="liste.files">
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
                        dropLabelComponent={
                          <Button
                            color="primary"
                            startIcon={<CloudUploadIcon />}
                          >
                            {" "}
                            Téléverser ma liste
                          </Button>
                        }
                        hideButton={true}
                        postHandleAction={getNewFiles(fields)}
                        submitSelected={getNewFiles(fields)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ textAlign: "right" }}>
                        <ProductImagesSlider
                          fields={fields}
                          featuredImageField="liste.files"
                          loading={loading}
                        />

                        {fields.length > 0 && (
                          <>
                            {loading ? (
                              <Skeleton variant="text" width="50%" />
                            ) : (
                              <Box width="100%" display="flex">
                                <Box textAlign="left" flexGrow={1}>
                                  <ImageViewer images={getImages(fields)} />
                                </Box>
                                <Box alignSelf="center">
                                  <LinkButton
                                    className={classes.actionButtonHelper}
                                    onClick={() => handleClear(fields)}
                                  >
                                    <strong>Tout supprimer</strong>
                                  </LinkButton>
                                </Box>
                              </Box>
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

export default ListeImage;
