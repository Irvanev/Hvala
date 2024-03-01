import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalForNumberPhone = ({adData, showModal, handleCloseModal}) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Номер телефона</Modal.Title>
            </Modal.Header>
            <Modal.Body>{adData?.phone}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalForNumberPhone;