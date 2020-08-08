import React, { lazy, Suspense } from "react";
import useSWR, { trigger } from "swr";
import { TitleTypography } from "../../../../components/assets";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import tableIcons from "../tableIcons";
import LinearProgress from "@material-ui/core/LinearProgress";
import Skeleton from "@material-ui/lab/Skeleton";

const Badge = lazy(() => import("../../../../components/Badge"));
const Body = lazy(() => import("./Body"));

const UsersList = ({
  addNextComponent,
  setCurrentViewerTitleAndAction,
  previous,
  url,
  fetcher,
  removeUsers,
  updateRole,
  getUserInfoUrl,
  alertState: { setError, setSuccess },
  ...restProps
}) => {
  const classes = useStyles();
  const { data } = useSWR(url, fetcher, {
    refreshInterval: 2000,
    dedupingInterval: 500,
    suspense: true,
  });

  const error = !data ? "erreur requettage" : data.error ? data.error : false;
  const { results: users = [], count = 0, roles = [] } = !error ? data : {};

  const handleDelete = async (user) => {
    await removeUsers([user._id], ({ error, success }) => {
      trigger(url);
      error && setError(error);
      success && setSuccess(success);
    });
  };

  const handleSubmitRole = async (user, next) => {
    await updateRole(user, async ({ error, success }) => {
      error && setError(error);
      if (!error) {
        next && (await next());
        trigger(url);
        // setSuccess("Mise à jour effectuée avec succès");
      }
    });
  };

  error && setError(error);

  const handleClickNextStep = ({ data, operation }) => {
    previous();
    if (data) {
      const index = users.findIndex((v) => v._id === data._id);
      if (index !== -1) {
        users[index] = data;
        trigger(url);
      }
    }
  };

  const handleClick = (item) => {
    addNextComponent((ownState) => (
      <Suspense fallback={<LinearProgress />}>
        <Body
          {...ownState}
          user={item}
          setError={setError}
          submit={handleSubmitRole}
          fetcher={fetcher}
          getUserInfoUrl={getUserInfoUrl}
          nextStep={handleClickNextStep}
          roles={roles}
        />
      </Suspense>
    ));
  };

  const table = () => (
    <MaterialTable
      title="Utilisateurs"
      columns={initColumns}
      data={users}
      actions={[
        {
          icon: tableIcons.Edit,
          tooltip: "Modifier l'utilisateur",
          onClick: (event, rowData) => handleClick(rowData),
        },
        (rowData) => ({
          icon: tableIcons.Delete,
          tooltip: "Supprimer l'utilisateur",
          onClick: (event, rowData) => handleDelete(rowData),
          hidden: rowData.supUser === true,
        }),
      ]}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
      }}
      localization={{
        toolbar: {
          searchPlaceholder: "Nom, email etc ...",
        },
        pagination: {
          labelRowsSelect: "Selctions",
          labelDisplayedRows: " {from}-{to} xete {count}",
          firstTooltip: "Début",
          previousTooltip: "Précédent",
          nextTooltip: "Suivant",
          lastTooltip: "Fin",
        },
      }}
    />
  );

  return !error ? (
    <>
      <div className={classes.list}>
        {/* <CssBaseline /> */}
        {count > 0 ? (
          table()
        ) : (
          <TitleTypography> Aucun utilisateur trouvé</TitleTypography>
        )}
      </div>
      <div name="vous" className={classes.appBar}>
        <Fab
          size="medium"
          color="primary"
          aria-label="add"
          className={classes.fabButton}
          //  onClick={(e) => handleClick()}
        >
          <AddIcon />
        </Fab>
        <div className={classes.grow} />
      </div>
      <TitleTypography color="secondary" style={{ paddingLeft: "20px" }}>
        {count} produit{pluriel(count)} trouvé{pluriel(count)}{" "}
      </TitleTypography>
    </>
  ) : (
    <TitleTypography color="secondary">
      {" "}
      Une erreur s'est produite{" "}
    </TitleTypography>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({ url: prev !== null ? prev.url : "" }) ===
    JSON.stringify({ url: next.url })
  );
};

export default React.memo(UsersList, isEqual);

const useStyles = makeStyles((theme) => ({
  list: {
    flexGrow: 1,
    width: "100%",
    minHeight: "430px",
  },
  appBar: {
    top: "auto",
    bottom: 0,
    position: "sticky",
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  suspense: {},
}));

const pluriel = (count) => {
  return count > 1 ? "s" : "";
};

const initColumns = [
  {
    title: "Image",
    field: "photo",
    render: (rowData) => (
      <Suspense fallback={<Skeleton variant="circle" width={52} />}>
        <Badge user={rowData} />
      </Suspense>
    ),
  },
  { title: "Email", field: "email" },
  { title: "Nom affiché", field: "nomAfficher" },
  { title: "Numéro de téléphone", field: "phone", type: "numeric" },
  { title: "Dernière connexion", field: "lastActive", type: "datetime" },
  {
    title: "Nombre de connexion total",
    field: "connectCount",
    type: "numeric",
  },
  { title: "Privillège", field: "rolesLabel" },
];
