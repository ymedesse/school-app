import React from "react";
import SchoolsList from "./components/List";
import SearchField from "../../components/SearchField";
import CheckBoxSkeleton from "../../components/CheckBoxSkeleton";
import { TitleTypography } from "../../components/Typography";
import { getPartialSearch } from "../../school/containers/performances";
import SubHeader from "../../components/PageSubHeader";
import { SCHOOL_LIST_LINK } from "../../routerLinks";

const Schools = ({ ...props }) => {
  const [searchData, setSearchData] = React.useState({
    search: "",
    searchInFields: ["name", "phone", "address"],
  });
  const url = getPartialSearch(searchData);

  const handleFilter = (name) => (event) => {
    const val = event.target.value;
    setSearchData({ ...searchData, search: val });
  };
  const setCurrentSearch = (val) => {
    setSearchData({ ...searchData, search: val });
  };

  const headComponent = (
    <SearchField
      style={{ width: "100%", margin: "8px 0px" }}
      inputFieldProps={{ onChange: handleFilter("search") }}
      placeholder="Chercher par le nom de l'école"
      showLeftToogle={false}
    />
  );

  return (
    <>
      <SubHeader routes={["/", SCHOOL_LIST_LINK]} title="Listes des écoles" />

      <TitleTypography style={{ marginLeft: "8px" }}>
        Choisissez votre école
      </TitleTypography>
      {headComponent}
      <React.Suspense fallback={<CheckBoxSkeleton count="5" height={30} />}>
        <SchoolsList url={url} setCurrentSearch={setCurrentSearch} />
      </React.Suspense>
    </>
  );
};

export default React.memo(Schools);
