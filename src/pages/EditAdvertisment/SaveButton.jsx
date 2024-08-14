import React from 'react';
import { Button, Spin, Form } from 'antd';

const SaveButton = ({ loading, handleSubmit, t }) => {
    return (
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin style={{ color: '#03989F' }} spinning={loading}>
                <Button onClick={handleSubmit} style={{ backgroundColor: '#FFBF34', border: 'none', color: 'white' }} size="large">
                    {t('save')}
                </Button>
            </Spin>
        </Form.Item>
    );
};

export default SaveButton;