import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useParams, useHistory } from 'react-router-dom';
import styles from './message.module.css'
import { MyNavbar } from "../../components/Navbar/Navbar";
import { db, auth, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FaPaperPlane } from 'react-icons/fa';
import { BsCardImage } from 'react-icons/bs';
import { List, Input, Modal, message as antMessage } from 'antd';
import { SendOutlined, PaperClipOutlined, LeftOutlined } from '@ant-design/icons';
import { FaReply, FaShare } from 'react-icons/fa';
import { Button } from 'antd-mobile'
import { useTranslation } from "react-i18next";

import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    onSnapshot,
    orderBy,
    addDoc,
    doc,
    serverTimestamp,
    updateDoc,
    increment,
    limit,
    limitToLast
} from "firebase/firestore";
import './messages.css';
import Logo from '../../assets/person5.jpg';
import { NavBarBack } from "../../components/Navbar/NavBarBack";

const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length >= 2) {
        const first = parts[0].charAt(0);
        const last = parts[parts.length - 1].charAt(0);
        return (first + last).toUpperCase().slice(0, 2);
    }
    return parts[0].charAt(0).toUpperCase();
};

const AVATAR_COLORS = ['#54a9eb', '#03989F', '#8b5cf6', '#f59e0b', '#ec4899', '#10b981'];

const getAvatarColor = (name) => {
    if (!name) return AVATAR_COLORS[0];
    let i = 0;
    for (let j = 0; j < name.length; j++) i += name.charCodeAt(j);
    return AVATAR_COLORS[Math.abs(i) % AVATAR_COLORS.length];
};

const ChatAvatar = ({ src, name, size = 50, className = '' }) => {
    const [imgError, setImgError] = useState(false);
    const initials = getInitials(name);
    const hasPhoto = src && typeof src === 'string' && src.trim().length > 0 && !imgError;
    return hasPhoto ? (
        <img
            src={src}
            alt=""
            className={className}
            style={{
                borderRadius: '50%',
                objectFit: 'cover',
                width: size,
                height: size
            }}
            onError={() => setImgError(true)}
        />
    ) : (
        <div
            className={`avatar_initials ${className}`}
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: getAvatarColor(name),
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: Math.round(size * 0.4),
                fontWeight: 600
            }}
        >
            {initials}
        </div>
    );
};

export const Message = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [msgList, setMsgList] = useState([]);
    const [message, setMessage] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, msg: null });
    const [forwardModalOpen, setForwardModalOpen] = useState(false);
    const [messageToForward, setMessageToForward] = useState(null);
    const messagesEndRef = useRef(null);

    const contextMenuOpenTimeRef = useRef(0);
    useEffect(() => {
        if (contextMenu.visible) contextMenuOpenTimeRef.current = Date.now();
    }, [contextMenu.visible]);

    useEffect(() => {
        const closeContextMenu = () => {
            if (Date.now() - contextMenuOpenTimeRef.current < 450) return;
            setContextMenu((c) => ({ ...c, visible: false }));
        };
        if (contextMenu.visible) {
            const t = setTimeout(() => {
                document.addEventListener('click', closeContextMenu);
                document.addEventListener('contextmenu', closeContextMenu);
            }, 380);
            return () => {
                clearTimeout(t);
                document.removeEventListener('click', closeContextMenu);
                document.removeEventListener('contextmenu', closeContextMenu);
            };
        }
    }, [contextMenu.visible]);
    const user = auth.currentUser;
    const [recipientId, setRecipientId] = useState(null);
    const fileInput = useRef();
    const { TextArea } = Input;

    const [modalImage, setModalImage] = useState(null);
    const [isMessagesContainerOpen, setIsMessagesContainerOpen] = useState(false);

    const closeImageModal = () => {
        setModalImage(null);
    }

    const [userImageUrl, setUserImageUrl] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    const { chatId } = useParams();

    function formatTime(timestamp) {
        if (timestamp) {
            const messageDate = timestamp.toDate ? timestamp.toDate() : new Date((timestamp.seconds ?? timestamp) * 1000);
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

        setSelectedMessage(chatId)
        fetchUserImage();
    }, [recipientId]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }
    useEffect(scrollToBottom, [msgList]);

    const [messagesFrom, setMessagesFrom] = useState([]);
    const [messagesTo, setMessagesTo] = useState([]);

    useEffect(() => {
        if (!user) return;
        const q1 = query(
            collection(db, "message"),
            where("from_uid", "==", user.uid),
            limit(50)
        );
        const q2 = query(
            collection(db, "message"),
            where("to_uid", "==", user.uid),
            limit(50)
        );

        const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
            const messages = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setMessagesFrom(messages);
        });
        const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
            const messages = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setMessagesTo(messages);
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
        };
    }, [user]);

    useEffect(() => {
        if (!selectedMessage || !user) return;
        const msgListRef = collection(db, "message", selectedMessage, "msglist");
        const q = query(msgListRef, orderBy("addtime"), limitToLast(50));

        const messageDocRef = doc(db, "message", selectedMessage);
        getDoc(messageDocRef).then((snap) => {
            const d = snap.data();
            if (!d) return;
            const isFrom = d.from_uid === user.uid;
            updateDoc(messageDocRef, isFrom ? { unread_count_for_from: 0 } : { unread_count_for_to: 0 }).catch(() => {});
        });

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMsgList(snapshot.docs.map(d => ({ ...d.data(), id: d.id })));
        });

        return () => unsubscribe();
    }, [selectedMessage, user?.uid]);

    useEffect(scrollToBottom, [messages]);

    async function uploadImage(file) {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    }

    // Функция для обработки загрузки изображения
    async function handleImageUpload(e) {
        const file = e?.target?.files?.[0] ?? fileInput.current?.files?.[0];
        if (!file) return;
        const imageUrl = await uploadImage(file);
        const newMessage = {
            from: user.uid,
            content: imageUrl,
            addtime: serverTimestamp(),
            type: "image",
            to: recipientId,
            ...(replyTo && { replyTo })
        };
        // Добавьте новое сообщение в список сообщений
        setMsgList(oldMsgList => [...oldMsgList, newMessage]);
        // Загрузите новое сообщение в Firebase Firestore
        try {
            const messageDocRef = doc(db, 'message', selectedMessage);
            const docRef = await addDoc(collection(messageDocRef, 'msglist'), newMessage);
            console.log("Сообщение успешно добавлено с ID: ", docRef.id);
            const chatSnap = await getDoc(messageDocRef);
            const chatData = chatSnap.data();
            const isRecipientTo = chatData?.to_uid === recipientId;
            await updateDoc(messageDocRef, {
                last_msg: "Image",
                last_time: serverTimestamp(),
                ...(isRecipientTo ? { unread_count_for_to: increment(1) } : { unread_count_for_from: increment(1) })
            });
        } catch (error) {
            console.error("Ошибка добавления сообщения: ", error);
        }
        setReplyTo(null);
    }


    const handleMessage = async () => {
        const newMessage = {
            from: user.uid,
            content: message,
            addtime: serverTimestamp(),
            type: "text",
            to: recipientId,
            ...(replyTo && { replyTo })
        };

        setMsgList(oldMsgList => [...oldMsgList, newMessage]);

        try {
            const messageDocRef = doc(db, 'message', selectedMessage);

            const docRef = await addDoc(collection(messageDocRef, 'msglist'), newMessage);

            console.log("Сообщение успешно добавлено с ID: ", docRef.id);

            const chatSnap = await getDoc(messageDocRef);
            const chatData = chatSnap.data();
            const isRecipientTo = chatData?.to_uid === recipientId;
            await updateDoc(messageDocRef, {
                last_msg: newMessage.content,
                last_time: serverTimestamp(),
                ...(isRecipientTo ? { unread_count_for_to: increment(1) } : { unread_count_for_from: increment(1) })
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
        setReplyTo(null);
    }

    const getMsgTime = (msg) => {
        const t = msg.addtime;
        if (!t) return new Date(0);
        if (t.toDate) return t.toDate();
        return new Date((t.seconds ?? t) * 1000);
    };

    const formatMessageTimestamp = (msg) => {
        const d = getMsgTime(msg);
        if (isNaN(d.getTime()) || (!msg.addtime && d.getTime() === 0)) return '—';
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const msgDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const diffDays = Math.floor((today - msgDate) / (1000 * 60 * 60 * 24));
        const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (diffDays === 0) return timeStr;
        if (diffDays === 1) return `${t('yesterday')} ${timeStr}`;
        const dateOpts = { day: 'numeric', month: 'short' };
        if (d.getFullYear() !== now.getFullYear()) dateOpts.year = 'numeric';
        return `${d.toLocaleDateString(undefined, dateOpts)} ${timeStr}`;
    };

    const handleReply = (msg) => {
        setReplyTo({
            content: msg.type === 'image' ? '🖼 Photo' : (msg.content || '').slice(0, 100),
            type: msg.type,
            from: msg.from
        });
        setContextMenu((c) => ({ ...c, visible: false }));
    };

    const handleMessageContextMenu = (e, msg) => {
        e.preventDefault();
        e.stopPropagation();
        const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
        setContextMenu({
            visible: true,
            x,
            y,
            msg
        });
    };

    const longPressTimerRef = useRef(null);
    const lastTapRef = useRef({ time: 0, msg: null });
    const LONG_PRESS_MS = 500;
    const DOUBLE_TAP_MS = 350;

    const handleMessageTouchStart = (e, msg) => {
        const touch = e.touches?.[0];
        if (!touch) return;
        const x = touch.clientX;
        const y = touch.clientY;
        longPressTimerRef.current = setTimeout(() => {
            longPressTimerRef.current = null;
            handleReply(msg);
            setContextMenu({
                visible: true,
                x,
                y,
                msg
            });
        }, LONG_PRESS_MS);
    };
    const handleMessageTouchEnd = (e, msg) => {
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        } else {
            const now = Date.now();
            const { time, msg: lastMsg } = lastTapRef.current;
            if (now - time < DOUBLE_TAP_MS && lastMsg?.id === msg?.id) {
                handleReply(msg);
                lastTapRef.current = { time: 0, msg: null };
            } else {
                lastTapRef.current = { time: now, msg };
            }
        }
    };
    const handleMessageTouchMove = () => {
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
    };

    const handleMessageDoubleClick = (msg) => {
        handleReply(msg);
    };

    const handleForwardClick = (msg) => {
        setContextMenu((c) => ({ ...c, visible: false }));
        setMessageToForward(msg);
        setForwardModalOpen(true);
    };

    const handleForwardToChat = async (targetChat) => {
        if (!messageToForward || !user) return;
        const targetChatId = targetChat.id;
        const targetRecipientId = targetChat.from_uid === user.uid ? targetChat.to_uid : targetChat.from_uid;

        const forwardedMessage = {
            from: user.uid,
            to: targetRecipientId,
            content: messageToForward.content,
            type: messageToForward.type,
            addtime: serverTimestamp(),
            forwarded: true
        };

        try {
            const messageDocRef = doc(db, 'message', targetChatId);
            const targetChatSnap = await getDoc(messageDocRef);
            const targetChatData = targetChatSnap.data();
            const isRecipientTo = targetChatData?.to_uid === targetRecipientId;
            await addDoc(collection(messageDocRef, 'msglist'), forwardedMessage);
            await updateDoc(messageDocRef, {
                last_msg: messageToForward.type === 'image' ? '🖼' : (messageToForward.content || '').slice(0, 50),
                last_time: serverTimestamp(),
                ...(isRecipientTo ? { unread_count_for_to: increment(1) } : { unread_count_for_from: increment(1) })
            });
            antMessage.success(t('forward') + ' ✓');
            setForwardModalOpen(false);
            setMessageToForward(null);
        } catch (error) {
            console.error('Forward error:', error);
            antMessage.error('Ошибка пересылки');
        }
    };

    const combinedMessages = [...messagesFrom, ...messagesTo].sort((a, b) => {
        const ta = a.last_time?.seconds ?? a.last_time ?? 0;
        const tb = b.last_time?.seconds ?? b.last_time ?? 0;
        return tb - ta;
    });
    const chatsForForward = combinedMessages.filter((ch) => ch.id !== selectedMessage);
    const selectedChat = combinedMessages.find((m) => m.id === selectedMessage) || null;

    const [avatarsByUserId, setAvatarsByUserId] = useState({});
    const otherUserIdsStr = [...new Set(combinedMessages.map((m) => m.from_uid === user?.uid ? m.to_uid : m.from_uid).filter(Boolean))].sort().join(',');
    useEffect(() => {
        if (!user || !otherUserIdsStr) return;
        const otherUserIds = [...new Set(otherUserIdsStr.split(',').filter(Boolean))];
        const fetchAvatars = async () => {
            const results = {};
            for (let i = 0; i < otherUserIds.length; i += 10) {
                const ids = otherUserIds.slice(i, i + 10);
                const q = query(collection(db, 'users'), where('id', 'in', ids));
                const snap = await getDocs(q);
                snap.docs.forEach((d) => {
                    const data = d.data();
                    if (data.photoUrl) results[data.id] = data.photoUrl;
                });
            }
            setAvatarsByUserId((prev) => ({ ...prev, ...results }));
        };
        fetchAvatars();
    }, [user?.uid, otherUserIdsStr]);

    const contextMenuContent = contextMenu.visible && contextMenu.msg && (
        <div className="msg_context_menu_wrapper">
            <div
                className="msg_context_menu msg_context_menu_float"
                style={{
                    left: Math.min(contextMenu.x, window.innerWidth - 160),
                    top: Math.min(contextMenu.y, window.innerHeight - 120)
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button type="button" className="msg_context_menu_item" onClick={() => handleReply(contextMenu.msg)}>
                    <FaReply style={{ marginRight: 8 }} />
                    {t('reply')}
                </button>
                <button type="button" className="msg_context_menu_item" onClick={() => handleForwardClick(contextMenu.msg)}>
                    <FaShare style={{ marginRight: 8 }} />
                    {t('forward')}
                </button>
            </div>
            <div className="msg_context_menu msg_context_menu_bottom" onClick={(e) => e.stopPropagation()}>
                <div className="msg_context_menu_backdrop" onClick={() => setContextMenu((c) => ({ ...c, visible: false }))} />
                <div className="msg_context_menu_sheet">
                    <button
                        type="button"
                        className="msg_context_menu_item"
                        onClick={() => handleReply(contextMenu.msg)}
                        onTouchEnd={(e) => { e.preventDefault(); handleReply(contextMenu.msg); }}
                    >
                        <FaReply style={{ marginRight: 8 }} />
                        {t('reply')}
                    </button>
                    <button
                        type="button"
                        className="msg_context_menu_item"
                        onClick={() => handleForwardClick(contextMenu.msg)}
                        onTouchEnd={(e) => { e.preventDefault(); handleForwardClick(contextMenu.msg); }}
                    >
                        <FaShare style={{ marginRight: 8 }} />
                        {t('forward')}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {contextMenuContent && createPortal(contextMenuContent, document.body)}
            <Modal
                title={t('forward_to')}
                open={forwardModalOpen}
                onCancel={() => { setForwardModalOpen(false); setMessageToForward(null); }}
                footer={null}
                width={400}
            >
                {chatsForForward.length === 0 ? (
                    <p style={{ padding: 16, color: '#999' }}>{t('select_chat')}</p>
                ) : (
                    <div className="forward_chat_list">
                        {chatsForForward.map((chat) => {
                            const otherName = chat.from_uid === user?.uid ? chat.to_name : chat.from_name;
                            const otherAvatar = chat.from_uid === user?.uid ? chat.to_avatar : chat.from_avatar;
                            return (
                                <div
                                    key={chat.id}
                                    className="forward_chat_item"
                                    onClick={() => handleForwardToChat(chat)}
                                >
                                    <ChatAvatar src={avatarsByUserId[chat.from_uid === user?.uid ? chat.to_uid : chat.from_uid] || otherAvatar} name={otherName} size={44} />
                                    <span className="forward_chat_name">{otherName || '—'}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Modal>
            {!isMessagesContainerOpen && (
                <MyNavbar />
            )}

            {!isMessagesContainerOpen && (
                <NavBarBack />
            )}

            <div className="container d-none d-lg-block mt-3" style={{ paddingTop: 8 }}>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="inbox_people">
                        <div className="headind_srch">
                                <div className="recent_heading">
                                    <h4>{t('message_navbar')}</h4>
                                </div>
                            </div>
                            <div className="inbox_chat">
                                {combinedMessages.map((message, index) => {
                                    const unread = message.from_uid === auth.currentUser.uid
                                        ? (message.unread_count_for_from || 0)
                                        : (message.unread_count_for_to || 0);
                                    const hasUnread = unread > 0;
                                    return (
                                    <div
                                        className={`chat_list ${selectedMessage === message.id ? 'active_chat' : ''} ${hasUnread ? 'chat_list_unread' : ''}`}
                                        key={index}
                                        onClick={() => {
                                            setSelectedMessage(message.id);
                                            setRecipientId(message.from_uid === auth.currentUser.uid ? message.to_uid : message.from_uid);
                                            history.push(`/message/${message.id}`);
                                        }}
                                    >
                                        <div className="chat_people">
                                            <div className="chat_img" style={{ position: 'relative' }}>
                                                <ChatAvatar
                                                    src={avatarsByUserId[message.from_uid === auth.currentUser.uid ? message.to_uid : message.from_uid] || (message.from_uid === auth.currentUser.uid ? message.to_avatar : message.from_avatar)}
                                                    name={message.from_uid === auth.currentUser.uid ? message.to_name : message.from_name}
                                                    size={50}
                                                />
                                                {hasUnread && (
                                                    <span className="chat_unread_badge">
                                                        {unread > 99 ? '99+' : unread}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="chat_ib">
                                                <h5>{message.from_uid === auth.currentUser.uid ? message.to_name : message.from_name}
                                                    <span className="chat_date">
                                                        {formatTime(message.last_time)}
                                                    </span>
                                                </h5>
                                                {message.ad_title && (
                                                    <div className="chat_ad_preview">
                                                        {message.ad_image && (
                                                            <img src={message.ad_image} alt="" className="chat_ad_preview_img" />
                                                        )}
                                                        <div className="chat_ad_preview_info">
                                                            <span className="chat_ad_preview_title">{message.ad_title}</span>
                                                            {message.ad_price && <span className="chat_ad_preview_price">{message.ad_price}</span>}
                                                        </div>
                                                    </div>
                                                )}
                                                <p className={hasUnread ? 'chat_last_msg_unread' : ''} style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {message.last_msg}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mesgs">
                            {selectedChat?.ad_title && (
                                <Link to={selectedChat.ad_id ? `/advertisment/${selectedChat.ad_id}` : '#'} className="chat_ad_bar">
                                    {selectedChat.ad_image && (
                                        <img src={selectedChat.ad_image} alt="" className="chat_ad_bar_img" />
                                    )}
                                    <div className="chat_ad_bar_info">
                                        <span className="chat_ad_bar_label">{t('chat_about_ad')}</span>
                                        <span className="chat_ad_bar_title">{selectedChat.ad_title}</span>
                                        {selectedChat.ad_price && <span className="chat_ad_bar_price">{selectedChat.ad_price}</span>}
                                    </div>
                                    <span className="chat_ad_bar_link">{t('open_ad')} →</span>
                                </Link>
                            )}
                            <div className="msg_history">
                                {msgList.map((msg, index) => (
                                    msg.from === user.uid ? (
                                        <div className="outgoing_msg" key={msg.id || index}>
                                            <div
                                                className="msg_reply_zone msg_reply_zone_left"
                                                onClick={() => handleReply(msg)}
                                                onDoubleClick={() => handleMessageDoubleClick(msg)}
                                                onContextMenu={(e) => handleMessageContextMenu(e, msg)}
                                            />
                                            <div
                                                className="sent_msg msg_clickable"
                                                onClick={() => handleReply(msg)}
                                                onDoubleClick={() => handleMessageDoubleClick(msg)}
                                                onContextMenu={(e) => handleMessageContextMenu(e, msg)}
                                            >
                                                {msg.forwarded && (
                                                    <span className="forwarded_badge forwarded_badge_left">
                                                        <FaShare className="forwarded_icon" />
                                                        {t('forward')}
                                                    </span>
                                                )}
                                                <div className="msg_content_wrap">
                                                <div className="msg_bubble_with_time">
                                                {msg.replyTo && (
                                                    <div className="reply_quote">
                                                        <span className="reply_quote_name">{msg.replyTo.from === user.uid ? t('me') : userName}</span>
                                                        <span className="reply_quote_text">{msg.replyTo.type === 'image' ? '🖼' : msg.replyTo.content}</span>
                                                    </div>
                                                )}
                                                    {msg.type === "image" ? (
                                                        <img src={msg.content} alt="received" style={{ maxWidth: '200px', borderRadius: 4 }} loading="lazy" />
                                                    ) : (
                                                        <p>{msg.content}</p>
                                                    )}
                                                    <span className="time_date" title={getMsgTime(msg).toLocaleString()}>
                                                        {formatMessageTimestamp(msg)}
                                                    </span>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="incoming_msg" key={msg.id || index}>
                                            <div className="incoming_msg_img">
                                                <ChatAvatar src={userImageUrl} name={userName} size={50} />
                                            </div>
                                            <div className="received_msg">
                                                <div
                                                    className="received_withd_msg msg_clickable"
                                                    onClick={() => handleReply(msg)}
                                                    onDoubleClick={() => handleMessageDoubleClick(msg)}
                                                    onContextMenu={(e) => handleMessageContextMenu(e, msg)}
                                                >
                                                    {msg.forwarded && (
                                                        <span className="forwarded_badge forwarded_badge_left">
                                                            <FaShare className="forwarded_icon" />
                                                            {t('forward')}
                                                        </span>
                                                    )}
                                                    <div className="msg_content_wrap">
                                                    <div className="msg_bubble_with_time msg_bubble_incoming">
                                                    {msg.replyTo && (
                                                        <div className="reply_quote reply_quote_incoming">
                                                            <span className="reply_quote_name">{msg.replyTo.from === user.uid ? t('you') : userName}</span>
                                                            <span className="reply_quote_text">{msg.replyTo.type === 'image' ? '🖼' : msg.replyTo.content}</span>
                                                        </div>
                                                    )}
                                                        {msg.type === "image" ? (
                                                            <img src={msg.content} alt="received" style={{ maxWidth: '200px', borderRadius: 4 }} loading="lazy" />
                                                        ) : (
                                                            <p>{msg.content}</p>
                                                        )}
                                                        <span className="time_date" title={getMsgTime(msg).toLocaleString()}>
                                                            {formatMessageTimestamp(msg)}
                                                        </span>
                                                    </div>
                                                    </div>
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
                                            <div
                                                className="msg_reply_zone msg_reply_zone_right"
                                                onClick={() => handleReply(msg)}
                                                onDoubleClick={() => handleMessageDoubleClick(msg)}
                                                onContextMenu={(e) => handleMessageContextMenu(e, msg)}
                                            />
                                        </div>
                                    )
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="type_msg">
                                {replyTo && (
                                    <div className="reply_preview">
                                        <div className="reply_preview_content">
                                            <span className="reply_preview_label">{t('reply')}</span>
                                            <span className="reply_preview_text">{replyTo.type === 'image' ? '🖼 Photo' : replyTo.content}</span>
                                        </div>
                                        <button type="button" className="reply_preview_close" onClick={() => setReplyTo(null)}>×</button>
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="input_msg_write"
                                    style={{ display: 'flex', alignItems: 'center' }}>
                                    <BsCardImage
                                        size={24}
                                        style={{ marginRight: '8px', cursor: 'pointer', color: '#54a9eb' }}
                                        onClick={() => fileInput.current.click()}
                                    />
                                    <input
                                        type="file"
                                        ref={fileInput}
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />
                                    <input type="text" className="write_msg" placeholder={t('input_message')}
                                        value={message} onChange={e => setMessage(e.target.value)} />
                                    <button className="msg_send_btn" type="submit">
                                        <FaPaperPlane />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="d-lg-none">
                <List className="container" style={{ paddingTop: 8, paddingBottom: 8 }}
                    dataSource={combinedMessages}
                    renderItem={(message, index) => {
                        const unread = message.from_uid === auth.currentUser.uid
                            ? (message.unread_count_for_from || 0)
                            : (message.unread_count_for_to || 0);
                        const hasUnread = unread > 0;
                        return (
                        <List.Item key={index} onClick={() => {
                            setSelectedMessage(message.id);
                            setRecipientId(message.from_uid === auth.currentUser.uid ? message.to_uid : message.from_uid);
                            history.push(`/message/${message.id}`);
                            setIsMessagesContainerOpen(true);
                        }} style={{ display: isMessagesContainerOpen ? 'none' : 'flex', justifyContent: 'space-between', position: 'relative' }} className={hasUnread ? 'chat_list_unread' : ''}>
                            <List.Item.Meta
                                avatar={
                                    <div style={{ position: 'relative' }}>
                                        <ChatAvatar src={avatarsByUserId[message.from_uid === auth.currentUser.uid ? message.to_uid : message.from_uid] || (message.from_uid === auth.currentUser.uid ? message.to_avatar : message.from_avatar)} name={message.from_uid === auth.currentUser.uid ? message.to_name : message.from_name} size={64} />
                                        {hasUnread && (
                                            <span className="chat_unread_badge chat_unread_badge_mobile">
                                                {unread > 99 ? '99+' : unread}
                                            </span>
                                        )}
                                    </div>
                                }
                                title={message.from_uid === auth.currentUser.uid ? message.to_name : message.from_name}
                                description={
                                    <div>
                                        {message.ad_title && (
                                            <div className="chat_ad_preview chat_ad_preview_mobile">
                                                {message.ad_image && (
                                                    <img src={message.ad_image} alt="" className="chat_ad_preview_img" />
                                                )}
                                                <span className="chat_ad_preview_title">{message.ad_title}</span>
                                                {message.ad_price && <span className="chat_ad_preview_price">{message.ad_price}</span>}
                                            </div>
                                        )}
                                        <div className={hasUnread ? 'chat_last_msg_unread' : ''} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {message.last_msg}
                                        </div>
                                    </div>
                                }
                            />
                            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                {formatTime(message.last_time)}
                            </div>
                        </List.Item>
                        );
                    }}
                />
                <div
                    className="messages-container"
                    style={{
                        display: isMessagesContainerOpen ? 'flex' : 'none',
                        flexDirection: 'column',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9998,
                        backgroundColor: '#fff',
                    }}
                >
                    <div className={styles.chatHeader}>
                        <LeftOutlined className={styles.chatHeaderBack} onClick={() => setIsMessagesContainerOpen(false)} />
                        <Link to={`/seller/${userId}`} className={styles.chatHeaderLink}>
                            <ChatAvatar src={userImageUrl} name={userName} size={40} />
                            <span className={styles.chatHeaderName}>{userName}</span>
                        </Link>
                    </div>
                    {selectedChat?.ad_title && (
                        <Link to={selectedChat.ad_id ? `/advertisment/${selectedChat.ad_id}` : '#'} className={`${styles.chatAdBar} chat_ad_bar`}>
                            {selectedChat.ad_image && (
                                <img src={selectedChat.ad_image} alt="" className="chat_ad_bar_img" />
                            )}
                            <div className="chat_ad_bar_info">
                                <span className="chat_ad_bar_label">{t('chat_about_ad')}</span>
                                <span className="chat_ad_bar_title">{selectedChat.ad_title}</span>
                                {selectedChat.ad_price && <span className="chat_ad_bar_price">{selectedChat.ad_price}</span>}
                            </div>
                            <span className="chat_ad_bar_link">{t('open_ad')} →</span>
                        </Link>
                    )}
                    <div className={`test ${styles.chatScrollArea}`} style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
                        <div className={styles.messageHistory}>
                            {msgList.map((msg, index) => (
                                msg.from === user.uid ? (
                                    <div className={styles.outgoingMessage} key={msg.id || index}>
                                        <div
                                            className={styles.replyZone}
                                            onClick={() => handleReply(msg)}
                                            onDoubleClick={() => handleMessageDoubleClick(msg)}
                                            onContextMenu={(e) => handleMessageContextMenu(e, msg)}
                                            onTouchStart={(e) => handleMessageTouchStart(e, msg)}
                                            onTouchEnd={(e) => handleMessageTouchEnd(e, msg)}
                                            onTouchMove={handleMessageTouchMove}
                                        />
                                        <div
                                            className={styles.messageToBlock}
                                            onClick={() => handleReply(msg)}
                                            onDoubleClick={() => handleMessageDoubleClick(msg)}
                                            onContextMenu={(e) => handleMessageContextMenu(e, msg)}
                                            onTouchStart={(e) => handleMessageTouchStart(e, msg)}
                                            onTouchEnd={(e) => handleMessageTouchEnd(e, msg)}
                                            onTouchMove={handleMessageTouchMove}
                                        >
                                            {msg.forwarded && (
                                                <span className={styles.forwardedBadge}>
                                                    <FaShare className={styles.forwardedIcon} />
                                                    {t('forward')}
                                                </span>
                                            )}
                                            <div className={styles.msgContentWrap}>
                                            {msg.replyTo && (
                                                <div className={styles.replyQuote}>
                                                    <span className={styles.replyQuoteName}>{msg.replyTo.from === user.uid ? t('me') : userName}</span>
                                                    <span className={styles.replyQuoteText}>{msg.replyTo.type === 'image' ? '🖼' : msg.replyTo.content}</span>
                                                </div>
                                            )}
                                            {msg.type === "image" ? (
                                                <img src={msg.content} alt="received" style={{ maxWidth: '200px', borderRadius: 4 }} loading="lazy" />
                                            ) : (
                                                <span style={{ wordBreak: 'break-word' }}>{msg.content}</span>
                                            )}
                                            <span className={styles.timeStamp} title={getMsgTime(msg).toLocaleString()}>
                                                {formatMessageTimestamp(msg)}
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.incomingMessage} key={msg.id || index}>
                                        <div className="incoming-message-img" style={{ marginRight: '10px' }}>
                                            <img className={styles.userPhoto} src={userImageUrl || Logo} alt="sunil" />
                                        </div>
                                        <div
                                            className={styles.messageFromBlock}
                                            onClick={() => handleReply(msg)}
                                            onDoubleClick={() => handleMessageDoubleClick(msg)}
                                            onContextMenu={(e) => handleMessageContextMenu(e, msg)}
                                            onTouchStart={(e) => handleMessageTouchStart(e, msg)}
                                            onTouchEnd={(e) => handleMessageTouchEnd(e, msg)}
                                            onTouchMove={handleMessageTouchMove}
                                        >
                                            {msg.forwarded && (
                                                <span className={styles.forwardedBadge}>
                                                    <FaShare className={styles.forwardedIcon} />
                                                    {t('forward')}
                                                </span>
                                            )}
                                            <div className={styles.msgContentWrap}>
                                            {msg.replyTo && (
                                                <div className={styles.replyQuote}>
                                                    <span className={styles.replyQuoteName}>{msg.replyTo.from === user.uid ? t('you') : userName}</span>
                                                    <span className={styles.replyQuoteText}>{msg.replyTo.type === 'image' ? '🖼' : msg.replyTo.content}</span>
                                                </div>
                                            )}
                                            {msg.type === "image" ? (
                                                <img src={msg.content} alt="received" style={{ maxWidth: '200px', borderRadius: 4 }} loading="lazy" />
                                            ) : (
                                                <span style={{ wordBreak: 'break-word' }}>{msg.content}</span>
                                            )}
                                            <span className={styles.timeStamp} title={getMsgTime(msg).toLocaleString()}>
                                                {formatMessageTimestamp(msg)}
                                            </span>
                                            </div>
                                        </div>
                                        <div
                                            className={styles.replyZone}
                                            onClick={() => handleReply(msg)}
                                            onDoubleClick={() => handleMessageDoubleClick(msg)}
                                            onContextMenu={(e) => handleMessageContextMenu(e, msg)}
                                            onTouchStart={(e) => handleMessageTouchStart(e, msg)}
                                            onTouchEnd={(e) => handleMessageTouchEnd(e, msg)}
                                            onTouchMove={handleMessageTouchMove}
                                        />
                                    </div>
                                )
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputWrapper}>
                            {replyTo && (
                                <div className={styles.replyPreview}>
                                    <div className={styles.replyPreviewContent}>
                                        <span className={styles.replyPreviewLabel}>{t('reply')}</span>
                                        <span className={styles.replyPreviewText}>{replyTo.type === 'image' ? '🖼 Photo' : replyTo.content}</span>
                                    </div>
                                    <button type="button" className={styles.replyPreviewClose} onClick={() => setReplyTo(null)}>×</button>
                                </div>
                            )}
                        <div className={styles.inputMessage}>
                            <input
                                type="file"
                                ref={fileInput}
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                            />
                            <PaperClipOutlined className={styles.sendIcon} onClick={() => fileInput.current.click()} />
                            <TextArea className={styles.textInput} rows={1}
                                placeholder={t('input_message')} autoSize={{ minRows: 1, maxRows: 4 }}
                                value={message} onChange={e => setMessage(e.target.value)}
                                onPressEnter={handleSubmit}
                            />
                            <Button type="submit" htmlType="submit" className={styles.sendButton}>
                                <SendOutlined className={styles.sendButtonIcon} />
                            </Button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}