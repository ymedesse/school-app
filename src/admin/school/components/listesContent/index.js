import React from "react";
import FournitureContentList from "./List";
import { FieldArray } from "react-final-form-arrays";
import ListSkeleton from "../../../../components/ListSkeleton";

const DetailFourniture = ({
  setCurrentViewerTitleAndAction,
  values,
  ...props
}) => {
  const { school, classe } = values;

  const handleProductSelection = (fields) => (product, checked) => {
    const { value } = fields;
    if (checked === "push") {
      const data = {
        rank: fields.length,
        product,
      };

      fields.push(data);
    } else {
      const index = value.findIndex((item) => item.product._id === product._id);
      index > -1 && fields.remove(index);
    }
  };

  const remove = (fields) => async (id) => {
    const { value } = fields;
    const index = value.findIndex((item) => item.product._id === id);
    index > -1 && fields.remove(index);
  };

  const removeMany = (fields) => async (ids) => {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      await remove(fields)(id);
    }
  };

  const empty = (fields) => () => {
    const { value } = fields;
    for (let i = 0; i < value.length; i++) {
      const element = value[i];
      remove(element.product._id);
    }
  };

  const handleDragDrop = (fields) => (oldIndex, newIndex) => {
    fields.move(oldIndex, newIndex);
  };

  return (
    <>
      sddsds
      <FieldArray name="products">
        {({ fields }) => {
          return (
            <>
              <React.Suspense fallback={<ListSkeleton count={10} />}>
                <FournitureContentList
                  products={fields.value || []}
                  empty={empty(fields)}
                  removeMany={removeMany(fields)}
                  remove={remove(fields)}
                  handleProductSelection={handleProductSelection(fields)}
                  handleDragDrop={handleDragDrop(fields)}
                  setCurrentViewerTitleAndAction={
                    setCurrentViewerTitleAndAction
                  }
                  school={school}
                  classe={classe}
                />
              </React.Suspense>
            </>
          );
        }}
      </FieldArray>
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify(prev === null ? [] : prev.values) ===
    JSON.stringify(next.values)
  );
};

export default React.memo(DetailFourniture, isEqual);
// export default DetailFourniture;
