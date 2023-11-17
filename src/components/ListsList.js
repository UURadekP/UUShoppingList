import React from "react";
import { Col, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import userContext from "../userContext";
import listContext from "../listContext";
import ListsListTile from "./ListsListTile";


const ListsList = () => {

    const {list, setList, isOwner, setIsOwner, isMember ,setIsMember, isChecked, setIsChecked} = useContext(listContext);
    const {userState, setUserState} = useContext(userContext);
    const [search, setSearch] = useState("");

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
        </div>
            {list.map((list) => { 
        return (
        <>
            <Row>
                <Col key={list.id} className='d-flex justify-content-center' md={4} lg={4} xl={4} xxl={4}>
                {userState.id === list.ownerid || list.users.map((user) => {return user.id}).indexOf(userState.id) !== -1 ? 
                (
                <ListsListTile 
                oneList={list}
                isOwner={isOwner}
                isMember={isMember} />) : ("")}
                </Col>
            </Row>
        </>
        )})}
            
        </div>
        </>
    )
}

export default ListsList;