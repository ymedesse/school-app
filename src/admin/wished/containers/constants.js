import { API } from "../../../config";

export const LIST_URL = API + "/wisheds";

export const status = [
  { id: "processed", label: "Traitée" },
  { id: "pending", label: "En cours" },
  { id: "canceled", label: "Annulée" },
];
