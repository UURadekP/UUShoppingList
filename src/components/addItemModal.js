import React, { useContext } from "react"
import { useState } from "react";
import { Form, Button, Modal, Alert, Col, Row} from "react-bootstrap";
import itemContext from "../itemContext";
import listContext from "../listContext";
import userContext from "../userContext";
import "../sidebar.css"







const AddItemModal = ({ id }) => {

    const [show, setShow] = useState(false);
    const [tooLong, setTooLong] = useState(false);
    const [textinAmount, setTextinAmount] = useState(false);
    const [negative, setNegative] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const itemToState = {
      name: "1",
      id: '',
      amount: 2,
      unit: "g",
      complete: false,
    }


    const [formState, setFormState] = useState(itemToState);

    
    


    const onSubmit = (event) => {
      event.preventDefault();
    }

    const {items, setItems, isOwner, setIsOwner} = useContext(itemContext);
    const {list, setList} = useContext(listContext)
    const {userState, setUserState} = useContext(userContext);

    

    function onAddNewItem(formState, id) {

      //index listu

      let listIndex = list.map((list) => {return list.listid}).indexOf(id);


      //menší validace + visuální update
      if (formState.name.length > 24) {
        setTooLong(true);
        return;
      }

      if (formState.amount <= 0) {
        setNegative(true);
        setTextinAmount(false);
        return;
      } else if (isNaN(formState.amount) === true) {
        setTextinAmount(true);
        setNegative(false);
        return;
      }

      formState.id =  Math.floor(Math.random()*10e12)

      list[listIndex].items.push(formState);
      setList([...list]);

      setFormState(itemToState);
      handleClose();
      
      
  }



    return (
    <>
        <Button variant="primary" className="button" onClick={handleShow}>
          Add Item
        </Button>

        <Modal 
        size="md"
        show={show} 
        onHide={handleClose}>
          <Modal.Header className="addItemModalEntryRest" closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header >
          <Modal.Body dialogClassName="addItemModal" >

            <Form onSubmit={onSubmit}>

              <Form.Group>
                <Form.Label>Item name</Form.Label>
                {tooLong === true ? ( <Alert variant='danger'>This name is too long!</Alert>) : ("")}
                <Form.Control
                  className='addModalFormEntryItemName'
                  onChange={(event) => formState.name = event.target.value}
                />
              </Form.Group>

              <Row md={1} lg={1} xl={1} xxl={1}>
                <Col md={3} lg={3} xl={3} xxl={3}>
          
              <Form.Group >
                <Form.Label>Amount</Form.Label>
                {textinAmount === true ? ( <Alert variant='danger'>Only number is expected!</Alert>) : ("")}
                {negative === true ? ( <Alert variant='danger'>Number can't be negative!</Alert>) : ("")}
                <Form.Control
                  type="number"
                  onChange={(event) => {formState.amount = event.target.valueAsNumber}}
                />
              </Form.Group>
              </Col>
              <Col md={5} lg={5} xl={5} xxl={5}>
              <Form.Group
                style={{marginLeft:'50%'}}>
              <Form.Label>Unit</Form.Label>
                <Form.Select
                onChange={(event) => formState.unit = event.target.value}
                >
                  <option value="l">l</option>
                  <option value="g">g</option>
                  <option value="pc">pc</option>
                </Form.Select>
              </Form.Group>
            
            </Col>
        </Row>

              


          <Button 
          variant="secondary" 
          className="addItemModalButtons" 
          onClick={handleClose}>
            Close
          </Button>
          <Button 
          variant="primary"
          className="addItemModalButtons"
          type="submit"
          onClick={() => {
            onAddNewItem(formState, id)}}
          >
          Submit
        </Button>
        </Form>

        </Modal.Body>
      </Modal>
    
    </>
    );
}


export default AddItemModal;