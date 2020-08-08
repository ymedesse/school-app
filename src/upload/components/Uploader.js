import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import useSWR, { mutate, trigger } from "swr";
import context from "../../rootContext/context";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import CustomDialog from "../../components/Dialog";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FileListe from "./FileListe";
import { LIST_FIlES_URL } from "../containers/constants";
import {
  // showLoading,
  Notifications,
} from "../../components/ShowApiNotification";

import { TitleTypography } from "../../components/assets";
import ImageForm from "./ImageForm";
import Dropzone from "./Dropzone";

import { removeArrayFromArray } from "../../utils";
export default function Uploader({ closeDialog, dialog = false, onSubmit }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const rootContext = useContext(context);

  const { user } = rootContext.auth.isAuthenticatedUser;

  const {
    fetchWithTooken,
    removeFile,
    removeMany,
    updateFiles,
  } = rootContext.upload;
  const list_url = LIST_FIlES_URL + user._id;
  const { data = [] } = useSWR(list_url, fetchWithTooken);

  const initNotification = {
    success: false,
    error: false,
  };

  const [values, setValues] = useState({
    ...initNotification,
    current: undefined,
    updating: false,
    checkedList: [],
    images: data,
  });

  const { checkedList, images } = values;
  const refreachCheckedItem = (f, check) => {
    const myFile = [...f];
    for (let i = 0; i < check.length; i++) {
      const element = check[i];
      const index = myFile.findIndex((item) => item.id === element.id);
      if (index !== -1) {
        myFile[index] = { ...check[i], ...myFile[index] };
      }
    }
    return myFile;
  };

  useEffect(() => {
    const { checkedList } = values;
    const images = [...refreachCheckedItem(data, checkedList)];
    let current = values.current;
    if (values.current && values.current.id) {
      current = data.filter((item) => item.id === values.current.id);
    }

    setValues({ ...values, current, images });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const classes = useStyles({ showMenu: checkedList.length > 0, mobile });

  const handleClick = (id) => {
    const copy = [...values.images];
    const s = copy.findIndex((item) => item.id === id);
    const m = copy[s];

    // // si c'est un mobile le click engendre automatiquement une selection
    // if (mobile) {
    //   const isChecked = m.isChecked;
    //   if (s > -1)
    //     images[s] = {
    //       ...m,
    //       isChecked: isChecked === undefined ? true : !isChecked
    //     };
    // }

    setValues({ ...values, current: { ...m } });
  };

  const handleChecked = (id) => (isChecked) => {
    const { images } = values;
    const i = images.findIndex((item) => item.id === id);
    if (i > -1) images[i] = { ...images[i], isChecked };

    setValues({
      ...values,
      checkedList: images.filter((item) => item.isChecked === true),
      images,
    });
  };

  const itemSelected = () => {
    return checkedList.length > 0
      ? checkedList
      : values.current
      ? [values.current]
      : [];
  };

  const handleUpdateFiles = (val, next) => {
    updateFiles(val, (res) => {
      next(res);
      if (!res.error) {
        setValues({
          ...values,
          checkedList: [],
          images: [...refreachCheckedItem(data, [])],
        });
      }
    });
  };

  const decline = () => {};

  const selected = itemSelected();

  const preHandleAction = (type) => async (files) => {
    const olou = removeArrayFromArray([...data], files);
    await mutate(list_url, olou, false);
  };

  const postHandleAction = (type) => (dat) => {
    switch (type) {
      case "new":
        trigger(list_url);
        break;
      case "remove":
        trigger(list_url);
        break;
      case "removeMany":
        trigger(list_url);
        break;
      default:
        break;
    }
  };

  const content = (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        <Dropzone
          setNotificationValues={setValues}
          notificationValues={values}
          initNotification={initNotification}
          postHandleAction={postHandleAction("new")}
          isDialogmode={true}
        />
        <FileListe
          removeFile={removeFile}
          removeMany={removeMany}
          preHandleAction={preHandleAction("removeMany")}
          postHandleAction={postHandleAction("removeMany")}
          images={images}
          setValues={setValues}
          values={values}
          initNotification={initNotification}
          handleClick={handleClick}
          handleChecked={handleChecked}
        />
      </Grid>

      <Grid item component={Box} hidden={mobile} sm={4}>
        <ImageForm
          files={selected}
          submit={handleUpdateFiles}
          handleDecline={decline}
          mobile={mobile}
        />
      </Grid>
    </Grid>
  );

  const selectedText = () => {
    const n = checkedList.length;
    return n > 1
      ? `${n} fichiers sélectionés `
      : n === 1
      ? `${n} fichier sélectioné `
      : "";
  };

  return (
    <>
      <Notifications
        notificationType="success"
        message={values.success}
        nextClose={() => setValues({ ...values, success: false })}
      />
      <Notifications
        notificationType="error"
        message={values.error}
        nextClose={() => setValues({ ...values, error: false })}
      />
      <CustomDialog
        title={"Fichiers"}
        content={content}
        actions={
          <Box display="flex" p={0} style={{ width: "100%" }}>
            <Box ml={2} flexGrow={1}>
              <TitleTypography>{selectedText()} </TitleTypography>{" "}
            </Box>

            <Box p={0} hidden={mobile}>
              <Button onClick={() => closeDialog()} color="primary">
                Annuler
              </Button>
            </Box>
            <Button
              variant="contained"
              size="small"
              disabled={selected.length === 0}
              onClick={() => onSubmit(selected)}
              color="primary"
              className={classes.button}
              autoFocus
            >
              Valider
            </Button>
          </Box>
        }
        actionDirection="flex-end"
        titleAlign="left"
        closeDialog={closeDialog}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(0, 1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  bottomMenu: {
    minHeight: "32px",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    width: "100%",
    position: "sticky",
    bottom: "2px",
    display: (props) => (props.showMenu ? "block" : "none"),
    //   boxShadow: `${theme.shadows[1]}`
  },
  menuButton: {
    margin: "5px",
  },
  actions: {
    justifyContent: "flex-end",
  },
}));
