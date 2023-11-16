import React from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import ShoppingList from "../components/shoppingList";
import { useParams } from "react-router-dom";
import "../sidebar.css";



const ShoppingListPage = ({}) => {

    let { id } = useParams();

    id = parseInt(id);

    return (<>

        <Header />
      <div className="wrapper">
        <Sidebar id={id} type={1} />
        <ShoppingList id={id} />
      </div>
    </>)


};

export default ShoppingListPage;