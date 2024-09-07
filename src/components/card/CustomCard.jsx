import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styles from "./custom-card.module.css";
import logo from "../../assets/logo_def.png";
import { Menu, Dropdown } from 'antd';
import { FaEdit, FaEllipsisV, FaUpload, FaTrash, FaArchive, FaArrowUp } from "react-icons/fa";
import { formatDate, getConversionRate, archivedAdvertisement, deleteAdvertisement, unarchivedAdvertisement, upAdvertisment } from './card';

import { auth } from "../../config/firebase";

const CustomCard = ({ image, price, title, location, date, currency, showButtons, id, status, user }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [stateCurrency, setStateCurrency] = useState('');
    const [conversionRate, setConversionRate] = useState(null);
    const history = useHistory();

    const handlePublish = async () => {
        if (auth.currentUser.uid === user.id || user.role === 'admin') {
            await unarchivedAdvertisement(id);
            console.log('Опубликовать');
        } else {
            console.log('Нет прав для выполнения этой операции');
        }
    };

    const handleDelete = async () => {
        if (auth.currentUser.uid === user.id || user.role === 'admin') {
            await deleteAdvertisement(id);
            console.log('Удалить');
        } else {
            console.log('Нет прав для выполнения этой операции');
        }
    };

    const handleArchive = async () => {
        if (auth.currentUser.uid === user.id || user.role === 'admin') {
            await archivedAdvertisement(id);
            console.log('Поместить в архив');
        } else {
            console.log('Нет прав для выполнения этой операции');
        }
    };

    const handlePromote = async () => {
        if (auth.currentUser.uid === user.id || user.role === 'admin') {
            await upAdvertisment(id);
            console.log('Поднять объявление');
        } else {
            console.log('Нет прав для выполнения этой операции');
        }
    };

    const menuItems = status === 'active' ? [
        { key: '1', icon: <FaArchive />, text: 'Поместить в архив', onClick: handleArchive },
        { key: '2', icon: <FaArrowUp />, text: 'Поднять объявление', onClick: handlePromote }
    ] : [
        { key: '1', icon: <FaUpload />, text: 'Опубликовать', onClick: handlePublish },
        { key: '2', icon: <FaTrash />, text: 'Удалить', onClick: handleDelete }
    ];

    const handleMenuClick = (e) => {
        const menuItem = menuItems.find(item => item.key === e.key);
        if (menuItem && menuItem.onClick) {
            menuItem.onClick();
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            {menuItems.map(item => (
                <Menu.Item key={item.key}>
                    {item.icon} {item.text}
                </Menu.Item>
            ))}
        </Menu>
    );

    useEffect(() => {
        setStateCurrency(currency);
        const fetchConversionRate = async () => {
            const rate = await getConversionRate(stateCurrency);
            setConversionRate(rate);
        }

        fetchConversionRate();
    }, [stateCurrency]);

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
            <img src={image || logo} alt={title} className={styles.image} />
            <div className={styles.details}>
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