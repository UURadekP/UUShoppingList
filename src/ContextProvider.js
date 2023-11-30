import React from "react";
import { useState } from "react";
import interfaceContext from "./interfaceContext";
import userContext from "./userContext";
import listContext from "./listContext";

const users = [
  { username: 'radek', password: '1234', group: 'owners', id:'1' },
  { username: 'pepa', password: '1234', group: 'owners', id:'2' },
  { username: 'honza', password: '1234', group: 'registered', id:'3' },
  { username: 'guest', password: '', group: 'guest', id:'4' },
];

const listsJson = require('./lists.json');





function ContextProvider({children}) {

  const [userState, setUserState] = useState(users);
  const [list, setList] = useState(listsJson);
  const [isOwner, setIsOwner] = useState(false);
  const [isMember, setIsMember] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState("english")


    return (
    <>

    <listContext.Provider value={{list, setList, isOwner, setIsOwner, isMember, setIsMember}}>
    <interfaceContext.Provider value={{darkMode, setDarkMode, language, setLanguage}}>
      <userContext.Provider value={{userState, setUserState}}>
      {children}
      </userContext.Provider>
    </interfaceContext.Provider>
    </listContext.Provider>
    
    
    </>)

}

export default ContextProvider;