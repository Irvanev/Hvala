import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Col, Carousel, Dropdown, Menu, Popconfirm, } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo_def.png';
import { useTranslation } from 'react-i18next';
import { getConversionRate } from '../../services/AdvertismentsHome/AdvertismentsService';
import { formatDistanceToNow, format } from 'date-fns';
import { ru, enUS, sr } from 'date-fns/locale';

import { archivedAdvertisement } from '../../services/ProfileService';

const CardAdvertisementProfile = ({ advertisment, index }) => {
    const history = useHistory();
    const { i18n } = useTranslation();
    const {t} = useTranslation();
    const [conversionRate, setConversionRate] = useState(null);
    const [currency, setCurrency] = useState('');

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isArchived, setIsArchived] = useState(false);

    const handleEditClick = () => {
        history.push(`/edit/${advertisment.id}`);
      };

    const handleArchive = async (id) => {
        await archivedAdvertisement(id);
        setIsArchived(prevState => !prevState);
    };

    useEffect(() => {
        setCurrency(advertisment.currency);
        const fetchConversionRate = async () => {
            const rate = await getConversionRate(currency);
            setConversionRate(rate);
        }

        fetchConversionRate();
    }, [currency, isArchived]);

    const convertedPrice = Math.round(advertisment.price * conversionRate);

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
            <Col key={index} style={{paddingBottom: '50px'}}>
                <Card
                    hoverable
                    actions={[
                        <EditOutlined key="edit" onClick={handleEditClick} />,
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item key="1">
                                        <Popconfirm
                                            title={t('publish_question')}
                                            onConfirm={() => handleArchive(advertisment.id)}
                                            okText={t('yes')}
                                            cancelText={t('no')}
                                        >
                                            <a href="#">{t('move_on_archiv')}</a>
                                        </Popconfirm>
                                    </Menu.Item>

                                </Menu>
                            }
                            visible={dropdownVisible}
                            onVisibleChange={setDropdownVisible}
                        >
                            <EllipsisOutlined onClick={() => setDropdownVisible(!dropdownVisible)} />
                        </Dropdown>,
                    ]}
                    style={{ width: '100%', height: '57vh', display: 'flex',
                    flexDirection: 'column', justifyContent: 'space-between'}}
                    bodyStyle={{ padding: 0, margin: '1vh' }}
                    cover={
                        <Link key={advertisment.id} to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none", color: 'black' }}>
                            <Carousel>
                                {advertisment.photoUrls && advertisment.photoUrls.length > 0 ? (
                                    advertisment.photoUrls.map((url, index) => (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                            <img style={{ height: '30vh', width: '100%', objectFit: 'cover' }} alt="example" src={url || Logo} />
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                                        <img style={{ height: '30vh', width: '100%', objectFit: 'cover' }} alt="example" src={Logo} />
                                    </div>
                                )}
                            </Carousel>
                        </Link>
                    }
                >
                    <Link key={advertisment.id} to={`/advertisment/${advertisment.id}`} style={{ textDecoration: "none", color: 'black' }}>
                        <Card.Meta title={advertisment.title} />
                        <p style={{ color: 'grey', fontSize: '1.3em' }}>
                            {advertisment.price + ' ' + currency.toUpperCase()}
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
                            {advertisment.location}
                        </p>
                        <p>{formatDate(advertisment.time_creation)}</p>
                    </Link>

                </Card>

            </Col >
        </>
    );
};

export default CardAdvertisementProfile;