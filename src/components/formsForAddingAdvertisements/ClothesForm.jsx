import { FormGroup, Form, Button } from "react-bootstrap";
import React from "react";

const ClothesForm = ({ title, setTitle, 
    price, setPrice, 
    size, setSize, 
    brand, setBrand, 
    condition, setCondition, 
    description, setDescription, 
    handleFileChange, photoUrls 
}) => {
    return (
        <div>
            <FormGroup className="mb-3">
                <Form.Label>Название</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormGroup>
            <Form.Group className="mb-3">
                <Form.Label>Цена</Form.Label>
                <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите размер</Form.Label>
                <Form.Select aria-label="Default select example" value={size} onChange={(e) => setSize(e.target.value)}>
                    <option>Размер</option>
                    <option value="XXS">XXS</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                    <option value="4XL">4XL</option>
                    <option value="5XL">5XL</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите бренд одежды</Form.Label>
                <Form.Control type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите состояние</Form.Label>
                <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <option>Состояние</option>
                    <option value="new_cond">Новое</option>
                    <option value="bu_cond">Б/У</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Описание</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
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
                <Button variant="primary" size="lg">
                    Добавить
                </Button>
            </div>
        </div>
    );
}

export default ClothesForm;