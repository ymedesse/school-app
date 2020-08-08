import React from "react";
import purple from "@material-ui/core/colors/purple";
import blueGrey from "@material-ui/core/colors/blueGrey";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import deepOrange from "@material-ui/core/colors/deepOrange";
import lime from "@material-ui/core/colors/lime";
import green from "@material-ui/core/colors/green";

const status = [
  { id: "processing", label: "En cours", color: orange[500] },
  { id: "pending", color: lime[500] },
  {
    "id": "shipped",
    "label": "Expédiée",
    "rank": 3,
    color: deepOrange[500],
  },
  {
    "id": "delivered",
    "label": "Livrée",
    "rank": 3,
    color: blue[900],
  },
  {
    "id": "refunded",
    "label": "Remboursée",
    "rank": 0,
    color: purple[500],
  },
  { id: "failed", label: "Echouée", color: blueGrey[300] },
  { id: "on-hold", label: "En attente", color: blueGrey[500] },
  { id: "completed", label: "Terminée", color: blue[900] },
  { id: "cancelled", label: "Annulé", color: deepOrange[500] },
  { id: "refunded", label: "Remboursé", color: purple[500] },
  {
    "id": "trash",
    "label": "Supprimée",
    "rank": 0,
  },
];

const localStatus = [
  {
    id: "pending",
    label: "En attente de préparation",
    rank: 0,
    color: "inherit",
  },
  {
    id: "preparation",
    color: purple[500],
    label: "En cours de préparation",
    rank: 1,
  },
  {
    id: "prepare",
    label: "Préparée",
    rank: 2,
    color: orange[500],
  },
  { id: "dispatch", label: "Expédiée", rank: 3, color: green[500] },
];

export const getStatusColor = (id) => {
  const m = status.find((item) => item.id === id);
  return m ? m.color : "inherit";
};
export const getLocalStatusColor = (id) => {
  const m = localStatus.find((item) => item.id === id);
  return m ? m.color : "inherit";
};

export { status, localStatus };
