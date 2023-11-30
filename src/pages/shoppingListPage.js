import {React, useContext }from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import ShoppingList from "../components/shoppingList";
import { useParams, } from "react-router-dom";
import interfaceContext from "../interfaceContext";
import "../sidebar.css";



const ShoppingListPage = ({}) => {

    let { id } = useParams();
    const { darkMode } = useContext(interfaceContext);

    id = parseInt(id);

    return (<>

        <Header />
      <div className={darkMode === true ? "wrapper" : "wrapperL"}>
        <Sidebar id={id} type={1} />
        <ShoppingList id={id} />
      </div>
    </>)


};

export default ShoppingListPage;