import React, { useContext } from "react";
import ShoppingListItem from "./shoppingListItem";
import { Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import userContext from "../userContext";
import listContext from "../listContext";
import interfaceContext from "../interfaceContext";
import "../sidebar.css";




const ShoppingList = ({id}) => {
    
    let index;

    const {list, setList, isOwner, setIsOwner, isMember ,setIsMember} = useContext(listContext);
    const { darkMode, setDarkMode, language, setLanguage } = useContext(interfaceContext);
    const {userState, setUserState} = useContext(userContext);
    const [search, setSearch] = useState("");
    const [filterByNotChecked, setFilterByNotChecked] = useState(false);
    const [filterByChecked, setFilterByChecked] = useState(false);

    function onDelete(listIndex, id) {

        let itemIndex = list[listIndex].items.map(function(item) {return item.id;}).indexOf(id);

        if (index === -1) {
            return
        }

        list[listIndex].items.splice(itemIndex, 1);
        console.log(list);
        setList([...list]);


        
    }
    function getIndexByID(id) {
        let listIndex = list.map((list) => {return list.listid}).indexOf(id)
        return listIndex;
    }
    
    const listIndex = getIndexByID(id);


    function getUserStatus(list, listIndex) {

        if (listIndex === -1) {
            return
        }

        if (list[listIndex].ownerid === userState.id) {
            if (isOwner === false) {
            setIsOwner(true);
            }

        } else if (list[listIndex].users.map((user) => {return user.id}).indexOf(userState.id) !== -1) {


            if (isOwner === true) {
                setIsOwner(false);

                }
            setIsMember(true);
        }

    }
        getUserStatus(list, listIndex);

        function removeFilters() {
            setFilterByChecked(false);
            setFilterByNotChecked(false);
        }

        function Checked() {
            setFilterByChecked(true)
            setFilterByNotChecked(false);
        }

        function notChecked() {
            setFilterByChecked(false)
            setFilterByNotChecked(true);
        }


    


    return(<>


        <div className="shoppingList">
             <div className={ darkMode === true ? "searchDiv" : "searchDivL"}>
                <Button className={ darkMode === true ? "searchbarButton" : "searchbarButtonL"} onClick={() => {
                     Checked();
                }}>Checked filter</Button>
                <Button className={ darkMode === true ? "searchbarButton" : "searchbarButtonL"} onClick={() => {
                    notChecked();
                }}
                >Unchecked filter</Button>
                <Button className={ darkMode === true ? "searchbarButton" : "searchbarButtonL"} onClick={() => { removeFilters();
                }}>Remove Filters</Button>
                <input
                    className="searchBar"
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                </div>
            <Row>{
            //kontrola přístupu
                list[listIndex].ownerid === userState.id || list[listIndex].users.map((user) => { return user.id }).indexOf(userState.id) !== -1 ? (

                    list[listIndex].items.map((item) => {
                        //filtry
                        if (item.name.includes(search.toLowerCase()) === true || search === "") {

                        if (filterByChecked === false && filterByNotChecked === false) {
                            return (
                                <Col key={item.id} className='d-flex justify-content-center' md={4} lg={4} xl={4} xxl={4}>
                                    <ShoppingListItem
                                        item={item}
                                        index={listIndex}
                                        onDelete={onDelete} />
                                </Col>)
                            
                        }
                        
                        if (item.completed === true && filterByChecked === true) {

                            
                            return (
                                <Col key={item.id} className='d-flex justify-content-center' md={4} lg={4} xl={4} xxl={4}>
                                    <ShoppingListItem
                                        item={item}
                                        index={listIndex}
                                        onDelete={onDelete} />
                                </Col>)
                                
                        } else if (item.completed === false && filterByNotChecked === true) {
                            return (
                                <Col key={item.id} className='d-flex justify-content-center' md={4} lg={4} xl={4} xxl={4}>
                                    <ShoppingListItem
                                        item={item}
                                        index={listIndex}
                                        onDelete={onDelete} />
                                </Col>)
                                }
                             } 
                                }
                        
                    )   
                    ) : ("")
                        }
            
            </Row>
    
        </div>
    
    

        </> )
}

export default ShoppingList;