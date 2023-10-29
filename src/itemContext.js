import React from "react";
import { createContext } from "react";

const itemsJson = require('./items.json');

const itemContext = createContext(itemsJson);


export default itemContext;
