import React from "react";
import { Col, Button, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import userContext from "../userContext";
import listContext from "../listContext";
import ListsListTile from "./ListsListTile";
import interfaceContext from "../interfaceContext";



const ListsList = () => {

    const {list, setList} = useContext(listContext);
    const {userState, setUserState} = useContext(userContext);
    const {darkMode, setDarkMode, language, setLanguange} = useContext(interfaceContext)
    const [search, setSearch] = useState("");
    const [filterByNotArchived, setFilterByNotArchived] = useState(false);
    const [filterByArchived, setFilterByArchived] = useState(false);

    function removeFilters() {
        setFilterByArchived(false);
        setFilterByNotArchived(false);
    }

    function Archived() {
        setFilterByArchived(true)
        setFilterByNotArchived(false);
    }

    function notArchived() {
        setFilterByArchived(false)
        setFilterByNotArchived(true);
    }

    return (
        <>
            <div className="shoppingList">
                <div className={ darkMode === true ? "searchDiv" : "searchDivL"}>
                    <input
                        className="searchBar"
                        type="search"
                        placeholder={language === "english" ? "Search" : "Hledat"}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                <Button className={ darkMode === true ? "searchbarButton" : "searchbarButtonL"} onClick={() => {
                     Archived();
                }}>{language === "english" ? "Archived Filter" : "Filtr Archiv. Listů"}</Button>
                <Button className={ darkMode === true ? "searchbarButton" : "searchbarButtonL"} onClick={() => {
                    notArchived();
                }}
                >{language === "english" ? "Non-Archived Filter" : "Filtr Nearchiv. Listů"}</Button>
                <Button className={ darkMode === true ? "searchbarButton" : "searchbarButtonL"} onClick={() => {
                    removeFilters();
                }}
                >{language === "english" ? "Remove Filters" : "Odebrat Filtery"}</Button>
                </div>
                <Row>{

                    list.map((list) => {
                        if (userState.id === list.ownerid || list.users.map((user) => { return user.id }).indexOf(userState.id) !== -1) {
                            if (list.name.toLowerCase().includes(search.toLowerCase()) === true || search === "") {
                                if (filterByArchived === false && filterByNotArchived === false) {
                                    return (
                                        <>
                                            <Col key={list.id} className='d-flex justify-content-center' md={4} lg={4} xl={4} xxl={4}>
                                                <ListsListTile
                                                    oneList={list}
                                                />
                                            </Col>
                                        </>
                                    )
                                } else if (list.archived === true && filterByArchived === true) {
                                    return (
                                        <>
                                            <Col key={list.id} className='d-flex justify-content-center' md={4} lg={4} xl={4} xxl={4}>
                                                <ListsListTile
                                                    oneList={list}
                                                />
                                            </Col>
                                        </>
                                    )
                                } else if (list.archived === false && filterByNotArchived === true) {
                                    return (
                                        <>
                                            <Col key={list.id} className='d-flex justify-content-center' md={4} lg={4} xl={4} xxl={4}>
                                                <ListsListTile
                                                    oneList={list}
                                                />
                                            </Col>
                                        </>
                                    )
                                }


                            }
                        }
                    }
                    )
                }





                </Row>
            </div>
        </>
    )
}

export default ListsList;