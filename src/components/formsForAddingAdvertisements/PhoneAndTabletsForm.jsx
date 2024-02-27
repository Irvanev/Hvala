import React from "react";
import {Form, Button, FormGroup} from "react-bootstrap"

const PhoneAndTabletsForm = ({ title, setTitle,
    price, setPrice,
    brand, setBrand,
    model, setModel,
    screen_size, setScreenSize,
    memory, setMemory,
    condition, setCondition,
    description, setDescription,
    handleFileChange, photoUrls, handleSubmit

}) => {
    return (
        <div>
            <FormGroup className="mb-3">
                <Form.Label>Название</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </FormGroup>
            <Form.Group className="mb-3">
                <Form.Label>Выберите бренд</Form.Label>
                <Form.Select aria-label="Default select example" value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option>Brand</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Apple">Apple</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Huawei">Huawei</option>
                    <option value="Honor">Honor</option>
                    <option value="HTC">HTC</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Realme">Realme</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите модель</Form.Label>
                <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Цена</Form.Label>
                <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите размер экрана</Form.Label>
                <Form.Control type="number" placeholder="6.7" value={screen_size} onChange={(e) => setScreenSize(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите память</Form.Label>
                <Form.Control type="number" value={memory} onChange={(e) => setMemory(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите состояние</Form.Label>
                <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <option>Состояние</option>
                    <option value="new_cond">Новое</option>
                    <option value="bu_cond">Б/У</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" value={description} onChange={(e) => setDescription(e.target.value)}>
                <Form.Label>Описание</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Фото</Form.Label>
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
                    Добавить
                </Button>
            </div>
        </div>
    );
}

export default PhoneAndTabletsForm;