import React, { useContext } from "react";
import userContext from "../userContext";

const users = [
    { username: 'radek', password: '1234', group: 'owners', id: '1' },
    { username: 'pepa', password: '1234', group: 'registered', id: '2' },
    { username: 'honza', password: '1234', group: 'registered', id: '3' },
    { username: 'david', password: '1234', group: 'registered', id: '4' },
    { username: 'janek', password: '1234', group: 'registered', id: '5' },
    { username: 'guest', password: '', group: 'guest', id: '6' },
];


function login(username, password) {

    console.log("username " + username);
    console.log("password " + password);

    let user = users.find(user => user.username === username.toLowerCase());

    if (user != undefined && user.password === password) {
        return {
            success: true,
            username: user.username,
            group: user.group,
            id: user.id
        };
    }

    return { success: false };
}

export default login;