import React from "react";
import purple from "@material-ui/core/colors/purple";
import blueGrey from "@material-ui/core/colors/blueGrey";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import deepOrange from "@material-ui/core/colors/deepOrange";
import lime from "@material-ui/core/colors/lime";
import green from "@material-ui/core/colors/green";

const statusColor = [
  { id: "pending", color: lime[500] },
  { id: "processing", color: orange[500] },
  { id: "shipped", color: green[900] },
  { id: "delivered", color: blue[900] },
  { id: "cancelled", color: deepOrange[500] },
  { id: "refunded", color: purple[500] },
  { id: "failed", color: blueGrey[300] },
  { id: "local-pending", color: "inherit" },
  { id: "local-preparation", color: purple[500] },
  { id: "local-prepare", color: orange[500] },
];

export const getStatusColor = (id) => {
  const m = statusColor.find((item) => item.id === id);
  return m || {};
};

export const checkCancelable = (id) => {
  return id === "pending";
};
