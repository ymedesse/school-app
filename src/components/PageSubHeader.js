import React from "react";
import Box from "@material-ui/core/Box";
import ShareIcon from "@material-ui/icons/Share";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSkeleton from "./ListSkeleton";
import { ButtonWithIcon } from "./Buttons";
import { LargeTypography } from "./Typography";
import compareProps from "../utils/compareProps";
const Breadcrumbs = React.lazy(() => import("../Breadcrumbs"));

const SubHeader = ({ routes=[], title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box display="flex" p={0} style={{ width: "100%" }}>
        <Box ml={2} flexGrow={1}>
          <React.Suspense
            fallback={<ListSkeleton count={1} height={24} width="30%" />}
          >
            <Breadcrumbs routes={routes} />
          </React.Suspense>
        </Box>
        <Box p={0}>
          <ButtonWithIcon variant="text" startIcon={<ShareIcon />}>
            {!isMobile && "Partager cette liste"}
          </ButtonWithIcon>
        </Box>
      </Box>
      {title && (
        <LargeTypography style={{ margin: "8px" }}>{title}</LargeTypography>
      )}
    </>
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["routes", "title"]);
};
export default React.memo(SubHeader, isEqual);
