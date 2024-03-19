// В файле DeleteModal.jsx
import { useState } from 'react';
import { Button, Modal, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { deleteAdvertisement } from '../../services/ProfileService';
import { useHistory } from 'react-router-dom';

export default function DeleteModal({ advertisment }) {
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const handleDelete = async (id) => {
        await deleteAdvertisement(id);
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEdit = () => {
        history.push(`/edit/${advertisment.id}`);
    };

    return (
        <Dropdown align="end">
            <Dropdown.Toggle variant="none" id="dropdown-basic">
                <FontAwesomeIcon icon={faEllipsisV} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={handleEdit}>Редактировать</Dropdown.Item>
                <Dropdown.Item onClick={handleShowModal}>Удалить</Dropdown.Item>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы уверены, что хотите удалить этот элемент?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Отмена
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(advertisment.id)}>
                            Удалить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Dropdown.Menu>
        </Dropdown>
    );
}