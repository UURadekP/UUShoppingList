import React, { useContext } from "react";
import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import ConfirmationDialog from "./ConfirmationDialog";
import listContext from "../listContext";



const ShoppingListItem = ({item, index, onDelete}) => {

    const [ showConfirmDialog, setShowConfirmDialog] = useState(false);
    const {list, setList, isOwner, setIsOwner} = useContext(listContext);

    const handleCheck = () => { 

        list[index].items[list[index].items.indexOf(item)].completed = !list[index].items[list[index].items.indexOf(item)].completed;
        setList([...list])
    }


    return(<>
        <div 
            style={
                item.completed == true  
              ? ({background: 'linear-gradient(155deg, rgba(255,255,255,1) 0%, rgba(163,163,163,1) 51%)', width: '95%', height: '100%',fontSize:'2.5em', marginTop:'1%',border: '0.2vw solid green'}) 
              : ({background: 'linear-gradient(155deg, rgba(255,255,255,1) 0%, rgba(163,163,163,1) 51%)', width: '95%', height: '100%',fontSize:'2.5em', marginTop:'1%', border: '0.2vw solid red'})}>
        <div>
            <p>
                {item.name + " "}
                {item.amount + item.unit}
            </p>
        </div>
        <div style={{display: 'inline-flex', float:'right'}}>
        
        <input onChange={handleCheck}  
            type="checkbox" 
            defaultChecked={item.completed}
            style={{width: '50px', height:'50px' }}></input>
        { isOwner === true ? (
        <Button 
        onClick={() => {setShowConfirmDialog(true)}}
        style={{width: '50px', height:'50px', justifyContent:'center', marginLeft:'5%', marginBottom: '5%', marginRight:'1%' }}><i className="fa fa-trash-o" style={{fontSize:'25px'}}></i></Button>) : ("")}
        </div>

        
        </div>

        <ConfirmationDialog itemDelete={"You are about to delete " + item.name}
        show={showConfirmDialog}
        onConfirm={() => {
            onDelete(index, item.id);
        }}
        onCancel={() => {setShowConfirmDialog(false)}}>
            test
        </ConfirmationDialog>
        </>
    )
}


export default ShoppingListItem;