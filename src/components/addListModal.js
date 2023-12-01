import React, { useState, useContext } from "react"
import { Form, Button, Modal, Alert} from "react-bootstrap";
import listContext from "../listContext";
import userContext from "../userContext";
import "../sidebar.css"
import interfaceContext from "../interfaceContext";

const AddListModal = ({userid}) => {
    const {list, setList} = useContext(listContext);
    const {darkMode, language} = useContext(interfaceContext);

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
        <Button variant="primary" className={darkMode === true ? "button" : "buttonL"} onClick={handleShow}>
        {language === "english" ? "Add List" : "Vytvořit list"}
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{language === "english" ? "Add List" : "Vytvořit list"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form onSubmit={onSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Username</Form.Label>
                {Required === true ? ( <Alert variant='danger'>{language === "english" ? "This field cannot be empty" : "Toto pole nesmí být prázdné"}</Alert>) : ("")}
                {tooLong === true ? ( <Alert variant='danger'>{language === "english" ? "Name can only be up to 24 letters long" : "Jméno může byt maximálně 24 znaků dlouhé"}.</Alert>) : ("")}
                <Form.Control
                  placeholder="List Name"
                  onChange={(event) => {formState.name = event.target.value}}
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
           onClick={() => {addList(list, formState)}}>
            {language === "english" ? "Confirm" : "Potvrdit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )

}

export default AddListModal;