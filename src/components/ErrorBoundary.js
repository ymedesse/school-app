import React from "react";
import { LargeTypography } from "./Typography";

import Paper from "@material-ui/core/Paper";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  // const classes = useStyles();

  static getDerivedStateFromError(error) {
    // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez aussi enregistrer l'erreur au sein d'un service de rapport.
    console.info(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez afficher n'importe quelle UI de repli.
      return (
        <Paper style={{ padding: "16px" }}>
          <LargeTypography color="secondary"> Oups !!</LargeTypography>{" "}
          <LargeTypography>Une erreur s'est produite. </LargeTypography>
        </Paper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
