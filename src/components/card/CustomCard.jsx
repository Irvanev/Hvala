import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./custom-card.module.css";
import logo from "../../assets/logo_def.png";
import { Menu, Dropdown, Carousel, message, Popconfirm } from 'antd';
import { FaEdit, FaEllipsisV, FaUpload, FaTrash, FaArchive, FaArrowUp } from "react-icons/fa";
import { formatDate, getConversionRate, archivedAdvertisement, deleteAdvertisement, unarchivedAdvertisement, upAdvertisment } from './card';

import { auth } from "../../config/firebase";

const CustomCard = ({ images, price, title, location, date, currency, showButtons, id, status, user, _resizing }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [stateCurrency, setStateCurrency] = useState('');
    const [conversionRate, setConversionRate] = useState(null);
    const history = useHistory();
    const { t } = useTranslation();

    const handleCardClick = () => {
        history.push(`/advertisment/${id}`);
    };

    const handlePublish = async () => {
        if (auth.currentUser.uid === user.id || user.role === 'admin') {
            await unarchivedAdvertisement(id);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            console.log('Нет прав для выполнения этой операции');
        }
    };

    const handleDelete = async () => {
        if (auth.currentUser.uid === user.id || user.role === 'admin') {
            await deleteAdvertisement(id);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            console.log('Нет прав для выполнения этой операции');
        }
    };

    const handleArchive = async () => {
        if (auth.currentUser.uid === user.id || user.role === 'admin') {
            await archivedAdvertisement(id);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            console.log('Нет прав для выполнения этой операции');
        }
    };

    const handlePromote = async () => {
        if (auth.currentUser.uid === user.id || user.role === 'admin') {
            try {
                await upAdvertisment(id, {
                    success: (msg) => {
                        message.success(t(msg));
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    },
                    error: (msg) => message.error(t(msg))
                });
            } catch (error) {
                message.error(t('up_error'));
            }
        } else {
            console.log('Нет прав для выполнения этой операции');
        }
    };

    const menuItems = status === 'active' ? [
        { key: '1', text: t('move_on_archiv'), onClick: handleArchive, confirmMessage: t('move_to_archive_question') },
        { key: '2', text: t('up_ad'), onClick: handlePromote, confirmMessage: t('up_question') }
    ] : [
        { key: '1', text: t('publish'), onClick: handlePublish, confirmMessage: t('publish_question') },
        { key: '2', text: t('delete'), onClick: handleDelete, confirmMessage: t('delete_question') }
    ];

    const handleMenuClick = (e) => {
        const menuItem = menuItems.find(item => item.key === e.key);
        if (menuItem && menuItem.onClick) {
            menuItem.onClick();
        }
    };

    const menu = (
        <Menu>
            {menuItems.map(item => (
                <Menu.Item key={item.key}>
                    <Popconfirm
                        title={item.confirmMessage}
                        onConfirm={item.onClick}
                        okText={t('yes')}
                        cancelText={t('no')}
                    >
                        <span>{item.text}</span>
                    </Popconfirm>
                </Menu.Item>
            ))}
        </Menu>
    );

    useEffect(() => {
        setStateCurrency(currency);
        // Используем кэшированную версию getConversionRate
        const fetchConversionRate = async () => {
            if (currency) {
                const rate = await getConversionRate(currency);
                setConversionRate(rate);
            }
        }

        fetchConversionRate();
    }, [currency]);

    const convertedPrice = Math.round(price * conversionRate);

    const formatPrice = (price) => {
        if (price >= 1000000) {
            return Math.round(price / 1000000) + 'м';
        } else if (price >= 100000) {
            return Math.round(price / 1000) + 'к';
        } else {
            return price.toString();
        }
    };

    const handleButtonEditClick = () => {
        history.push("/edit/" + id);
    }

    return (
        <div className={styles.card}>
            <Carousel>
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                            <img 
                                src={image ? image : logo} 
                                alt={title} 
                                className={styles.image} 
                                onClick={handleCardClick}
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                                style={{
                                    opacity: _resizing && index === 0 ? 0.7 : 1,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            {_resizing && index === 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '12px',
                                    color: '#666',
                                    background: 'rgba(255,255,255,0.9)',
                                    padding: '4px 8px',
                                    borderRadius: '4px'
                                }}>
                                    Оптимизация...
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>
                        <img src={logo} alt={title} className={styles.image} loading="eager" />
                    </div>
                )}
            </Carousel>
            <div className={styles.details}>
                <div onClick={handleCardClick}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.price}>
                        {formatPrice(price) + ' ' + currency.toUpperCase()}
                        {conversionRate &&
                            <span style={{ fontSize: '0.8em' }}> ~{formatPrice(convertedPrice) + ' ' + (currency === 'eur' ? 'din' : '€')}
                            </span>
                        }
                    </p>
                    <p className={styles.location}>{location}</p>
                    <p className={styles.date}>{formatDate(date)}</p>
                </div>
                {showButtons && (
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={handleButtonEditClick}>
                            <FaEdit />
                        </button>
                        <Dropdown overlay={menu} trigger={['click']} onVisibleChange={setMenuOpen} visible={menuOpen}>
                            <button className={styles.button}>
                                <FaEllipsisV />
                            </button>
                        </Dropdown>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomCard;