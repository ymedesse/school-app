import React, { useEffect, lazy, useState } from "react";
import { TitleTypography, LargeTypography } from "../../components/Typography";
import { List, WindowScroller } from "react-virtualized";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Suspenser from "../../components/Suspenser";
import useSWR from "swr";
const SchoolRow = lazy(() => import("./Row"));

const SchoolList = ({ url, setCurrentSearch, schoolId, ...restProps }) => {
  const classes = useStyles();
  const listRef = React.createRef();

  const { data } = useSWR(url, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
  });

  function rowRenderer({ key, index, isScrolling, isVisible, style, parent }) {
    const { results } = data;
    const item = results[index];
    const content = (
      <Suspenser height={80} doubleFeadBack={false}>
        <SchoolRow value={item} />
      </Suspenser>
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
    <Paper className={classes.paper}>
      {/* <div className={classes.list}> */}
      {/* <CssBaseline /> */}
      {count > 0 ? (
        <>
          <WindowScroller>
            {({ height, isScrolling, registerChild, scrollTop, width }) => (
              <div>
                <div ref={registerChild}>
                  <List
                    autoHeight
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    ref={listRef}
                    height={height}
                    rowCount={count}
                    width={"100%"}
                    rowHeight={100}
                    rowRenderer={rowRenderer}
                  />
                </div>
              </div>
            )}
          </WindowScroller>
        </>
      ) : (
        <TitleTypography style={{ padding: "5px 15px" }}>
          Vous ne trouvez pas votre école
        </TitleTypography>
      )}
      {/* </div> */}
    </Paper>
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
    padding: theme.spacing(5, 3),
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

const pluriel = (count) => {
  return count > 1 ? "s" : "";
};
