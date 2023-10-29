import React from "react";
import AddItemModal from "./addItemModal";
import AddUserModal from "./addUserModal";
import { Col, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import userContext from "../userContext";
import listContext from "../listContext";
import ConfirmationDialog from "./ConfirmationDialog";
import ChangeListNameModal from "./changeListNameModal";
import "../sidebar.css"


const Sidebar = ({ id }) => {

    const {userState, setUserState} = useContext(userContext);
    const {list, setList, isOwner, setIsOwner, isMember ,setIsMember} = useContext(listContext);
    const [ showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [ showChangeListNameModal, setShowChangeListNameModal] = useState(false);

    let listIndex = list.map((list) => {return list.listid}).indexOf(id);

    function removeSelfFromList(userid, listIndex) {
        let userIndex = list[listIndex].users.map((user) => {return user.id}).indexOf(userid);

        list[listIndex].users.splice(userIndex, 1);
        setIsMember(false);
        setList([...list]);

    }



    return (
    <>
        <div className="sidebar">
            <h3 className="sidebar-header">
                {list[listIndex].name}'s Menu:
            </h3>
            <ul>

        {isMember === true || isOwner === true || userState.group === "owners" ? (
        <li><AddItemModal id={id} type={"add"}  /></li>
        ) : ("")}

        {userState.group === "owners" || isOwner === true ?  (
        <li><AddUserModal id={id} type={"add"}/></li>
        ) : ("")}

        {isOwner === true ? (
        <li><ChangeListNameModal
            index={listIndex} /></li>
        ) : ("")}

        {isMember === true ? (
        <li><Button className="button" onClick={() => {setShowConfirmDialog(true)}}>Leave</Button></li>
        ) : ("")}

        {isOwner === true ? (
        <li><AddUserModal id={id} type={"delete"}/></li>
        ) : ("")}

        </ul>
        
        </div>

        
        <ConfirmationDialog 
        userLeave={userState.username + " , you are about to leave shopping list ID: " + id}
        show={showConfirmDialog}
        onConfirm={() => {removeSelfFromList(userState.id, listIndex), setShowConfirmDialog(false)}}
        onCancel={() => {setShowConfirmDialog(false)}}>
            test
        </ConfirmationDialog>
        
        </>

    )
}


export default Sidebar;