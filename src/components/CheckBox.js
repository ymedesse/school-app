import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
const BookCheckBox = ({ fontSize, label, ...props }) => (
  <FormControlLabel
    control={
      <Checkbox
        icon={<BookmarkBorderIcon fontSize={fontSize ? fontSize : "small"} />}
        checkedIcon={<BookmarkIcon fontSize={fontSize ? fontSize : "small"} />}
        {...props}
      />
    }
    label={label}
  />
);

const FavoriteCheckBox = ({ label, fontSize, ...props }) => (
  <FormControlLabel
    control={
      <Checkbox
        icon={<FavoriteBorder fontSize={fontSize ? fontSize : "small"} />}
        checkedIcon={<Favorite fontSize={fontSize ? fontSize : "small"} />}
        {...props}
      />
    }
    label={label}
  />
);

const StarCheckBox = ({ label, fontSize, ...props }) => (
  <FormControlLabel
    control={
      <Checkbox
        icon={<StarBorderIcon fontSize={fontSize ? fontSize : "small"} />}
        checkedIcon={<StarIcon fontSize={fontSize ? fontSize : "small"} />}
        {...props}
      />
    }
    label={label}
  />
);

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

export { BookCheckBox, FavoriteCheckBox, GreenCheckbox, StarCheckBox };
