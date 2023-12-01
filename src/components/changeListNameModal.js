import React from "react"
import { Modal, Button, Form, Alert } from "react-bootstrap"
import { useState, useContext } from "react";
import listContext from "../listContext";
import interfaceContext from "../interfaceContext";


function ChangeListNameModal({ index }) {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const {list, setList} = useContext(listContext);
    const {darkMode, language} = useContext(interfaceContext);

    let newName = "";

    const onSubmit = (event) => {
      event.preventDefault();
    }

    function changeListName(newName, index) {
        list[index].name = newName;
        setList([...list]);
        handleClose();
    }

    
    return (
    <>

        <Button variant="primary" className={darkMode === true ? "button" : "buttonL"} onClick={handleShow}>
        {language === "english" ? "Change List Name" : "Změnit jméno listu"}
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{language === "english" ? "Change List Name:" : "Změnit jméno listu:"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form onSubmit={onSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>{language === "english" ? "List Name" : "Jméno listu"}:</Form.Label>
                <Form.Control
                  placeholder={language === "english" ? "New List Name" : "Nové jméno listu"}
                  onChange={(event) => {newName = event.target.value}}
                />
              </Form.Group>
              </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
          variant="primary"
          type="submit"
           onClick={() => {changeListName(newName, index)}}>
            {language === "english" ? "Confirm" : "Potvrdit"}
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>



    );
}

export default ChangeListNameModal;