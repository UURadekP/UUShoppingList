import React from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import ListsList from "../components/ListsList";
import { useParams } from "react-router-dom";
import "../sidebar.css";

const ListsPage = ({}) => {

    let { id } = useParams();

    return (<>

        <Header />
      <div className="wrapper">
        <Sidebar id={id} type={2} />
        <ListsList />
      </div>
    </>)


};

export default ListsPage;