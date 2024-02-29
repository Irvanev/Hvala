import React from "react";
import { Form, Button, FormGroup } from "react-bootstrap"
import { useTranslation } from "react-i18next";

const EstateForm = ({ title, setTitle,
    price, setPrice,
    type, setType,
    roomsAmout, setRoomsAmount,
    area, setArea,
    owner, setOwner,
    phoneNumber, setPhoneNumber,
    description, setDescription,
    handleFileChange, handleSubmit, photoUrls

}) => {
    const { t } = useTranslation();
    return (
        <div>
            <FormGroup className="mb-3">
                <Form.Label>{t('title')}</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </FormGroup>
            <Form.Group className="mb-3">
                <Form.Select aria-label="Default select example" value={type} onChange={(e) => setType(e.target.value)}>
                    <option>{t('type')}</option>
                    <option value="house">{t('house')}</option>
                    <option value="garage">{t('garage')}</option>
                    <option value="aparment">{t('aparment')}</option>
                    <option value="commercial_real_estate">{t('commercial_real_estate')}</option>
                    <option value="room">{t('room')}</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('rooms_amount')}</Form.Label>
                <Form.Control type="number" value={roomsAmout} onChange={(e) => setRoomsAmount(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('price')}</Form.Label>
                <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('area')}</Form.Label>
                <Form.Control type="number" value={area} onChange={(e) => setArea(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select aria-label="Default select example" value={owner} onChange={(e) => setOwner(e.target.value)}>
                    <option>{t('owner_rent')}</option>
                    <option value="owner">{t('owner')}</option>
                    <option value="realtor">{t('realtor')}</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('phone_number')}</Form.Label>
                <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" value={description} onChange={(e) => setDescription(e.target.value)}>
                <Form.Label>{t('description')}</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>{t('photo')}</Form.Label>
                <Form.Control type="file" accept="image/*" multiple onChange={handleFileChange} />
            </Form.Group>
            <div className="mb-3">
                {photoUrls.map((file, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`preview ${index}`}
                        style={{ width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px' }}
                    />
                ))}
            </div>
            <div className="d-grid gap-2">
                <Button onClick={handleSubmit} variant="primary" size="lg">
                    {t('add')}
                </Button>
            </div>
        </div>
    );
}

export default EstateForm;