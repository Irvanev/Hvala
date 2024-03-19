import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalForNumberReports = ({handleClose, reviews, show}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Отзывы</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id}>
                            <h5>{review.description}</h5>
                        </div>
                    ))
                ) : (
                    <p>Нет отзывов</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalForNumberReports;