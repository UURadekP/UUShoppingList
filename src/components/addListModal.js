import React, { useState, useContext } from "react"
import { Form, Button, Modal, Alert} from "react-bootstrap";
import listContext from "../listContext";
import userContext from "../userContext";
import "../sidebar.css"

const AddListModal = ({userid}) => {
    const {list, setList} = useContext(listContext);

    const listToState = {
        name: "",
        listid: Math.floor(Math.random()*10e12),
        archived: false,
        items: [],
        ownerid: userid,
        users: []
    }


    const [formState, setFormState] = useState(listToState);
    const [show, setShow] = useState(false);
    const [Required, setRequired] = useState(false);
    const [tooLong, setTooLong] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = (event) => {
        event.preventDefault();
      }

    function addList(list, formState) {
        //validace
        if (formState.name.length > 24) {
            setTooLong(true);
            setRequired(false);
            return;
        }

        if (formState.name.length === 0) {
            setRequired(true);
            setTooLong(false);
            return;
        }

        list.push(formState);
        setList([...list]);
        setFormState(listToState)
        handleClose();
    }

    return (
    <>
        <Button variant="primary" className="button" onClick={handleShow}>
          Add list
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add List</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form onSubmit={onSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Username</Form.Label>
                {Required === true ? ( <Alert variant='danger'>This field cannot be empty!</Alert>) : ("")}
                {tooLong === true ? ( <Alert variant='danger'>The name can only be up to 24 letters long.</Alert>) : ("")}
                <Form.Control
                  placeholder="List Name"
                  onChange={(event) => {formState.name = event.target.value}}
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
           onClick={() => {addList(list, formState)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )

}

export default AddListModal;