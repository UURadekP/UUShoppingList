import React from "react";
import { Col, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import userContext from "../userContext";
import listContext from "../listContext";
import ListsListTile from "./ListsListTile";


const ListsList = () => {

    const { list, setList, isOwner, setIsOwner, isMember, setIsMember, isChecked, setIsChecked } = useContext(listContext);
    const { userState, setUserState } = useContext(userContext);
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
                <div className="searchDiv">
                    <input
                        className="searchBar"
                        type="search"
                        placeholder="Search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                <Button className="searchbarButton" onClick={() => {
                     Archived();
                }}>Archived filter</Button>
                <Button className="searchbarButton" onClick={() => {
                    notArchived();
                }}
                >NotArchived filter</Button>
                </div>
                {console.log(list)}
                { 

                        list.map((list) => {
                            if (userState.id === list.ownerid || list.users.map((user) => { return user.id }).indexOf(userState.id) !== -1) {
                            if (list.name.toLowerCase().includes(search.toLowerCase()) === true || search === "") {
                                if (filterByArchived === false && filterByNotArchived === false) {
                            return (
                                <>
                                    <Row>
                                        <Col key={list.id} className='d-flex justify-content-center' md={4} lg={4} xl={4} xxl={4}>

                                            <ListsListTile
                                                oneList={list}
                                                isOwner={isOwner}
                                                isMember={isMember} /> : ("")

                                        </Col>
                                    </Row>
                                </>
                            )
                        } else if (list.archived === true && filterByArchived === true) {
                            return (
                                <>
                                    <Row>
                                        <Col key={list.id} className='d-flex justify-content-center' md={4} lg={4} xl={4} xxl={4}>

                                            <ListsListTile
                                                oneList={list}
                                                isOwner={isOwner}
                                                isMember={isMember} /> : ("")

                                        </Col>
                                    </Row>
                                </>
                            )
                        } else if (list.archived === false && filterByNotArchived === true) {
                            return (
                                <>
                                    <Row>
                                        <Col key={list.id} className='d-flex justify-content-center' md={4} lg={4} xl={4} xxl={4}>

                                            <ListsListTile
                                                oneList={list}
                                                isOwner={isOwner}
                                                isMember={isMember} /> : ("")

                                        </Col>
                                    </Row>
                                </>
                            )
                        }
                        
                    
                    }
                    }}
                    )
                }
                    
                    
                    
                    
                    

            </div>
        </>
    )
}

export default ListsList;