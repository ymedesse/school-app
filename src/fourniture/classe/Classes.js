import React from "react";
import ClasseList from "./components/List";
import ListSkeleton from "../../components/ListSkeleton";
import { useHistory } from "react-router-dom";
import { LIST_CLASSE_BY_SCHOOL_SLUG_URL } from "../containers/constants";
import { ButtonPreviews } from "../../components/Buttons";
import { SCHOOL_LIST_LINK } from "../../routerLinks";
const Schools = ({ schoolSlug, ...props }) => {
  const url = LIST_CLASSE_BY_SCHOOL_SLUG_URL + schoolSlug;

  const history = useHistory();

  const handleSchoolPage = () => {
    history.push(SCHOOL_LIST_LINK);
  };

  return (
    <>
      <ButtonPreviews
        onClick={handleSchoolPage}
        label="Choisissez une autre école"
        style={{ margin: "0px" }}
      />

      <div style={{ marginTop: "16px" }}></div>

      <React.Suspense fallback={<ListSkeleton count="3" height={50} />}>
        <ClasseList url={url} />
      </React.Suspense>
    </>
  );
};

export default React.memo(Schools);
