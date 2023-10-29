import React from "react";
import { useState, createContext } from "react";

const users = [
    { username: 'radek', password: '1234', group: 'owners', id: '1' },
    { username: 'pepa', password: '1234', group: 'owners', id: '2' },
    { username: 'honza', password: '1234', group: 'registered', id: '3' },
    { username: 'david', password: '1234', group: 'registered', id: '4' },
    { username: 'janek', password: '1234', group: 'registered', id: '5' },
    { username: 'guest', password: '', group: 'guest', id: '6' },
];

const userContext = createContext(users);

  
export default userContext;



