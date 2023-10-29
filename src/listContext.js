import React from "react";
import { useState, createContext } from "react";

const lists = require('./lists.json');

const listContext = createContext(lists);

  
export default listContext;