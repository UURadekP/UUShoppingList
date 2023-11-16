import React, {useState, useContext} from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import userContext from "../userContext";
import listContext from "../listContext";
import ConfirmationDialog from "./ConfirmationDialog";


const ListsListTile = ({list, isOwner, isMember}) => {

    const {setList} = useContext(listContext);
    const {userState, setUserState} = useContext(userContext);
    const [ showConfirmDialog, setShowConfirmDialog] = useState(false);

    function deleteList() {

    }

    function archiveList() {

    }

    return (
    <>
    <Link to={`/list/${list.listid}`} style={{width:'95%', height:'100%', color:'black'}}>
    <div style={{background: 'linear-gradient(155deg, rgba(255,255,255,1) 0%, rgba(163,163,163,1) 51%)', display:'inline-flex', width: '95%', height: '100%',fontSize:'1em', marginTop:'1%',border: '0.2vw solid black'}}>
    <Col>
    <Row>
        <p>{list.name}</p>
    </Row>
    <Row>
        <p>abc</p>
    </Row>
    </Col>
    
    <Col>
    <Row>
        <p>
        { userState.id === list.ownerid ? (
        <Button 
       onClick={() => {setShowConfirmDialog(true)}}
        style={{width: '50px', height:'50px', justifyContent:'center', marginLeft:'5%', marginBottom: '5%', marginRight:'1%' }}><i className="fa fa-trash-o" style={{fontSize:'25px'}}></i></Button>) : ("")}
        </p>
    </Row>
    <Row>
        <p>abc</p>
    </Row>
    </Col>
    </div>
    </Link>
    
    <ConfirmationDialog itemDelete={"You are about to delete " + list.name}
        show={showConfirmDialog}
        onConfirm={() => {
            deleteList();
        }}
        onCancel={() => {setShowConfirmDialog(false)}}>
            test
    </ConfirmationDialog>




    </>
    )
}

export default ListsListTile;