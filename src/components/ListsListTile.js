import React, {useState, useContext} from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import userContext from "../userContext";
import listContext from "../listContext";
import ConfirmationDialog from "./ConfirmationDialog";




const ListsListTile = ({oneList, isOwner, isMember}) => {

    const {list, setList} = useContext(listContext);
    const {userState, setUserState} = useContext(userContext);
    const [ showConfirmDialog, setShowConfirmDialog] = useState(false);


    function deleteList(lists, oneList) {
        let listIndex = lists.map((list) => { return list.listid}).indexOf(oneList.listid);

        list.splice(listIndex, 1);
        setList([...list])
        setShowConfirmDialog(false);
        console.log(list);
    }

    function archiveList(lists, oneList) {
        let listIndex = lists.map((list) => { return list.listid}).indexOf(oneList.listid);

        lists[listIndex].archived = true;
        setList([...lists]);

    }

    function unArchiveList(lists, oneList) {
        let listIndex = lists.map((list) => { return list.listid}).indexOf(oneList.listid);

        lists[listIndex].archived = false;
        setList([...lists]);

    }

    return (
    <>
    <div style={
        
        oneList.archived === false ?  ({background: 'linear-gradient(155deg, rgba(255,255,255,1) 0%, rgba(163,163,163,1) 51%)', display:'inline-flex', width: '95%', height: '100%',fontSize:'1em', marginTop:'1%',paddingRight:'2%', border: '0.2vw solid black'})
        : ({background: 'linear-gradient(155deg, rgba(255,255,255,1) 0%, rgba(163,163,163,1) 51%)', display:'inline-flex', width: '95%', height: '100%',fontSize:'1em', marginTop:'1%',paddingRight:'2%', border: '0.2vw solid black', opacity:'0.5'})
    
    }>
    
    <Link to={`/list/${oneList.listid}`} style={{width:'95%', height:'100%', color:'black'}}>
    <Col>
    <Row>
        <p>{oneList.name}</p>
    </Row>
    <Row>
        <p>abc</p>
    </Row>
    </Col>
    </Link>
    <Col>
    <Row>
        <p>
        { userState.id === oneList.ownerid ? (
        <Button 
        onClick={() => {setShowConfirmDialog(true)}}
        style={{width: '75px', height:'75px', justifyContent:'center', marginTop: '5%' }}><i className="fa-solid fa-trash-can" style={{fontSize:'25px'}}></i></Button>) : ("")}
        </p>
    </Row>
    <Row>
        <p>
        { userState.id === oneList.ownerid && oneList.archived === false ? (
        <Button 
        onClick={() => {archiveList(list, oneList)}}
        style={{width: '75px', height:'75px', justifyContent:'center', marginTop: '5%' }}><i className="fa-solid fa-box" style={{fontSize:'25px'}} ></i></Button>) 
        : 
        (
        <Button 
        onClick={() => {unArchiveList(list, oneList)}}
        style={{width: '75px', height:'75px', justifyContent:'center', marginTop: '5%' }}><i class="fa-solid fa-box-open" style={{fontSize:'25px'}}></i></Button>)
        }
        </p>
    </Row>
    </Col>
    </div>
    
    
    <ConfirmationDialog itemDelete={"Are you sure?"}
        show={showConfirmDialog}
        onConfirm={() => {
            deleteList(list, oneList);
        }}
        onCancel={() => {setShowConfirmDialog(false)}}>
            test
    </ConfirmationDialog>




    </>
    )
}

export default ListsListTile;