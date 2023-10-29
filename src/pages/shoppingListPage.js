import React from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import ShoppingList from "../components/shoppingList";
import { useParams } from "react-router-dom";
import "../sidebar.css";



const shoppingListPage = ({}) => {

    let { id } = useParams();

    return (<>

        <Header />
      <div className="wrapper">
        <Sidebar id={id} />
        <ShoppingList id={id} />
      </div>
    </>)


};

export default shoppingListPage;