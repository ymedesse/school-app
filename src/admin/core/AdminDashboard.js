import React, { useContext, useEffect, useState } from "react";
import * as routeLink from "../../routerLinks";
import { generalItems } from "./config";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AdminContext from "../context/AdminContext";
import { useHistory } from "react-router-dom";

const Dashboard = ({ width, height, ...restProps }) => {
  const history = useHistory();

  const classes = useStyles();
  const adminContext = useContext(AdminContext);
  const myRef = React.createRef();
  const {
    index,
    contents,
    setCurrentViewTitle,
    setCurrentViewAction,
    initializeViewerContents,
    addNextComponent,
    viewHandleChange,
    setCurrentViewerTitleAndAction,
    previous,
  } = adminContext.layout;

  const alertState = adminContext.alert;
  const { isAuthenticatedUser } = adminContext.auth;

  const [componentState, setComponentState] = useState({});

  const feedBackInit = {
    error: false,
    success: false,
    loading: false,
  };

  const [submitResult, setSubmitedResult] = useState(feedBackInit);

  const importComponentNativeState = (nat) => {
    const { comp } = nat;
    setComponentState(
      componentState.comp !== comp ? { ...nat } : { ...componentState, ...nat }
    );
  };
  const feedBackState = {
    submitResult,
    setSubmitedResult,
    feedBackInit,
  };
  const state = {
    addNextComponent,
    setCurrentViewTitle,
    setCurrentViewAction,
    setCurrentViewerTitleAndAction,
    previous,
    width,
    height,
    isAuthenticatedUser,
    alertState,
    importComponentNativeState, // permet de sauvegarder le state de l'entrer du menu
    ...componentState, // permet de partager le state relatif au init du content en cours à tous ses enfants
  };
  const currentPath = history.location.pathname;
  const { user } = isAuthenticatedUser;

  useEffect(() => {
    const ten = renderContent();
    perfomrContentRender(ten);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ten = renderContent();
    perfomrContentRender(ten);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  const perfomrContentRender = (component) => {
    component
      ? component.isAllowed(user)
        ? initializeViewerContents(component.content, component.title)
        : history.push(routeLink.NOT_AUTHORIZATION_LINK)
      : history.push(routeLink.ADMIN_DASHBOARD_LINK);
  };

  useEffect(() => {
    myRef.current.scrollTo(0, 0);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // ordorner tous les itemes au même niveau pour faciliter le traitement
  const allItems = generalItems.reduce((prev, item) => {
    let child = [];
    if (item.child !== undefined) child = item.child;
    return [...prev, item, ...child];
  }, []);

  const renderContent = () => {
    const component = allItems.find((item) => item.path === currentPath);
    return component !== undefined && component.content !== undefined
      ? {
          content: component.content,
          title: component.title,
          action: component.action,
          isAllowed: component.isAllowed,
        }
      : undefined;
  };

  return (
    <div name="moi" ref={myRef} className={classes.root}>
      {contents.length > 0 && (
        <SwipeableViews
          enableMouseEvents={false}
          // animateHeight={true}
          ref={myRef}
          index={index}
          onChangeIndex={viewHandleChange}
          containerStyle={{
            maxHeight: "fit-content",
            minHeight: "fit-content",
          }}
          slideStyle={{ overflow: "inherit" }}
        >
          {contents.map((item, key) => {
            return (
              <div /* style={{ minHeight: "150px" }} */ key={key}>
                {item({ ...state, feedBackState })}
              </div>
            );
          })}
        </SwipeableViews>
      )}
    </div>
  );
};

export default Dashboard;

const useStyles = makeStyles((theme) => ({
  paper: {
    // height: "100%",
    padding: theme.spacing(2, 4),
  },
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));
