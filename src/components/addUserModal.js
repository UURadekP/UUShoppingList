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



function AddUserModal({ id, type }) {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const {list, setList} = useContext(listContext);
    const [Fail, setFail] = useState(false);
    const [dupe, setDupe] = useState(false);

    const newUser = {
      username: '',
      id: ''
    }

    const [formState, setFormState] = useState(newUser);



    const onSubmit = (event) => {
      event.preventDefault();
    }

    function visualAlertRemoval() {
      if (Fail === true) {
        setFail(false);
      }
      if (dupe === true) {
        setDupe(false);
      }
    }

    function addUserToList(formState, id, users) {

      visualAlertRemoval();

      //get list index
      let listIndex = list.map((list) => {return list.listid}).indexOf(id)

      //getUser's id from username
      let userIndex = users.map((user) => {return user.username}).indexOf(formState.username);

      console.log("userIndex: " + userIndex);

      // validace exietnce usera
      if (userIndex == -1) {
        setFail(true);
        setDupe(false);
        return;
      }
      
      let num = users[userIndex].id;
      var object = {id: num}

      //validace duplicity usera v listu
      if (list[listIndex].users.find((user) => user.id === num) === undefined ) {
        list[listIndex].users.push(object);
        setList([...list]);
        handleClose();
      } else {
        setFail(false);
        setDupe(true);
        return;
      }

      



    }

    function removeUserFromList(formState, id, users) {

      visualAlertRemoval();

      //get list index
      let listIndex = list.map((list) => {return list.listid}).indexOf(id);


      let userIndex = users.map((user) => {return user.username}).indexOf(formState.username.toLowerCase());

      //get user's id
      let userid = users[userIndex].id;

      let userIndexInList = list[listIndex].users.map((user) => {return user.id}).indexOf(userid);

      // validace exietnce usera
      if (userIndexInList == -1) {
        setFail(true);
        return; 
      }

      list[listIndex].users.splice(userIndexInList, 1);
      setList([...list]);
      handleClose();
    }


    return (
    <>

        <Button variant="primary" className="button" onClick={handleShow}>
        {type === "add" ? ("Add user") : ("Remove user")}
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form onSubmit={onSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Username</Form.Label>
                {Fail === true ? ( <Alert variant='danger'>This user doesn't exist!</Alert>) : ("")}
                {dupe === true ? ( <Alert variant='danger'>This user is already added!</Alert>) : ("")}
                <Form.Control
                  placeholder="Username"
                  onChange={(event) => {formState.username = event.target.value}}
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
           onClick={() => {type === "add" ? (addUserToList(formState, id, users)) : (removeUserFromList(formState, id, users))}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>



    );
}

export default AddUserModal;