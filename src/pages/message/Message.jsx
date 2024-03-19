import React, { useState, useEffect, useRef } from "react";
import { MyNavbar } from "../../components/Navbar/Navbar";
import { Tab, Container, Row, Col, ListGroup, Button, Form, Card } from "react-bootstrap";
import { db, auth } from "../../config/firebase";
import { collection, query, where, getDocs, onSnapshot, orderBy, addDoc, doc } from "firebase/firestore";
import './messages.css';
import Logo from '../../assets/logo.png';


export const Message = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [msgList, setMsgList] = useState([]);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    const user = auth.currentUser;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [msgList]);


    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const q = query(collection(db, "message"), where("from_uid", "==", user.uid));
                const querySnapshot = await getDocs(q);

                setMessages(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchMsgList = () => {
            if (selectedMessage) {
                const msgListRef = collection(db, "message", selectedMessage, "msglist");
                const q = query(msgListRef, orderBy("addtime"));

                const unsubscribe = onSnapshot(q, (snapshot) => {
                    setMsgList(snapshot.docs.map(doc => doc.data()));
                });

                return unsubscribe;
            }
        };

        fetchMsgList();
    }, [selectedMessage]);

    async function handleSubmit(e) {
        e.preventDefault();

        const newMessage = {
            from: user.uid,
            content: message,
            addtime: Date.now(),
            type: "text",
        };

        // Добавление нового сообщения в msgList
        setMsgList(oldMsgList => [...oldMsgList, newMessage]);

        try {
            // Получение ссылки на документ в коллекции 'message'
            const messageDocRef = doc(db, 'message', 'your_message_id');

            // Создание нового документа в подколлекции 'msgList' этого документа
            const docRef = await addDoc(collection(messageDocRef, 'msgList'), newMessage);

            console.log("Сообщение успешно добавлено с ID: ", docRef.id);
        } catch (error) {
            console.error("Ошибка добавления сообщения: ", error);
        }

        // Очистка поля ввода
        setMessage('');
    }

    return (
        <div>
            <MyNavbar />
            <Container className="mt-3">



                <Tab.Container id="list-group-tabs-example">
                    <Row>
                        <Col sm={4} style={{ backgroundColor: '#f8f9fa', height: '80vh', overflow: 'auto' }}>
                            <ListGroup>
                                {messages.map((message, index) => (
                                    <ListGroup.Item action href={`#link${index}`} onClick={() => setSelectedMessage(message.id)} style={{ color: "black", height: "80px", display: "flex", flexDirection: "column" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img src={message.to_avatar || Logo} alt="User" style={{ borderRadius: "50%", marginRight: "10px", width: "50px", height: "50px" }} />
                                            {message.to_name}
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col sm={8} style={{ display: 'flex', flexDirection: 'column', height: '80vh', backgroundColor: '#e9ecef' }}>
                            <div style={{ overflow: 'auto', flex: 1 }}>
                                {msgList.map((msg, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        justifyContent: msg.from === user.uid ? 'flex-end' : 'flex-start',
                                    }}>
                                        <div style={{
                                            padding: '10px',
                                            borderRadius: '5px',
                                            margin: '10px 10px',
                                            textAlign: 'left',
                                            maxWidth: '50%',
                                            backgroundColor: msg.from === user.uid ? '#0d6efd' : '#6c757d',
                                            color: '#fff',
                                        }}>
                                            <p style={{ margin: 0, fontWeight: 'bold' }}>{msg.from === user.uid ? 'Вы' : msg.from_name}</p>
                                            {msg.type === "image" ? (
                                                <img src={msg.content} alt="message content" style={{ maxWidth: '100%' }} />
                                            ) : (
                                                <p style={{ margin: 0 }}>{msg.content}</p>
                                            )}
                                            <p style={{ margin: 0, fontSize: '0.75em', textAlign: 'right' }}>
                                                {new Date(msg.addtime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs="auto">
                                        <Button variant="secondary">
                                            Прикрепить фото
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="messageInput">
                                            <Form.Control
                                                type="text"
                                                placeholder="Введите сообщение"
                                                value={message}
                                                onChange={e => setMessage(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs="auto">
                                        <Button variant="primary" type="submit">
                                            Отправить
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </div>
    );
}