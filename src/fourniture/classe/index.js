import React from "react";
import Classes from "./Classes";

const Classe = ({ ...props }) => {
  const { params } = props.match;
  const { school } = params;
  return school ? (
    <Classes schoolSlug={school} />
  ) : (
    <div> Une erreur s'est produite </div>
  );
};

export default Classe;
