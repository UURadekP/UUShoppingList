import React from "react";
import { useState } from "react";
import itemContext from "./itemContext";
import userContext from "./userContext";
import listContext from "./listContext";

const itemsJson = require('./items.json');

const users = [
  { username: 'radek', password: '1234', group: 'owners', id:'1' },
  { username: 'pepa', password: '1234', group: 'owners', id:'2' },
  { username: 'honza', password: '1234', group: 'registered', id:'3' },
  { username: 'guest', password: '', group: 'guest', id:'4' },
];

const listsJson = require('./lists.json');





function ContextProvider({children}) {

  const [items, setItems] = useState(itemsJson);
  const [userState, setUserState] = useState(users);
  const [list, setList] = useState(listsJson);
  const [isOwner, setIsOwner] = useState(false);
  const [isMember, setIsMember] = useState(false)


    return (
    <>

    <listContext.Provider value={{list, setList, isOwner, setIsOwner, isMember, setIsMember}}>
    <itemContext.Provider value={{items, setItems}}>
      <userContext.Provider value={{userState, setUserState}}>
      {children}
      </userContext.Provider>
    </itemContext.Provider>
    </listContext.Provider>
    
    
    </>)

}

export default ContextProvider;