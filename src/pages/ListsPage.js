import React, {useContext} from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import ListsList from "../components/ListsList";
import { useParams } from "react-router-dom";
import "../sidebar.css";
import interfaceContext from "../interfaceContext";

const ListsPage = ({}) => {

    let { id } = useParams();
    const { darkMode } = useContext(interfaceContext);

    return (<>

        <Header />
      <div className={darkMode === true ? "wrapper" : "wrapperL"}>
        <Sidebar id={id} type={2} />
        <ListsList />
      </div>
    </>)


};

export default ListsPage;