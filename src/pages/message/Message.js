import {db} from "../../config/firebase";
import {Badge, Container, ListGroup, Image} from 'react-bootstrap';
import { auth } from "../../config/firebase";
import {MyNavbar} from '../../components/Navbar/Navbar';
import React from "react";
import {useEffect, useState} from 'react';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {useHistory} from "react-router-dom";
import Logo from'../../assets/logo.png';
export const Message = () => {
    const history = useHistory();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadMessages = async () => {
            const currentUser = auth.currentUser;
            const currentUserId = currentUser ? currentUser.uid : null;

            const messagesCollection = collection(db, 'message');
            const messagesQuery = query(messagesCollection, where('from_uid', '==', currentUserId));
            const messagesSnapshot = await getDocs(messagesQuery);
            setMessages(messagesSnapshot.docs.map(doc => doc.data()));
        };

        const loadUsers = async () => {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        loadMessages();
        loadUsers();
    }, []);

    const goBack = () => {
        history.goBack();
    }

    return (
        <div>

            <style type="text/css">
                {`
                @media (max-width: 1000px) {
                    body {
                        padding-bottom: 6.0rem;
                        padding-top: 4.5rem;
                    }
                }
                @media (min-width: 1000px) {
                    body {
                        padding-top: 4.5rem;
                    }
                }
                `}
            </style>

            <MyNavbar/>

            <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light d-lg-none">
                <div className="container">
                    <ul className="navbar-nav me-auto mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={goBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <Container>
                <ListGroup as="ul">
                    {messages.map((message, index) => {
                        const user = users.find(user => user.id === message.to_uid);

                        return (
                            <ListGroup.Item
                                key={index}
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="d-flex align-items-center">
                                    {user && <Image src={user.photoUrl || Logo} roundedCircle width="50" height="50" className="me-2" />}
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{message.to_name}</div>
                                        {message.msglist ? message.msglist.join(', ') : ''}
                                    </div>
                                </div>
                                <Badge bg="primary" pill>
                                    {message.msglist ? message.msglist.length : 0}
                                </Badge>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Container>
        </div>
    )
}