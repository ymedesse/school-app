import React, {useContext} from "react";  
import MainContext from "../learn/MainContext"


const Child = () => {
  const mainContext=useContext(MainContext)
  const handdleClick = () => {};
const handleInput = event => {
  mainContext.changeName(event.target.value)
};

   return (
     <div>
     <p>
         My context name is : {mainContext.name}
       </p>
    <span> Enter some text</span>
    <input name="todoinput" onChange={handleInput} />
    <button onClick={() => handdleClick()}> add</button>
    </div>
  );
};
export default Child;
