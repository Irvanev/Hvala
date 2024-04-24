import React, { useEffect, useState } from 'react';
import { Card, Col, Carousel, Dropdown, Menu, Popconfirm, } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useTranslation } from 'react-i18next';
import { getConversionRate } from '../../services/AdvertismentsHome/AdvertismentsService';
import { formatDistanceToNow, format } from 'date-fns';
import { ru, enUS, sr } from 'date-fns/locale';

import { unarchivedAdvertisement, deleteAdvertisement } from '../../services/ProfileService';

const CardAdvertisementProfileArchiveMobile = ({ advertismentArchive, index }) => {
    const { i18n } = useTranslation();
    const [conversionRate, setConversionRate] = useState(null);
    const [currency, setCurrency] = useState('');

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isUnarchived, setIsUnarchived] = useState(false);
    const [deleteAdvertisment, setDeleteAdvertisment] = useState(false);

    const handleUnarchive = async (id) => {
        await unarchivedAdvertisement(id);
        setIsUnarchived(prevState => !prevState);
    };

    const handleDelete = async (id) => {
        await deleteAdvertisement(id);
        setDeleteAdvertisment(prevState => !prevState);
    };

    useEffect(() => {
        setCurrency(advertismentArchive.currency);
        const fetchConversionRate = async () => {
            const rate = await getConversionRate(currency);
            setConversionRate(rate);
        }

        fetchConversionRate();
    }, [currency, isUnarchived, deleteAdvertisment]);

    const convertedPrice = Math.round(advertismentArchive.price * conversionRate);

    function formatDate(timestamp) {
        const locales = { ru, en: enUS, sr };
        const locale = locales[i18n.language] || enUS;

        const date = new Date(timestamp.seconds * 1000);
        const formattedDate = formatDistanceToNow(date, { addSuffix: true, locale });

        const today = new Date();
        const isToday = date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        if (isToday) {
            return format(date, 'HH:mm', { locale });
        } else if (formattedDate.includes('день')) {
            return `вчера ${format(date, 'HH:mm', { locale })}`;
        } else {
            return format(date, 'd MMMM HH:mm', { locale });
        }
    }

    return (
        <>
            <Col key={index}>
                <Card
                    hoverable
                    actions={[
                        <EditOutlined key="edit" />,
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item key="1">
                                        <Popconfirm
                                            title="Вы уверены, что хотите опубликовать?"
                                            onConfirm={() => handleUnarchive(advertismentArchive.id)}
                                            okText="Да"
                                            cancelText="Нет"
                                        >
                                            <a href="#">Опубликовать</a>
                                        </Popconfirm>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Popconfirm
                                            title="Вы уверены, что хотите полнотсью удалить объявление?"
                                            onConfirm={() => handleDelete(advertismentArchive.id)}
                                            okText="Да"
                                            cancelText="Нет"
                                        >
                                            <a href="#">Удалить</a>
                                        </Popconfirm>
                                    </Menu.Item>
                                </Menu>
                            }
                            open={dropdownVisible}
                            onOpenChange={setDropdownVisible}
                        >
                            <EllipsisOutlined onClick={() => setDropdownVisible(!dropdownVisible)} />
                        </Dropdown>,
                    ]}
                    style={{ width: '100%', height: '65vh', display: 'flex',
                    flexDirection: 'column', justifyContent: 'space-between'}}
                    bodyStyle={{ padding: 0, margin: '1vh' }}
                    cover={
                        <Link key={advertismentArchive.id} to={`/advertisment/${advertismentArchive.id}`} style={{ textDecoration: "none", color: 'black' }}>
                            <Carousel>
                                {advertismentArchive.photoUrls && advertismentArchive.photoUrls.length > 0 ? (
                                    advertismentArchive.photoUrls.map((url, index) => (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                            <img style={{ height: '25vh', width: '100%', objectFit: 'cover' }} alt="example" src={url || Logo} />
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                        <img style={{ height: '25vh', width: '100%', objectFit: 'cover' }} alt="example" src={Logo} />
                                    </div>
                                )}
                            </Carousel>
                        </Link>
                    }
                >
                    <Link key={advertismentArchive.id} to={`/advertisment/${advertismentArchive.id}`} style={{ textDecoration: "none", color: 'black' }}>
                        <Card.Meta title={advertismentArchive.title} />
                        <p style={{ color: 'grey', fontSize: '1.3em' }}>
                            {advertismentArchive.price + ' ' + currency.toUpperCase()}
                            {conversionRate &&
                                <span style={{ fontSize: '0.8em' }}> ~{convertedPrice.toFixed(2) + '' + (currency === 'eur' ? 'din' : '€')}
                                </span>
                            }
                        </p>
                        <p style={{
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {advertismentArchive.location}
                        </p>
                        <p>{formatDate(advertismentArchive.time_creation)}</p>
                    </Link>

                </Card>

            </Col >
        </>
    );
};

export default CardAdvertisementProfileArchiveMobile;