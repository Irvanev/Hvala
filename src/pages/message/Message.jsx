import React, { useState, useEffect, useRef } from "react";
import { MyNavbar } from "../../components/Navbar/Navbar";
import { db, auth } from "../../config/firebase";
import { FaPaperPlane } from 'react-icons/fa';
import { BsCardImage } from 'react-icons/bs';

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


export const Message = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [msgList, setMsgList] = useState([]);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    const user = auth.currentUser;
    const [recipientId, setRecipientId] = useState(null);
    const fileInput = useRef();

    const [modalImage, setModalImage] = useState(null);

    const openImageModal = (imageUrl) => {
        setModalImage(imageUrl);
    }

    const closeImageModal = () => {
        setModalImage(null);
    }

    const [userImageUrl, setUserImageUrl] = useState('');

    useEffect(() => {
        const fetchUserImage = async () => {
            if (recipientId) {
                const q = query(collection(db, "users"), where("id", "==", recipientId));
                const querySnapshot = await getDocs(q);

                const user = querySnapshot.docs[0]?.data();
                if (user) {
                    setUserImageUrl(user.photoUrl);
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
        const fetchData = async () => {
            if (user) {
                const q = query(
                    collection(db, "message"), 
                    where("from_uid", "==", user.uid)
                );
                const querySnapshot = await getDocs(q);
    
                const messages = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    
                messages.sort((a, b) => b.last_time - a.last_time); // Сортировка по дате в обратном порядке
    
                setMessages(messages);
            }
        };
    
        fetchData();
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
                last_msg: newMessage.content
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
    }

    return (
        <div>
            <MyNavbar />
            <div className="container">
                <h3 className=" text-center">Messaging</h3>
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
                                                {new Date(message.last_time * 1000).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}</span></h5>
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
                                                    <img src={msg.content} alt="received" style={{maxWidth: '200px'}} onClick={() => openImageModal(msg.content)}/>
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
                                                        <img src={msg.content} alt="received" style={{maxWidth: '200px'}} onClick={() => openImageModal(msg.content)}/>
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
                                <form onSubmit={handleSubmit} className="input_msg_write" style={{ display: 'flex', alignItems: 'center' }}>
                                    <BsCardImage
                                        size={30}
                                        style={{ marginRight: '10px', cursor: "pointer" }}
                                        onClick={() => fileInput.current.click()}
                                    />
                                    <input
                                        type="file"
                                        ref={fileInput}
                                        style={{ display: 'none' }}
                                    />
                                    <input type="text" className="write_msg" placeholder="Type a message" value={message} onChange={e => setMessage(e.target.value)} />
                                    <button className="msg_send_btn" type="submit">
                                        <FaPaperPlane />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}