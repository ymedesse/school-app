import React from "react";
import slugify from "slugify";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// import { useTheme } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

//const theme = useTheme();
//const mobile = useMediaQuery(theme.breakpoints.down("sm"));

const performContextInitial = (state, dispatch, initial, initArray) => {
  for (let i = 0; i < initArray.length; i++) {
    const { key, Performance, ...resProps } = initArray[i];
    initial = {
      ...initial,
      [key]: MemorizeState({ state, dispatch, key, Performance, ...resProps }),
    };
  }
  return initial;
};

const MemorizeState = ({ state, dispatch, key, Performance, ...resProps }) => {
  const perform = React.useMemo(
    () =>
      resProps.sessionId && resProps.auth
        ? Performance(dispatch, resProps.sessionId, resProps.auth)
        : resProps.auth
        ? Performance(dispatch, resProps.auth)
        : Performance(dispatch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, resProps.auth]
  );
  return React.useMemo(() => {
    return {
      ...state[key],
      ...perform,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state[key], resProps.auth]);
};

const calculPourcentage = (sale_price, price, tva) => {
  const sp = parseInt(sale_price);
  const p = parseInt(price);
  const t = parseInt(tva);

  const pourc = 100 - ((sp - t) * 100) / (p - t);
  return Math.round(pourc);
};

export const sluger = (value) => {
  return slugify(value, {
    lower: true,
    remove: /[*^#{°=}+|`_+~.()'"!:@]/g,
  });
};

export const convertSNumber = (value) => {
  return parseInt(value) || 0;
};

const removeArrayFromArray = (rootArray, childArray, fieldId) => {
  let mu = [...rootArray];
  for (let i = 0; i < childArray.length; i++) {
    const element = childArray[i];

    if (fieldId) {
      mu = mu.filter((item) => item[`${fieldId}`] !== element[`${fieldId}`]);
    }
    if (!fieldId) {
      mu = mu.filter((item) => item.id !== childArray[i]);
    }
  }

  return mu;
};

const arrayFromObject = (object) => {
  return Object.entries(object).map(([key, item]) => item);
};

const removeUndefined = (object) => {
  return JSON.parse(JSON.stringify(object));
};

const objectFromArray = async (array, key) => {
  let val = {};

  for (let i = 0; i < array.length; i++) {
    const elem = array[i];
    const id = key ? elem[key] : i;
    val = { ...val, [`${id}`]: elem };
  }
  return val;
};

// const dateToText = (date = "2020-04-18T18:07:09.753Z") => {
//   const value = moment(date);
//   moment.locale("fr");
//   value.locale("fr");
//   return value.format("Do MMMM YYYY à hh:mm:ss");
// };

const dateToText = (date = "2020-04-18T18:07:09.753Z") => {
  const madate = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    second: "numeric",
    minute: "numeric",
  };

  return madate.toLocaleDateString(undefined, options);
};

const dateToTextNumber = (date) => {
  const madate = new Date(date);
  const options = {
    // weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "numeric",
    second: "numeric",
    minute: "numeric",
  };

  return madate.toLocaleDateString(undefined, options);
};

const objectFromObjectArray = (array, keyField, valueField) => {
  let val = {};
  for (let i = 0; i < array.length; i++) {
    const elem = array[i];
    const key = elem[`${keyField}`];
    const value = valueField ? elem[`${valueField}`] : elem;
    val = { ...val, [`${key}`]: value };
  }
  return val;
};
const removeValueFromObject = async (object, arrayValues = []) => {
  let m = { ...object };
  for (let i = 0; i < Object.keys(object).length; i++) {
    const key = Object.keys(object)[i];
    const value = object[`${key}`];
    if (arrayValues.indexOf(value) !== -1) {
      m = { ...m, [`${key}`]: "" };
    }
  }
  return m;
};

const getValueFromSourceByFieldName = (fieldsName = "", dataSource = {}) => {
  const links = fieldsName.split(".");
  let finalValue = undefined;
  let copy = dataSource;

  const getValue = (s, f) => {
    return s[`${f}`];
  };
  for (let i = 0; i < links.length; i++) {
    const field = links[i];

    copy = getValue(copy, field);

    if (!copy) break;
    else {
      finalValue = copy;
    }
  }

  return finalValue;
};

export {
  performContextInitial,
  objectFromArray,
  arrayFromObject,
  MemorizeState,
  calculPourcentage,
  sleep,
  removeArrayFromArray,
  removeUndefined,
  dateToText,
  dateToTextNumber,
  objectFromObjectArray,
  removeValueFromObject,
  getValueFromSourceByFieldName,
};
