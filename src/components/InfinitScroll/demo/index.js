/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense } from "react";
import PokemonShort from "./components/pokemon-short";
import useSWR, { useSWRPages } from "swr";
import useOnScreen from "../hooks/use-on-screen";

const render = (result, index) => (
  <Suspense key={index} fallback={<div>loading ...</div>}>
    <PokemonShort key={index} name={result.name} />
  </Suspense>
);
function HomePage({
  listName = "infiniteLoad",
  urlBase = "https://pokeapi.co/api/v2/pokemon",
  rowRender = render
}) {
  const { pages, isLoadingMore, loadMore } = useSWRPages(
    listName,
    ({ offset, withSWR }) => {
      const url = offset || urlBase;
      

      const { data } = withSWR(
        useSWR(url, {
          dedupingInterval: 0,
          revalidateOnFocus: false,
          suspense: false
        })
      );

      if (!data) return null;

      const { results } = data;
      return results.map((result, index) => rowRender(result, index));
    },
    SWR => SWR.data.next,
    []
  );

  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = React.useState(
    false
  );
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
      <button
        ref={$loadMoreButton}
        className="bg-red-600 border-solid border-2 hover:bg-white border-red-600 text-white hover:text-red-600 font-bold py-2 px-4 rounded-full w-full"
        disabled={isLoadingMore}
        onClick={() => {
          loadMore();
          setInfiniteScrollEnabled(true);
        }}
      >
        Load More Pokémon
      </button>
    </>
  );
}

export default HomePage;
