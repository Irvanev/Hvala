import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

const ModalForNumberPhone = ({adData, showModal, handleCloseModal}) => {
    const { t } = useTranslation();
    return (
        <Modal title={t('phone_number')} open={showModal} onCancel={handleCloseModal} footer={null}>
            <h3>{adData?.phone || t('number_is_not_specified')}</h3>
        </Modal>
    );
}

export default ModalForNumberPhone;