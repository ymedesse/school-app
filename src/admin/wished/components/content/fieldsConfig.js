import { dateToText } from "../../../../utils";

export const infoConfig = [
  {
    label: "Nom",
    field: "nomAficher",
  },
  {
    label: "Contact",
    field: "phone",
  },
];

export const wishedConfig = [
  {
    label: "Date",
    field: "updatedAt",
    formator: (v) => dateToText(v),
  },
  {
    label: "Ecole",
    field: "school",
  },
  {
    label: "Classe",
    field: "classe",
  },
  {
    label: "Adresse",
    field: "address",
  },
  {
    label: "Email",
    field: "mail",
  },
  {
    label: "Contact",
    field: "phone",
  },
];
