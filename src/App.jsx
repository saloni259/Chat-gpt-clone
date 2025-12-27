import './App.css';
import gptlogo from './assets/chatgpt.svg';
import add from './assets/add-30.png';
import home from './assets/home.svg';
import save from './assets/bookmark.svg';
import upg from './assets/rocket.svg';
import mesg from './assets/message.svg';
import enter from './assets/send.svg';
import user from './assets/saloni_rani.svg';
import chatgpt from './assets/chatgptlogo.svg';
import mic from './assets/mic.svg';
import { sendmsgtoopenai } from './openai';
import { useEffect, useRef, useState } from 'react';
import { useReducer } from 'react';
function App(){
const msgend = useRef(null);
const [input,setinput] = useState("");
const [msg,setmsg] = useState([
  {
    text: "Hii I'M Chatgpt ! How can I help You? ",
    isbot: true
  }
]);
useEffect(()=>{
  msgend.current.scrollIntoView();
},[msg])
const change = async ()=>{
  try{
    const a = input;
    if(a != ""){
     setinput("");
     setmsg([
      
        ...msg,
        {text:a , isbot:false}
      
     ]);
    const res = await sendmsgtoopenai(a);
   
    setmsg([
      ...msg,
      {text: a, isbot: false},
      {text: res , isbot: true}
    ])
  }}catch (error) {
    console.error("Error",error);
  }
  
}
const handleenter = async(e) => {
  if(e.key == 'Enter') await change();
}
const querymsg = async(k)=>{
    try{
    const a = k;
    if(a != ""){
     setinput("");
     setmsg([
      
        ...msg,
        {text:a , isbot:false}
      
     ]);
    const res = await sendmsgtoopenai(a);
   
    setmsg([
      ...msg,
      {text: a, isbot: false},
      {text: res , isbot: true}
    ])
  }}catch (error) {
    console.error("Error",error);
  }
}
//speech 
const listen = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    alert("Voice Recognition started. Speak now...");
  };

  recognition.onresult = async (e) => {
    const txt = e.results[0][0].transcript;
    setinput("");
    setmsg([
      ...msg,
      { text: txt, isbot: false }
    ]);
    const res = await sendmsgtoopenai(txt);
    setmsg([
      ...msg,
      { text: txt, isbot: false },
      { text: res, isbot: true }
    ]);
  };

  recognition.start();
};

 return(
  <div>
   <div className="app">
     <div className="slider">
         <div className="upper">
             <div className="uppersidelogo">
               <img src={gptlogo} alt="" className="logo" />
               <span className="brand">ChatGpt</span>
             </div>
             <button className="midbtn" onClick={()=>{window.location.reload()}}>
              <img src={add} alt="" className="addbtn" />
              New Chat
             </button>
             <div className="uppersidebtn">
              <button className="query" value="What is Programming ?"onClick={(e)=>querymsg(e.target.value)}><img src={mesg} alt="" className='qu'/>What is Programming ?</button>
              <button className="query" value="What is Chatgpt ?"onClick={(e)=>querymsg(e.target.value)}><img src={mesg} alt="" className='qu'/>What is Chatgpt ?</button>
             </div>
         </div>
         <div className="lower">
              <div className="listitem">
                 <img src={home} alt="" className="listimg" id='home'/>Home
              </div>
              <div className="listitem">
                 <img src={save} alt="" className="listimg" id='save'/>Saved
              </div>
              <div className="listitem">
                 <img src={upg} alt="" className="listimg" id='upg' />Upgrade to Pro
              </div>
         </div>
     </div>
     <div className="main">
        <div className="chats">
           
           {
            msg.map((m,i)=>(
              <div key={i} className={m.isbot==true ? "chat-bot" : "chat"}>
            <img src={m.isbot==true?chatgpt : user} alt="" className={m.isbot==true?"botimg":"chatimg"} />
            <p className="para">{m.text}</p>
           </div>
            ))
           }
           <div ref={msgend}></div>
        </div>
        <div className="chatbox">
          <div className="inputbox">
            <input type="text" name="" id="sender" placeholder='Send a message' value={input} onKeyDown={handleenter} onChange={(e)=>setinput(e.target.value)} />
            <button className="send" onClick={()=>listen()} ><img src={mic} alt="" className="mic" /></button>
            <button className="send" onClick={()=>change()} ><img src={enter} alt="" className="enter" /></button>
          </div>
        </div>
     </div>
   </div>

   </div>
  )
}
export default App;
