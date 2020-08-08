import { dateToText } from "../../../utils";

export const infoConfig = [
  {
    label: "Date",
    field: "createdAt",
    formator: (v) => dateToText(v),
  },
  {
    label: "Nature",
    field: "type",
  },
  {
    label: "Montant total payé",
    field: "amountPaid",
    formator: (v) => `${v} Fcfa`,
  },
  {
    label: "Nombre de paiements effectués",
    field: "paymentsCount",
  },
];

export const shippingConfig = [
  {
    label: "Méthode",
    field: "method_title",
    formator: (v) => dateToText(v),
  },
  {
    label: "Frais de livraison",
    field: "total",
    formator: (v) => `${v} Fcfa`,
  },
  {
    label: "Adresse",
    field: "address",
  },
  {
    label: "Description",
    field: "description",
  },
  {
    label: "Contact",
    field: "phone",
  },

  {
    label: "Notes",
    field: "note",
  },
];
