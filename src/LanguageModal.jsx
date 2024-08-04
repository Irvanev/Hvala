import { Modal, List } from 'antd';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import { t } from 'i18next';

const LanguageModal = ({ show, handleClose }) => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
        handleClose();
    };

    const languages = [
        { key: 'en', name: t('English'), countryCode: 'GB' },
        { key: 'ru', name: t('Русский'), countryCode: 'RU' },
        { key: 'sr', name: t('Crnogorski'), countryCode: 'ES' },
        { key: 'sr', name: t('Hrvatski'), countryCode: 'HR' },
        { key: 'sr', name: t('Bosanski'), countryCode: 'BA' },
        { key: 'sr', name: t('Srbski'), countryCode: 'RS' },
      ];

    return (


        <Modal open={show} onCancel={handleClose} footer={null} title={t('choose_language')}>
            <List
                dataSource={languages}
                renderItem={item => (
                    <List.Item onClick={() => changeLanguage(item.key)} style={{ cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Flag code={item.countryCode} style={{ width: 24, height: 16, marginRight: 8 }} />
                            {item.name}
                        </div>
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default LanguageModal;