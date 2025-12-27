import { useState } from "react";

function Kpp(){
  const [type1,settype] = useState("password");
  const [change,set] = useState("seen");
  function call(){
    if(type1=="password"){
      settype("text");
      set("unseen");
    }
    if(type1=="text"){
      settype("password");
      set("seen");
    }
  }
  return(
    <div>
       
         
         <input type={type1} placeholder="Password" />
         <button onClick={()=>call()}>{change}</button>
      
    </div>
  )
}
export default Kpp;