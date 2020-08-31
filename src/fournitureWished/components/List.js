import { makeStyles } from "@material-ui/core/styles";
import React, { lazy, useState } from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { LabelText } from "../../components/LabelValueTypography";
import ListSkeleton from "../../components/ListSkeleton";
import compareProps from "../../utils/compareProps";
import { AddFabButton } from "../../components/Buttons";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import ContentDialog from "./content/BodyDialog";
import {
  UPDATE_LIST_ACTION,
  CREATE_List_ACTION,
} from "../containers/constants";

const Info = lazy(() => import("./info"));
const Row = lazy(() => import("./Row"));

const OrderList = ({
  data,
  handleSubmitListe,
  handleRemoveListe,
  handleUpdateInfo,
  handleSubmitInfo,
  performFullErrorAlert,
  performFullSuccessAlert,
  refresh,
  idField = "_id",
  ...restProps
}) => {
  const classes = useStyles();

  const [state, setState] = useState({
    current: "",
    editDialogOpener: false,
    deleteDialogOpener: false,
    action: "",
  });

  const { listes, ...infoData } = data;
  const { current, editDialogOpener, deleteDialogOpener, action } = state;

  /* action */

  const getItem = (id) => listes.find((item) => item[`${idField}`] === id);

  const handleEdit = (id) => {
    const item = getItem(id);
    if (item)
      setState((state) => ({
        ...state,
        current: item,
        editDialogOpener: true,
        action: UPDATE_LIST_ACTION,
      }));
  };

  const handleDelete = (id) => {
    const item = getItem(id);
    console.log({ id, item });
    if (item)
      setState((state) => ({
        ...state,
        current: item,
        deleteDialogOpener: true,
      }));
  };

  const rowRenderer = (item, index) => {
    const id = item ? item[`${idField}`] : undefined;
    const key = id !== undefined ? id : index;

    return (
      id !== undefined && (
        <React.Suspense key={key} fallback={<ListSkeleton count={1} />}>
          <Row
            key={index}
            index={index}
            value={item}
            id={id}
            handleRemove={() => handleDelete(id)}
            handleEdit={() => handleEdit(id)}
          />
        </React.Suspense>
      )
    );
  };

  const handleAdd = () => {
    setState((state) => ({
      ...state,
      current: undefined,
      editDialogOpener: true,
      action: CREATE_List_ACTION,
    }));
  };

  const handleCancleList = () => {
    handleRemoveListe(current, (data) => {
      setState((state) => ({
        ...state,
        current: undefined,
        deleteDialogOpener: false,
      }));
      refresh();
    });
  };

  const showContentDialog = () => (
    <ContentDialog
      refresh={refresh}
      externalOpen={editDialogOpener}
      setTExternalOpen={() =>
        setState((state) => ({ ...state, editDialogOpener: false }))
      }
      data={{ liste: current }}
      handleSubmitListe={handleSubmitListe}
      performFullErrorAlert={performFullErrorAlert}
      performFullSuccessAlert={performFullSuccessAlert}
      action={action}
    />
  );

  const showConfirmationButton = () => (
    <ConfirmationDialog
      title="Annulation de liste"
      submit={handleCancleList}
      externalOpen={deleteDialogOpener}
      setTExternalOpen={() =>
        setState((state) => ({ ...state, deleteDialogOpener: false }))
      }
      contentText="Êtes vous sur de vouloir supprimer cette listes?"
      cancelLabel="Non je ne veux pas"
      confirmationLabel="Oui je confirme"
    />
  );

  return (
    <>
      <Info
        data={infoData}
        handleSubmitInfo={handleSubmitInfo}
        performFullErrorAlert={performFullErrorAlert}
        performFullSuccessAlert={performFullSuccessAlert}
      />

      <div className={classes.margin} />
      <div className={classes.margin} />

      <Divider />

      {(listes || []).length > 0 ? (
        <List className={classes.contents}>
          {listes.filter((item) => item.status === "pending").map(rowRenderer)}
        </List>
      ) : (
        <LabelText style={{ padding: "8px" }}>
          Vous n'avez aucune liste suggérée
        </LabelText>
      )}

      <div className={classes.bottom}>
        <AddFabButton
          // fullWidth={false}
          onClick={handleAdd}
          // label="Ajouter"
          // icon={<AddIcon />}
        />
      </div>

      {editDialogOpener && showContentDialog()}
      {deleteDialogOpener && showConfirmationButton()}
    </>
  );
};

const isEqual = (prev, next) => {
  compareProps(prev, next, ["data"]);
};

export default React.memo(OrderList, isEqual);

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
  },
  margin: {
    marginBottom: theme.spacing(2),
  },
  appBar: {
    top: "auto",
    bottom: 0,
    position: "sticky",
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(2),
  },
  bottom: {
    width: "100%",
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
  paper: {
    padding: "16px",
    minHeight: "350px",
  },
  grow: {
    flexGrow: 1,
  },
  suspense: {},
}));
