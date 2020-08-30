import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import purple from "@material-ui/core/colors/purple";
import IconButtonMedia from "../../../components/IconButtonMedia";
import ListSkeleton from "../../../components/ListSkeleton";
import { LabelText, ValueText } from "../../../components/LabelValueTypography";

const Form = React.lazy(() => import("./Form"));

const WishedInfo = ({
  data = {},
  handleSubmitInfo,
  performFullErrorAlert,
  performFullSuccessAlert,
}) => {
  const [state, setState] = React.useState({
    edit: false,
    phone: data.phone || "",
  });

  const { phone, edit } = state;

  const showValue = () => (
    <Paper
      style={{ padding: "0px 8px", borderColor: "#F9A826"}}
      square
      variant="outlined"
    >
      <Box width="100%" display="flex">
        <Box alignSelf="center" flexGrow={1}>
          <LabelText>Vos contacts : </LabelText>
          <ValueText
            style={{ color: purple[500], display: "inline", fontWeight: "500" }}
          >{` ${phone}`}</ValueText>
        </Box>
        <Box>
          <IconButtonMedia
            variant="text"
            icon={<EditIcon />}
            onClick={() => setState((state) => ({ ...state, edit: true }))}
            textButtonProps={{ label: "Modifier" }}
            style={{ color: purple[500] }}
          />
        </Box>
      </Box>
    </Paper>
  );

  const handleCancel = () => setState((state) => ({ ...state, edit: false }));

  const showField = () => (
    <React.Suspense fallback={<ListSkeleton count={1} />}>
      <Form
        data={data}
        handleSubmitInfo={handleSubmitInfo}
        handleCancel={handleCancel}
        performFullErrorAlert={performFullErrorAlert}
        performFullSuccessAlert={performFullSuccessAlert}
        next={(val) => setState((state) => ({ ...state, ...val, edit: false }))}
      />
    </React.Suspense>
  );

  return edit ? showField() : showValue();
};

export default WishedInfo;

// data,
//   submitInfo,
//   performFullErrorAlert,
//   performFullSuccessAlert,
