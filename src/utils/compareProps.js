const compareProps = (prev, next, values) => {
  return (
    JSON.stringify(getPropsValue(prev, values)) ===
    JSON.stringify(getPropsValue(next, values))
  );
};

const getPropsValue = (props, values) => {
  let m = {};
  if (props !== null) {
    for (let i = 0; i < values.length; i++) {
      const element = values[i];
      m = { ...m, [`${element}`]: props[`${element}`] };
    }
  }
  return m;
};

export default compareProps;
