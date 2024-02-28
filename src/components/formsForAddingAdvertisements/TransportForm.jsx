import React from "react";
import { useTranslation } from "react-i18next";
import {Button, Form, FormGroup} from "react-bootstrap";

const TarnsportForm = ({
    title, setTitle,
    brand, setBrand,
    model, setModel,
    price, setPrice,
    year, setYear,
    meleage, setMeleage,
    body, setBody,
    color, setColor,
    transmission, setTransmission,
    drive, setDrive,
    wheel, setWheel,
    condition, setCondition,
    customs, setCustoms,
    phoneNumber, setPhoneNumber,
    description, setDescription,
    handleFileChange, photoUrls, handleSubmit
}) => {
    const { t } = useTranslation();
    return (
        <div>
            <FormGroup className="mb-3">
                <Form.Label>{t('title')}</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormGroup>
            <Form.Group className="mb-3">
                <Form.Label>{t('choice_mark')}</Form.Label>
                <Form.Select aria-label="Default select example" value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="Audi">Audi</option>
                    <option value="BMW">BMW</option>
                    <option value="Mersedes">Mersedes</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('input_model')}</Form.Label>
                <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('price')}</Form.Label>
                <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('input_year')}</Form.Label>
                <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2020" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('input_meleage')}</Form.Label>
                <Form.Control type="number" value={meleage} onChange={(e) => setMeleage(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('choice_body')}</Form.Label>
                <Form.Select aria-label="Default select example" value={body} onChange={(e) => setBody(e.target.value)}>
                    <option value="Седан">Седан</option>
                    <option value="Хэтчбек">Хэтчбек</option>
                    <option value="Универсал">Универсал</option>
                    <option value="Купе">Купе</option>
                    <option value="Кабоиолет">Кабоиолет</option>
                    <option value="Кроссовер">Кроссовер</option>
                    <option value="Внедорожник">Внедорожник</option>
                    <option value="Пикап">Пикап</option>
                    <option value="Минивен">Минивен</option>
                    <option value="Лимузин">Лимузин</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите цвет</Form.Label>
                <Form.Control type="text" value={color} onChange={(e) => setColor(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('choce_transmission')}</Form.Label>
                <Form.Select aria-label="Default select example" value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                    <option value="1">Механическая</option>
                    <option value="2">Автоматическая</option>
                    <option value="3">Варитор</option>
                    <option value="4">Двухсцепная</option>
                    <option value="5">Полуавтоматичская</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('choice_drive')}</Form.Label>
                <Form.Select aria-label="Default select example" value={drive} onChange={(e) => setDrive(e.target.value)}>
                    <option value="1">Полный</option>
                    <option value="2">Передний</option>
                    <option value="3">Задний</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('choice_wheel')}</Form.Label>
                <Form.Select aria-label="Default select example" value={wheel} onChange={(e) => setWheel(e.target.value)}>
                    <option value="1">Левое</option>
                    <option value="2">Правое</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('choice_condition')}</Form.Label>
                <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <option value="nev_cond">{t('new_cond')}</option>
                    <option value="bu_cond">{t('bu_cond')}</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('choice_customs')}</Form.Label>
                <Form.Control type="number" value={customs} onChange={(e) => setCustoms(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('phone_number')}</Form.Label>
                <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{t('description')}</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
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

export default TarnsportForm;