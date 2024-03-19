import React from "react";
import { Form, Button, FormGroup } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import SelectBrandsForComputers from "../../select-brands/SelectBrandsForComputers";
import SelectTypeForComputer from "../../select-types/select-types-electronics/SelectTypesForComputers";

const ComputerForm = ({
    title, setTitle,
    price, setPrice,
    brand, setBrand,
    model, setModel,
    type, setType,
    condition, setCondition,
    phoneNumber, setPhoneNumber,
    description, setDescription,
    handleFileChange, photoUrls, handleSubmit
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
                <SelectBrandsForComputers brand={brand} setBrand={setBrand} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('model')}</Form.Label>
                <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <SelectTypeForComputer type={type} setType={setType} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('price')}</Form.Label>
                <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <option>{t('condition')}</option>
                    <option value="new_cond">{t('new_cond')}</option>
                    <option value="bu_cond">{t('bu_cond')}</option>
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
};

export default ComputerForm;