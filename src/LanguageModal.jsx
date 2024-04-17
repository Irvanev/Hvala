import { Modal, Button } from 'antd';
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


        <Modal open={show} onCancel={handleClose} footer={null} title="Choose your language">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button size='large' style={{ marginTop: '10px' }} onClick={() => changeLanguage('en')}>
                    <span style={{ marginRight: '8px' }}>
                        <Flag code="gb" height="16" />
                    </span>
                    English
                </Button>
                <Button size='large' style={{ marginTop: '10px' }} onClick={() => changeLanguage('ru')}>
                    <span style={{ marginRight: '8px' }}>
                        <Flag code="ru" height="16" /> Русский
                    </span>
                </Button>
                <Button size='large' style={{ marginTop: '10px' }} onClick={() => changeLanguage('sr')}>
                    <span style={{ marginRight: '8px' }}>
                        <Flag code="me" height="16" /> Crnogorski
                    </span>
                </Button>
            </div>
        </Modal>
    );
};

export default LanguageModal;