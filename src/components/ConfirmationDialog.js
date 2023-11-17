import { Modal, Button } from "react-bootstrap";

const ConfirmationDialog = (props) => {
    return (
        <Modal show={props.show} onHide={props.onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{props.userLeave} {props.itemDelete}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This action is irreversible!
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onCancel} variant='secondary'>Cancel</Button>
                <Button onClick={props.onConfirm} variant='primary'>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationDialog;