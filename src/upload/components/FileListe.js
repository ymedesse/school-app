import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Image from "./Image";
import Grid from "@material-ui/core/Grid";
import { Slide } from "@material-ui/core";
import { removeArrayFromArray } from "../../utils";

import { DeleteFabButton } from "../../components/assets";

export default function FileListe({
  removeFile,
  removeMany,
  images,
  setValues,
  values,
  handleClick,
  handleChecked,
  preHandleAction,
  postHandleAction
}) {
  const { checkedList } = values;
  const classes = useStyles({ showMenu: checkedList.length > 0 });
  const fireRemovedFileToState = async (fs, { error, message }) => {
    error && setValues({ ...values, success: false, error });

    if (!error) {
      const { images, checkedList } = values;
      const olou = removeArrayFromArray([...images], fs);
      const checked = checkedList
        ? removeArrayFromArray([...checkedList], fs)
        : [];

      setValues &&
        setValues({
          ...values,
          images: olou,
          checkedList: checked,
          success: `${fs.length} fichiers supprimé${
            values.length > 1 ? "s" : ""
          } avec succès`,
          error: false
        });
    }
    postHandleAction && (await postHandleAction(fs));
  };

  const handleDelete = async id => {
    (await preHandleAction) && preHandleAction([id]);
    (await removeFile) &&
      removeFile(id, result => {
        fireRemovedFileToState([id], result);
      });
  };

  const checkIfCurrent = id => {
    return values.current ? values.current.id === id : false;
  };

  const handleDeleteChecked = async () => {
    const fs = checkedList.map(item => item.id);
    (await preHandleAction) && preHandleAction(fs);
    removeMany(fs, result => {
      fireRemovedFileToState(fs, result);
    });
  };

  const showImage = images => {
    return (
      <>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          {images.map((value, index) => {
            const isCurrent = checkIfCurrent(value.id);

            return (
              <Grid item key={value.id} sm={4}>
                <Image
                  key={value.id}
                  {...{ handleClick, handleChecked, value, handleDelete }}
                  isCurrent={isCurrent}
                />
              </Grid>
            );
          })}
        </Grid>

        <Slide
          direction="up"
          mountOnEnter
          unmountOnExit
          in={checkedList.length > 0}
        >
          <div className={classes.bottomMenu}>
            <DeleteFabButton
              onClick={handleDeleteChecked}
              className={classes.menuButton}
              size="small"
            />
          </div>
        </Slide>
      </>
    );
  };

  return (
    <Paper
      variant="outlined"
      square
      elevation={1}
      className={classes.imageList}
    >
      {showImage(images)}
    </Paper>
  );
}

const useStyles = makeStyles(theme => ({
  imageList: {
    //flexGrow: 1,
    textAlign: "center",
    position: "relative",
    height: "360px",
    maxHeight: "360px",
    overflowY: "auto"
  },

  bottomMenu: {
    minHeight: "32px",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    width: "100%",
    position: "sticky",
    bottom: "2px",
    display: props => (props.showMenu ? "block" : "none")
    //   boxShadow: `${theme.shadows[1]}`
  },
  menuButton: {
    margin: "5px"
  },
  actions: {
    justifyContent: "flex-end"
  }
}));
