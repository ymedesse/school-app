import React from "react";
import ListSkeleton from "../../../components/ListSkeleton";
const ClassesList = React.lazy(() => import("./schoolClasses"));

const Body = ({ listesActions, layoutActions, school, nextStep }) => {
  const handleNextStep = (...arg) => {
    nextStep(...arg);
  };

  return (
    <React.Suspense fallback={<ListSkeleton count={8} />}>
      <ClassesList
        listesActions={listesActions}
        layoutActions={layoutActions}
        school={school}
        handleNextStep={handleNextStep}
      />
    </React.Suspense>
  );
};

export default Body;
