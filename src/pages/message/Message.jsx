import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import styles from './message.module.css'
import { MyNavbar } from "../../components/Navbar/Navbar";
import { db, auth, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FaPaperPlane } from 'react-icons/fa';
import { BsCardImage } from 'react-icons/bs';
import { List, Avatar, Image, Input } from 'antd';
import { SendOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Button, NavBar } from 'antd-mobile'

import {
    collection,
    query,
    where,
    getDocs,
    onSnapshot,
    orderBy,
    addDoc,
    doc,
    serverTimestamp,
    updateDoc
} from "firebase/firestore";
import './messages.css';
import Logo from '../../assets/logo.png';
import { NavBarBack } from "../../components/Navbar/NavBarBack";


export const Message = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [msgList, setMsgList] = useState([]);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    const user = auth.currentUser;
    const [recipientId, setRecipientId] = useState(null);
    const fileInput = useRef();
    const { TextArea } = Input;

    const [modalImage, setModalImage] = useState(null);
    const [isMessagesContainerOpen, setIsMessagesContainerOpen] = useState(false);

    const openImageModal = (imageUrl) => {
        setModalImage(imageUrl);
    }

    const closeImageModal = () => {
        setModalImage(null);
    }

    const [userImageUrl, setUserImageUrl] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    function formatTime(timestamp) {
        if (timestamp) {
            const messageDate = timestamp.toDate();
            const now = new Date();

            const diffInDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));

            if (diffInDays === 0) {
                return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else if (diffInDays === 1) {
                return 'Вчера';
            } else {
                return `${diffInDays} дней назад`;
            }
        } else {
            return 'Неизвестное время';
        }
    }

    useEffect(() => {
        const fetchUserImage = async () => {
            if (recipientId) {
                const q = query(collection(db, "users"), where("id", "==", recipientId));
                const querySnapshot = await getDocs(q);

                const user = querySnapshot.docs[0]?.data();
                if (user) {
                    setUserImageUrl(user.photoUrl);
                    setUserName(user.name);
                    setUserId(user.id);
                }
            }
        };

        fetchUserImage();
    }, [recipientId]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [msgList]);

    useEffect(() => {
        const fetchData = () => {
            if (user) {
                const q = query(
                    collection(db, "message"),
                    where("from_uid", "==", user.uid)
                );

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const messages = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

                    messages.sort((a, b) => b.last_time - a.last_time); // Сортировка по дате в обратном порядке

                    setMessages(messages);
                });

                // Отписка от слушателя при размонтировании компонента
                return unsubscribe;
            }
        };

        return fetchData();
    }, [user]);

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

    async function uploadImage(file) {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    }

// Функция для обработки загрузки изображения
    async function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        const imageUrl = await uploadImage(file);
        const newMessage = {
            from: user.uid,
            content: imageUrl,
            addtime: serverTimestamp(),
            type: "image",
            to: recipientId
        };
        // Добавьте новое сообщение в список сообщений
        setMsgList(oldMsgList => [...oldMsgList, newMessage]);
        // Загрузите новое сообщение в Firebase Firestore
        try {
            const messageDocRef = doc(db, 'message', selectedMessage);
            const docRef = await addDoc(collection(messageDocRef, 'msglist'), newMessage);
            console.log("Сообщение успешно добавлено с ID: ", docRef.id);
            await updateDoc(messageDocRef, {
                last_msg: "Image sent",
                last_time: serverTimestamp()
            });
        } catch (error) {
            console.error("Ошибка добавления сообщения: ", error);
        }
    }


    const handleMessage = async () => {
        const newMessage = {
            from: user.uid,
            content: message,
            addtime: serverTimestamp(),
            type: "text",
            to: recipientId
        };

        setMsgList(oldMsgList => [...oldMsgList, newMessage]);

        try {
            const messageDocRef = doc(db, 'message', selectedMessage);

            const docRef = await addDoc(collection(messageDocRef, 'msglist'), newMessage);

            console.log("Сообщение успешно добавлено с ID: ", docRef.id);

            await updateDoc(messageDocRef, {
                last_msg: newMessage.content,
                last_time: serverTimestamp()
            });

        } catch (error) {
            console.error("Ошибка добавления сообщения: ", error);
        }

        setMessage('');
    }


    async function handleSubmit(e) {
        e.preventDefault();

        if (message.trim() === '') {
            return;
        }
        await handleMessage();
        await handleImageUpload(e);
    }

    return (
        <div>

            {!isMessagesContainerOpen && (
                <MyNavbar />
            )}

            {!isMessagesContainerOpen && (
                <NavBarBack />
            )}

            <div className="container d-none d-lg-block mt-3" style={{paddingTop: '70px'}}>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="inbox_people">
                            <div className="headind_srch">
                                <div className="recent_heading">
                                    <h4>Сообщения</h4>
                                </div>
                            </div>
                            <div className="inbox_chat">
                                {messages.map((message, index) => (
                                    <div
                                        className={`chat_list ${selectedMessage === message.id ? 'active_chat' : ''}`}
                                        key={index}
                                        onClick={() => {
                                            setSelectedMessage(message.id);
                                            setRecipientId(message.to_uid);
                                        }}
                                    >
                                        <div className="chat_people">
                                            <div className="chat_img">
                                                <img
                                                    src={message.to_avatar || Logo}
                                                    alt="User"
                                                    style={{
                                                        borderRadius: '50%',
                                                        objectFit: "cover",
                                                        width: '50px',
                                                        height: '50px'
                                                    }}
                                                />
                                            </div>
                                            <div className="chat_ib">
                                                <h5>{message.to_name} <span className="chat_date">
                                                    {formatTime(message.last_time)}</span></h5>
                                                <p style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {message.last_msg}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mesgs">
                            <div className="msg_history">
                                {msgList.map((msg, index) => (
                                    msg.from === user.uid ? (
                                        <div className="outgoing_msg" key={index}>
                                            <div className="sent_msg">
                                                {msg.type === "image" ? (
                                                    <img src={msg.content} alt="received" style={{ maxWidth: '200px' }} onClick={() => openImageModal(msg.content)} />
                                                ) : (
                                                    <p>{msg.content}</p>
                                                )}
                                                <span className="time_date">
                                                    {new Date(msg.addtime * 1000).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="incoming_msg" key={index}>
                                            <div className="incoming_msg_img">
                                                <img src={userImageUrl || Logo} alt="sunil"
                                                    style={{
                                                        borderRadius: '50%',
                                                        objectFit: "cover",
                                                        width: '50px',
                                                        height: '50px'
                                                    }}
                                                />
                                            </div>
                                            <div className="received_msg">
                                                <div className="received_withd_msg">
                                                    {msg.type === "image" ? (
                                                        <img src={msg.content} alt="received" style={{ maxWidth: '200px' }} onClick={() => openImageModal(msg.content)} />
                                                    ) : (
                                                        <p>{msg.content}</p>
                                                    )}
                                                    <span className="time_date">
                                                        {new Date(msg.addtime * 1000).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                    {modalImage && (
                                                        <div style={{
                                                            position: 'fixed',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            zIndex: 1000
                                                        }} onClick={closeImageModal}>
                                                            <img src={modalImage} alt="modal" style={{ maxWidth: '90%', maxHeight: '90%' }} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="type_msg">
                                <form onSubmit={handleSubmit} className="input_msg_write"
                                      style={{display: 'flex', alignItems: 'center'}}>
                                    <BsCardImage
                                        size={30}
                                        style={{marginRight: '10px', cursor: "pointer"}}
                                        onClick={() => fileInput.current.click()}
                                    />
                                    <input
                                        type="file"
                                        ref={fileInput}
                                        style={{display: 'none'}}
                                        onChange={handleImageUpload}
                                    />
                                    <input type="text" className="write_msg" placeholder="Type a message"
                                           value={message} onChange={e => setMessage(e.target.value)}/>
                                    <button className="msg_send_btn" type="submit">
                                        <FaPaperPlane/>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="d-lg-none">
                <List className="container" style={{paddingTop: '3.5rem'}}
                    dataSource={messages}
                    renderItem={(message, index) => (
                        <List.Item key={index} onClick={() => {
                            setSelectedMessage(message.id);
                            setRecipientId(message.to_uid);
                            setIsMessagesContainerOpen(true);
                        }} style={{ display: isMessagesContainerOpen ? 'none' : 'flex', justifyContent: 'space-between', position: 'relative' }}>
                            <List.Item.Meta
                                avatar={<Avatar size={64} src={message.to_avatar || Logo} />}
                                title={message.to_name}
                                description={message.last_msg}
                            />
                            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                {formatTime(message.last_time)}
                            </div>
                        </List.Item>
                    )}
                />
                <div className="messages-container" style={{ display: isMessagesContainerOpen ? 'block' : 'none' }}>
                    <div className="test" style={{ height: 'calc(100vh - 100px)', overflowY: 'scroll' }}>
                        <div className={styles.messageHistory}>
                            {msgList.map((msg, index) => (
                                msg.from === user.uid ? (
                                    <div className={styles.outgoingMessage} key={index}>
                                        <NavBar
                                            style={{
                                                position: 'fixed',
                                                top: 0,
                                                width: '100%',
                                                zIndex: 9999,
                                                borderBottom: 'solid 1px grey',
                                                backgroundColor: 'white'
                                            }}
                                            onBack={() => setIsMessagesContainerOpen(false)}
                                        >
                                            <Link to={`/seller/${userId}`}>
                                                <Avatar src={userImageUrl || Logo} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                                <span style={{ marginLeft: '10px' }}>{userName}</span>
                                            </Link>
                                        </NavBar>

                                        <div className={styles.messageToBlock} >
                                            {msg.type === "image" ? (

                                                <Image src={msg.content} alt="received" />
                                            ) : (
                                                <span style={{ wordBreak: 'break-word' }}>{msg.content}</span>
                                            )}
                                            <span className={styles.timeStamp}>
                                                {new Date(msg.addtime * 1000).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.incomingMessage} key={index}>
                                        <div className="incoming-message-img" style={{ marginRight: '10px' }}>
                                            <img className={styles.userPhoto} src={userImageUrl || Logo} alt="sunil" />
                                        </div>
                                        <div className={styles.messageFromBlock}>
                                            {msg.type === "image" ? (
                                                <Image src={msg.content} alt="received" style={{ maxWidth: '200px' }} />
                                            ) : (
                                                <span style={{ wordBreak: 'break-word' }}>{msg.content}</span>
                                            )}
                                            <span className={styles.timeStamp}>
                                                {new Date(msg.addtime * 1000).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                )
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputMessage}>
                            <input
                                type="file"
                                ref={fileInput}
                                style={{display: 'none'}}
                                onChange={handleImageUpload}
                            />
                            <PaperClipOutlined className={styles.sendIcon} onClick={() => fileInput.current.click()}/>
                            <TextArea className={styles.textInput} rows={1}
                                placeholder="input message" autoSize={{ minRows: 1, maxRows: 4 }}
                                value={message} onChange={e => setMessage(e.target.value)}
                                onPressEnter={handleSubmit}
                            />
                            <Button type="submit" htmlType="submit" className={styles.sendButton}>
                                <SendOutlined className={styles.sendIcon} />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}