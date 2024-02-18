import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import {Container} from "react-bootstrap";
import {MyNavbar} from '../../components/Navbar/Navbar';

export const Message = () => {
    return (
        <div>
            <MyNavbar />
            <Container style={{paddingTop: '20px'}}>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={4}>
                            <ListGroup>
                                <ListGroup.Item action href="#link1">
                                    Link 1
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link2">
                                    Link 2
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link3">
                                    Link 2
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link4">
                                    Link 2
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link5">
                                    Link 2
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link6">
                                    Link 2
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link7">
                                    Link 2
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#link1">Tab pane content 1</Tab.Pane>
                                <Tab.Pane eventKey="#link2">Tab pane content 2</Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </div>
    )
}