import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';

const LanguageModal = ({ show, handleClose }) => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Choose your language</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-between">
                <Button variant="light" onClick={() => changeLanguage('en')}>
                    <Flag code="gb" height="16" /> English
                </Button>
                <Button variant="light" onClick={() => changeLanguage('ru')}>
                    <Flag code="ru" height="16" /> Русский
                </Button>
                <Button variant="light" onClick={() => changeLanguage('sr')}>
                    <Flag code="me" height="16" /> Crnogorski
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default LanguageModal;