import React from "react";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import { ButtonWithIcon } from "../../components/assets";
import AddressListItem from "./AddressItem";

const AddressListRow = ({ address, cusTomisedAction, handleUpdate }) => {
  console.log(" AddressListRow", { address, cusTomisedAction, handleUpdate });

  const defaultAction = handleUpdate && (
    <ButtonWithIcon
      color="primary"
      variant="text"
      onClick={handleUpdate}
      icon={<EditIcon />}
    >
      modifier
    </ButtonWithIcon>
  );

  const pers = cusTomisedAction ? { xs: "auto" } : { xs: 3 };
  const gridPers = cusTomisedAction
    ? { }
    : { justify: "space-between", alignItems: "flex-start" };
  return (
    <>
      <Grid container {...gridPers}>
        <Grid xs item>
          <AddressListItem address={address} />
        </Grid>
        <Grid {...pers} item>
          {cusTomisedAction ? cusTomisedAction : defaultAction}
        </Grid>
      </Grid>
    </>
  );
};
export default React.memo(AddressListRow, areEqual);

function areEqual(prevProps, nextProps) {
  const val =
    JSON.stringify(prevProps.address) === JSON.stringify(nextProps.address);
  return val;
}
