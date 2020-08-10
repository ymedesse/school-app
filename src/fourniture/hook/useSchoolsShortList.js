import React from "react";
import { CLASSES_LINK, SCHOOL_LIST_LINK } from "../../routerLinks";
import context from "../../admin/context/AdminContext";

const max = 4;
const useSchoolsShortList = () => {
  const adminContext = React.useContext(context);
  const { schools = [] } = adminContext.school;

  const getSckoolLink = (item) => {
    return CLASSES_LINK + "/" + item.slug;
  };

  const getSelections = () => {
    const select = [];
    for (let i = 0; i < schools.length; i++) {
      const element = schools[i];
      select.push({ ...element, link: getSckoolLink(element) });
      if (i === max - 1) break;
    }
    select.push({
      name: "Afficher toutes les écoles ...",
      link: SCHOOL_LIST_LINK,
    });
    return select;
  };

  const [selections, setSelections] = React.useState(getSelections());

  React.useEffect(() => {
    const select = getSelections();
    setSelections((selections) => select);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schools]);

  return selections;
};

export default useSchoolsShortList;
