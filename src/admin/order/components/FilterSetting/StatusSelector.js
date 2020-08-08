import React from "react";
import useSWR from "swr";
import SimpleSelector from "../../../../components/SimpleSelector";

const Status = ({ handleFilter, url, fetcher }) => {
  const [state, setState] = React.useState({
    values: [],
    current: "",
  });
  const { current, values } = state;
  const { data } = useSWR(url, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    suspense: true,
  });

  const error = !data ? true : data && data.error;

  React.useEffect(() => {
    if (data && !data.error) setState((state) => ({ ...state, values: data }));
  }, [data]);

  const handleChange = (event) => {
    let val = event.target.value;
    setState((state) => ({ ...state, current: val }));
    handleFilter(val);
  };

  return !error ? (
    <SimpleSelector
      value={current}
      handleChange={handleChange}
      values={values}
      label="Status"
    />
  ) : (
    "une erreure s'est produite"
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({ url: prev !== null ? prev.url : "" }) ===
    JSON.stringify({ url: next.url })
  );
};

export default React.memo(Status, isEqual);
