import LogoSearch from "../assets/hvala.png";
import { Link } from "react-router-dom";
import { Filter, List, Search } from "react-bootstrap-icons";
import { useState } from "react";
import { Image, Row, Col } from "react-bootstrap";

import {
  Container,
  Form,
  ListGroup,
  InputGroup,
  Button,
  Offcanvas,
  FormControl,
} from "react-bootstrap";

const Categories = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  return (
    <div>

      <style type="text/css">
        {`
        .list-group a {
          text-decoration: none;
          color: black;
          }
          .list-group a:hover {
              color: #ffa600;
          }
        `}
        </style>

      <Container id="advertMedia" className="d-none d-lg-block">
        <Form className="d-flex py-4">
          <a href="/advertisment">
            <img
              src={LogoSearch}
              alt="Logo"
              style={{ marginRight: "10px", width: "140px" }}
            />
          </a>
          <button
            className="btn btn me-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            style={{ backgroundColor: "#ffa600", color: "azure" }}
          >
            Категории
          </button>

          <div
            className="collapse"
            id="collapseExample"
            style={{
              position: "absolute",
              zIndex: 1,
              top: "16%",
              boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.5)",
            }}
          >
            <ListGroup id="categories"y>
              <ListGroup.Item>
                <Link to="/advertisments/estate">Недвижимость</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/transport">Транспорт</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/clothes">Одежда</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/electronics">Электроника</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/house_goods">Товары для дома</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/building_materials_and_tools">
                  Стройматериалы и инструменты
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/transport_goods">
                  Товары для транспорта
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/home_appliance">Бытовая техника</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/service">Услуги</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/child_goods">Товары для детей</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/health_and_beauty">
                  Товары для красоты и здоровья
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/sport">Спорт</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/hobby_n_Relax">Хобби и отдых</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/subcat14">Товары для животных</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/advertisments/rest">Прочее</Link>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <InputGroup>
            <Form.Control
              placeholder="Search"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text id="basic-addon1" className="">
              <Button
                variant="link"
                onClick={() => console.log("Icon clicked")}
              >
                <Filter />
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Form>
      </Container>

      <Container className="mt-3 d-lg-none">

        <Row>
          <Col className="d-flex justify-content-center">
            <Button className="me-3" variant="light" onClick={handleShow}>
              <List />
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Image src={LogoSearch} alt="Logo" style={{ marginRight: "10px", width: "140px" }} />
          </Col>
          <Col className="d-flex justify-content-center">
            <Button variant="light" onClick={() => setIsSearchClicked(prevState => !prevState)}>
              <Search />
            </Button>
          </Col>
        </Row>
        {isSearchClicked && (
          <Form className="mt-3">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </Form>
        )}

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup id="categories">
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/estate">Недвижимость</Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/transport">Транспорт</Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/clothes">Одежда</Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/electronics">Электроника</Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/house_goods">Товары для дома</Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/building_materials_and_tools">
                  Стройматериалы и инструменты
                </Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/transport_goods">
                  Товары для транспорта
                </Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/home_appliance">Бытовая техника</Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/service">Услуги</Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/child_goods">Товары для детей</Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/health_and_beauty">
                  Товары для красоты и здоровья
                </Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/sport">Спорт</Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/hobby_n_Relax">Хобби и отдых</Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/subcat14">Товары для животных</Link>
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleClose}>
                <Link to="/advertisments/rest">Прочее</Link>
              </ListGroup.Item>
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </div>
  );
};

export default Categories;
