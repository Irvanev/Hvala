import React from "react";
import { Modal, Button } from "antd";

const ModalForNumberPhone = ({adData, showModal, handleCloseModal}) => {
    return (
        <Modal title="Номер телефона" open={showModal} onCancel={handleCloseModal} footer={null}>
            <h3>{adData?.phone || 'Номер не указан'}</h3>
        </Modal>
    );
}

export default ModalForNumberPhone;