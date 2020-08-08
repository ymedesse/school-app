import React from "react";
import ErrorBoundary from "./ErrorBoundary";

const ErrorBoundarySuspense = ({ fallback, children }) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={fallback}>{children}</React.Suspense>
    </ErrorBoundary>
  );
};

export default ErrorBoundarySuspense;
