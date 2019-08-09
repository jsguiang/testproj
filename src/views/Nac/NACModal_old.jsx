import React from 'react';
import { Modal } from 'react-bootstrap';
import Draggable, { DraggableCore } from 'react-draggable';
import "assets/css/modal.css";

const NACModal = ({ item, onItemChange, ...rest }) => (
    <Draggable>
    <Modal {...rest} bsSize="medium" >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Acceptance Criteria Details</Modal.Title>
        </Modal.Header>

{/*         <Modal.Body>
            <h4>Details</h4>
            <input
                type="text"
                value={item.desc}
                name="name"
                onChange={onItemChange(item.id)}
            />
        </Modal.Body> */}

        <Modal.Footer />
        </Modal>
        </Draggable>
)

export default NACModal
