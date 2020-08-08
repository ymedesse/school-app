import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export default function SettingsList({ options, handleToggle }) {
  return (
    <List style={{ width: "100%" }}>
      {options.map((value, index) => {
        const labelId = `setting-${value.id}`;
        return (
          <ListItem
            key={index}
            role={undefined}
            dense
            button
            onClick={() => handleToggle(value.id)}
            keu={index}
          >
            <ListItemText
              id={labelId}
              primary={
                <Typography color={value.active ? "primary" : undefined}>
                  {value.label}
                </Typography>
              }
            />

            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                // onChange={() => handleToggle(value.id)}
                onClick={() => handleToggle(value.id)}
                checked={value.active}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
