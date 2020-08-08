import React, { lazy } from "react";
import useSWR from "swr";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { List, WindowScroller, AutoSizer } from "react-virtualized";

import Empty from "./Empty";
import { CLASSES_LINK } from "../../../routerLinks";
import LazyLoad from "../../../components/LazyLoad";
import { LargeTypography } from "../../../components/Typography";

const SchoolRow = lazy(() => import("./Row"));

const SchoolList = ({ url, setCurrentSearch, schoolId, ...restProps }) => {
  const classes = useStyles();
  const listRef = React.createRef();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data } = useSWR(url, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
  });

  const handleClick = (item) => {
    history.push(CLASSES_LINK + "/" + item.slug);
  };

  function rowRenderer({ key, index, isScrolling, isVisible, style, parent }) {
    const { results } = data;
    const item = results[index];
    const content = item && (
      <LazyLoad>
        <SchoolRow
          isMobile={isMobile}
          value={item}
          handleClick={() => handleClick(item)}
        />
      </LazyLoad>
    );

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  }

  const error = !data ? true : data && data.error;
  const count = !error ? data.count : 0;

  return !error ? (
    <>
      {count > 0 ? (
        <Paper square className={classes.paper}>
          <WindowScroller
            style={{
              ":focus": {
                border: "10px solid",
              },
            }}
          >
            {({ height, isScrolling, registerChild, scrollTop }) => (
              <AutoSizer disableHeight={true}>
                {({ width }) => (
                  <div ref={registerChild}>
                    <List
                      autoHeight
                      isScrolling={isScrolling}
                      scrollTop={scrollTop}
                      ref={listRef}
                      height={height}
                      rowCount={count}
                      width={width}
                      rowHeight={75}
                      rowRenderer={rowRenderer}
                    />
                  </div>
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        </Paper>
      ) : (
        <Empty />
      )}
    </>
  ) : (
    <div>
      <LargeTypography>Une erreur s'est produite. </LargeTypography>
    </div>
  );
};

export default React.memo(SchoolList);

const useStyles = makeStyles((theme) => ({
  list: {
    flexGrow: 1,
    width: "100%",
    minHeight: "400px",
  },
  paper: {
    padding: theme.spacing(2),
  },
  appBar: {
    top: "auto",
    bottom: 0,
    position: "sticky",
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    right: 0,
    margin: "0 auto",
  },
  suspense: {},
}));
