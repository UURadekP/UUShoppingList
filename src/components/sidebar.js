import React from "react";
import AddItemModal from "./addItemModal";
import AddUserModal from "./addUserModal";
import { Col, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import userContext from "../userContext";
import listContext from "../listContext";
import interfaceContext from "../interfaceContext";
import ConfirmationDialog from "./ConfirmationDialog";
import ChangeListNameModal from "./changeListNameModal";
import "../sidebar.css"
import AddListModal from "./addListModal";
import PieChartComponent from "./piechart";
import Collapsible from "react-collapsible";


const Sidebar = ({ id, type }) => {

    const { userState, setUserState } = useContext(userContext);
    const { list, setList, isOwner, setIsOwner, isMember, setIsMember } = useContext(listContext);
    const { darkMode, setDarkMode, language, setLanguage } = useContext(interfaceContext);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showChangeListNameModal, setShowChangeListNameModal] = useState(false);
    const [showChart, setShowChart] = useState(true);

    let completedItemCount = 0;
    let notCompletedItemCount = 0;

    let listIndex = list.map((list) => { return list.listid }).indexOf(id);

    if (type === 1) {
        list[listIndex].items.forEach((item) => {
            if (item.completed === true) {
                completedItemCount = completedItemCount + 1;
            } else {
                notCompletedItemCount = notCompletedItemCount + 1;
            }
        });
    }



    function removeSelfFromList(userid, listIndex) {
        let userIndex = list[listIndex].users.map((user) => { return user.id }).indexOf(userid);

        list[listIndex].users.splice(userIndex, 1);
        setIsMember(false);
        setList([...list]);

        setShowConfirmDialog(false)

    }


    switch (type) {
        case 1:
            {
                return (
                    <>
                        <div className={darkMode === true ? "sidebar" : "sidebarL"}>
                            <h3 className={darkMode === true ? "sidebar-header" : "sidebar-headerL"}>
                                {list[listIndex].name === undefined ? ("") : (language === "english" ? list[listIndex].name + "'s" : list[listIndex].name)} Menu:
                            </h3>
                            <ul className={darkMode === true ? "ul" : "ulL"}>

                                {isMember === true || isOwner === true || userState.group === "owners" ? (
                                    <li><AddItemModal id={id} type={"add"} /></li>
                                ) : ("")}

                                {userState.group === "owners" || isOwner === true ? (
                                    <li><AddUserModal id={id} type={"add"} /></li>
                                ) : ("")}

                                {isOwner === true ? (
                                    <li><ChangeListNameModal
                                        index={listIndex} /></li>
                                ) : ("")}

                                {isMember === true ? (
                                    <li><Button className={darkMode === true ? "button" : "buttonL"} onClick={() => { setShowConfirmDialog(true) }}>{language === "english" ? "Leave" : "Odejít"}</Button></li>
                                ) : ("")}

                                {isOwner === true ? (
                                    <li><AddUserModal id={id} type={"delete"} /></li>
                                ) : ("")}

                                {isMember === true || isOwner === true ? (
                                    <li><Button className={darkMode === true ? "button" : "buttonL"} onClick={() => { setShowChart(!showChart) }}>{language === "english" ? "Show Chart" : "Zobrazit Graf"}</Button></li>
                                ) : ("")}

                                {(isMember === true || isOwner === true) && showChart === true ? (
                                    <li>

                                        <PieChartComponent
                                            completed={completedItemCount}
                                            notCompleted={notCompletedItemCount}
                                        />


                                    </li>
                                ) : ("")

                                }



                            </ul>

                        </div>


                        <ConfirmationDialog
                            userLeave={language === "english" ? userState.username + " , you are about to leave shopping list ID: " + id : userState.username + ", Chystáte se opustit list s ID: " + id}
                            text={language === "english" ? "This action is irreversible" : "Tuto akci není možné vzít zpět"}
                            show={showConfirmDialog}
                            onConfirm={() => { removeSelfFromList(userState.id, listIndex) }}
                            onCancel={() => { setShowConfirmDialog(false) }}>
                            test
                        </ConfirmationDialog>

                    </>

                )
            }
        case 2: {
            return (
                <div className={darkMode === true ? "sidebar" : "sidebarL"}>
                    <h3 className={darkMode === true ? "sidebar-header" : "sidebar-headerL"}>
                        Menu:
                    </h3>
                    <ul className={darkMode === true ? "ul" : "ulL"}>
                        {userState.username === "guest" || userState.username === undefined ? ("") : (<li><AddListModal userid={userState.id} /></li>)}
                    </ul>

                </div>
            );
        }
    }

}


export default Sidebar;