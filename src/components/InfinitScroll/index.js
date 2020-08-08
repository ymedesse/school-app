/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import useSWR, { useSWRPages } from "swr";
import useOnScreen from "./hooks/use-on-screen";

function HomePage({ listName = "infiniteLoad", urlBase, rowRender }) {
  
  const { pages, isLoadingMore, loadMore } = useSWRPages(
    listName,
    ({ offset, withSWR }) => {
      

      const url = urlBase + `&${offset || ""}`;

      
      if (offset === false) {
        setLoader({ ...loader, haveNext: false });
        return null;
      }

      const { data } = withSWR(
        useSWR(url, {
          suspense: false
        })
      );

      if (!data) return null;

      const { results } = data;
      
      return results.map((result, index) => rowRender(result, index));
    },
    SWR => {
      
      return SWR.data.next;
    },
    [urlBase]
  );

  const [loader, setLoader] = useState({
    infiniteScrollEnabled: false,
    haveNext: true
  });

  const { infiniteScrollEnabled, haveNext } = loader;

  const $loadMoreButton = React.useRef(null);
  const isOnScreen = useOnScreen($loadMoreButton, "200px");

  React.useEffect(() => {
    if (!infiniteScrollEnabled || !isOnScreen) return;
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infiniteScrollEnabled, isOnScreen]);

  
  return (
    <>
      {pages}
      {haveNext && (
        <button
          ref={$loadMoreButton}
          disabled={isLoadingMore}
          onClick={() => {
            loadMore();
            setLoader({ ...loader, infiniteScrollEnabled: true });
          }}
        >
          Load More Pokémon
        </button>
      )}
    </>
  );
}

export default HomePage;
