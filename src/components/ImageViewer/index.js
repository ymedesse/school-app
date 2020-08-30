import React from "react";
import Viewer from "react-viewer";
import { ButtonWithIcon } from "../Buttons";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import { makeStyles } from "@material-ui/core/styles";

const files = [
  {
    src: "https://unsplash.it/800/300?image=1",
    alt: "title",
    content: "content",
  },
];

const ImageViewer = ({ activeIndex = 0, images = files }) => {
  const [visible, setVisible] = React.useState(false);
  const classes = useStyles();
  return (
    <div>
      <ButtonWithIcon
        variant="contained"
        color="default"
        startIcon={<ViewCarouselIcon />}
        onClick={(e) => {
          setVisible(true);
        }}
      >
        Afficher en galerie
      </ButtonWithIcon>
      <Viewer
        className={classes}
        zIndex={3000}
        activeIndex={activeIndex}
        attribute={true}
        visible={visible}
        downloadable={true}
        showTotal={true}
        onMaskClick={() => setVisible(false)}
        downloadInNewWindow={true}
        onClose={() => {
          setVisible(false);
        }}
        images={images}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  reactViewerMask: {
    backgroundColor: "#373737fc",
  },
  backgroundColor: "#373737fc",
}));

export default ImageViewer;
