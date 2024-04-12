import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, FormGroup } from "react-bootstrap";

const TarnsportForm = ({
    title, setTitle,
    brand, setBrand,
    model, setModel,
    price, setPrice,
    year, setYear,
    mileage, setMileage,
    body, setBody,
    color, setColor,
    transmission, setTransmission,
    drive, setDrive,
    wheel, setWheel,
    condition, setCondition,
    owners, setOwners,
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
                <Form.Select aria-label="Default select example" value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option>{t('choice_mark')}</option>
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
                <Form.Control type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select aria-label="Default select example" value={body} onChange={(e) => setBody(e.target.value)}>
                    <option>{t('choice_body')}</option>
                    <option value="sedan">{t('sedan')}</option>
                    <option value="hatchback">{t('hatchback')}</option>
                    <option value="station_wagon">{t('station_wagon')}</option>
                    <option value="coupe">{t('coupe')}</option>
                    <option value="convertible">{t('convertible')}</option>
                    <option value="crossover">{t('crossover')}</option>
                    <option value="Внедорsuv_sport_utility_vehicleожник">{t('Внедорsuv_sport_utility_vehicleожник')}</option>
                    <option value="pickup_truck">{t('pickup_truck')}</option>
                    <option value="minivan">{t('minivan')}</option>
                    <option value="Limousine">{t('Limousine')}</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('enter_color')}</Form.Label>
                <Form.Control type="text" value={color} onChange={(e) => setColor(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select aria-label="Default select example" value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                    <option>{t('choce_transmission')}</option>
                    <option value="manual_t">{t('manual_t')}</option>
                    <option value="auto_t">{t('auto_t')}</option>
                    <option value="semi_auto_t">{t('semi_auto_t')}</option>
                    <option value="dual_clutch_t">{t('dual_clutch_t')}</option>
                    <option value="continuously_t">{t('continuously_t')}</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select aria-label="Default select example" value={drive} onChange={(e) => setDrive(e.target.value)}>
                    <option>{t('choice_drive')}</option>
                    <option value="fwd">{t('fwd')}</option>
                    <option value="rwd">{t('rwd')}</option>
                    <option value="awd">{t('awd')}</option>
                    <option value="four_wd">{t('four_wd')}</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select aria-label="Default select example" value={wheel} onChange={(e) => setWheel(e.target.value)}>
                    <option>{t('choice_wheel')}</option>
                    <option value="left_hand_drive">{t('left_hand_drive')}</option>
                    <option value="right_hand_drive">{t('right_hand_drive')}</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <option>{t('choice_condition')}</option>
                    <option value="condition_new">{t('condition_new')}</option>
                    <option value="used">{t('used')}</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t('choice_customs')}</Form.Label>
                <Form.Control type="number" value={owners} onChange={(e) => setOwners(e.target.value)} />
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