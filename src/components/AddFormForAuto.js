import {Button, Form} from "react-bootstrap";
import {useState} from 'react';

export const AddFormForAuto = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    }

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Выберите марку автомобиля</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите модель автомобиля</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите год выпуска</Form.Label>
                <Form.Control type="number" placeholder="2020"/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите пробег</Form.Label>
                <Form.Control type="number"/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите тип кузова</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите цвет</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите трансмиссию</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите привод</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">Полный</option>
                    <option value="2">Передний</option>
                    <option value="3">Задний</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите расположение руля</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">Левое</option>
                    <option value="2">Правое</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите состояние</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">Новое</option>
                    <option value="2">Б/У</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите количество владельцев</Form.Label>
                <Form.Control type="number"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Описание</Form.Label>
                <Form.Control as="textarea" rows={3}/>
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Фото</Form.Label>
                <Form.Control type="file" accept="image/*" multiple onChange={handleFileChange} />
            </Form.Group>
            <div className="mb-3">
                {selectedFiles.map((file, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`preview ${index}`}
                        style={{width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px'}}
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