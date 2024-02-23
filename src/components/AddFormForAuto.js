import {Button, Form, FormGroup} from "react-bootstrap";
import {useState} from 'react';

export const AddFormForAuto = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    }

    return (
        <div>
            <FormGroup className="mb-3">
                <Form.Label>Название</Form.Label>
                <Form.Control
                    type="text"
                />
            </FormGroup>
            <Form.Group className="mb-3">
                <Form.Label>Выберите марку автомобиля</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Brand</option>
                    <option value="1">Audi</option>
                    <option value="2">BMW</option>
                    <option value="3">Mersedes</option>
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
                    <option>Кузов</option>
                    <option value="1">Седан</option>
                    <option value="2">Хэтчбек</option>
                    <option value="3">Универсал</option>
                    <option value="4">Купе</option>
                    <option value="5">Кабоиолет</option>
                    <option value="6">Кроссовер</option>
                    <option value="7">Внедорожник</option>
                    <option value="8">Пикап</option>
                    <option value="9">Минивен</option>
                    <option value="10">Лимузин</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите цвет</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите трансмиссию</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Трансмиссия</option>
                    <option value="1">Механическая</option>
                    <option value="2">Автоматическая</option>
                    <option value="3">Варитор</option>
                    <option value="4">Двухсцепная</option>
                    <option value="5">Полуавтоматичская</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите привод</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Привод</option>
                    <option value="1">Полный</option>
                    <option value="2">Передний</option>
                    <option value="3">Задний</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите расположение руля</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Руль</option>
                    <option value="1">Левое</option>
                    <option value="2">Правое</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Выберите состояние</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Состояние</option>
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