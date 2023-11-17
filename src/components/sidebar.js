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
import AddListModal from "./addListModal";


const Sidebar = ({ id, type }) => {

    const {userState, setUserState} = useContext(userContext);
    const {list, setList, isOwner, setIsOwner, isMember ,setIsMember} = useContext(listContext);
    const [ showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [ showChangeListNameModal, setShowChangeListNameModal] = useState(false);

    let listIndex = list.map((list) => {console.log("listid " + list.listid); return list.listid}).indexOf(id);
    console.log("id: " + id);
    console.log("listIndex: " + listIndex);


    function removeSelfFromList(userid, listIndex) {
        let userIndex = list[listIndex].users.map((user) => {return user.id}).indexOf(userid);

        list[listIndex].users.splice(userIndex, 1);
        setIsMember(false);
        setList([...list]);

        setShowConfirmDialog(false)

    }


        switch (type)
        {
            case 1:
                {
                    return (
                        <>
                            <div className="sidebar">
                                <h3 className="sidebar-header">
                                    {list[listIndex].name === undefined ? ("") : (list[listIndex].name + "'s")} Menu:
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
                            onConfirm={() => {removeSelfFromList(userState.id, listIndex)}}
                            onCancel={() => {setShowConfirmDialog(false)}}>
                                test
                            </ConfirmationDialog>
                            
                            </>
                    
                        )
                }
                case 2: {
                    return (
                        <div className="sidebar">
                                <h3 className="sidebar-header">
                                    Menu:
                                </h3>
                                <ul>
                                {userState.username === "guest" || userState.username === undefined ? ("") : (<li><AddListModal userid={userState.id}/></li>)}
                                </ul>
                            
                            </div>
                    );
                }
        }
    
}


export default Sidebar;