import React from "react"
import { Modal, Button, Form, Alert } from "react-bootstrap"
import { useState, useContext } from "react";
import listContext from "../listContext";

const users = [
  { username: 'radek', password: '1234', group: 'owners', id: '1' },
  { username: 'pepa', password: '1234', group: 'owners', id: '2' },
  { username: 'honza', password: '1234', group: 'registered', id: '3' },
  { username: 'david', password: '1234', group: 'registered', id: '4' },
  { username: 'janek', password: '1234', group: 'registered', id: '5' },
  { username: 'guest', password: '', group: 'guest', id: '6' },
];



function ChangeListNameModal({ index }) {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const {list, setList} = useContext(listContext);

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

        <Button variant="primary" className="button" onClick={handleShow}>
        Change List Name
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change List Name:</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form onSubmit={onSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>List Name:</Form.Label>
                <Form.Control
                  placeholder="New List Name"
                  onChange={(event) => {newName = event.target.value}}
                />
              </Form.Group>
              </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
          variant="primary"
          type="submit"
           onClick={() => {changeListName(newName, index)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>



    );
}

export default ChangeListNameModal;