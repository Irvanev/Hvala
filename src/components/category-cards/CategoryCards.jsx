import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

import image1 from '../../assets/01_estate.png';
import image2 from '../../assets/02_transport.png';
import image3 from '../../assets/03_electronics.png';
import image4 from '../../assets/04_clothes.png';
import image5 from '../../assets/05_home_goods.png';
import image6 from '../../assets/06_building.png';
import image7 from '../../assets/07_transport_goods.png';
import image8 from '../../assets/08_animals_goods.png';
import image9 from '../../assets/09_home_appliance.png';
import image10 from '../../assets/10_services.png';
import image11 from '../../assets/11_child_goods.png';
import image12 from '../../assets/12_health_beauty_goods.png';
import image13 from '../../assets/13_sport.png';
import image14 from '../../assets/14_hobby_and_relax.png';
import image15 from '../../assets/15_rest.png';

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'transparent', top: '30%' }}
            onClick={onClick}
        >
            <CaretLeftOutlined style={{ color: 'orange', fontSize: '24px' }} />
        </div>
    );
};


const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'transparent', top: '30%' }}
            onClick={onClick}
        >
            <CaretRightOutlined style={{ color: 'orange', fontSize: '24px' }} />
        </div>
    );
};

const CategoryCards = () => {

    const [loadedCategories, setLoadedCategories] = useState([]);

    useEffect(() => {
        setLoadedCategories([
            { title: t('estate'), image: image1, link: '/advertisments/estate' },
            { title: t('transport'), image: image2, link: '/advertisments/transport' },
            { title: t('electronics'), image: image3, link: '/advertisments/electronics' },
            { title: t('clothes'), image: image4, link: '/advertisments/clothes' },
            { title: t('house_goods'), image: image5, link: '/advertisments/house_goods' },
            { title: t('building_materials_and_tools'), image: image6, link: '/advertisments/building_materials_and_tools' },
            { title: t('transport_goods'), image: image7, link: '/advertisments/transport_goods' },
            { title: t('petSupplies'), image: image8, link: '/advertisments/petSupplies' },
            { title: t('home_appliance'), image: image9, link: '/advertisments/home_appliance' },
            { title: t('service'), image: image10, link: '/advertisments/service' },
            { title: t('child_goods'), image: image11, link: '/advertisments/child_goods' },
            { title: t('health_and_beauty'), image: image12, link: '/advertisments/health_and_beauty' },
            { title: t('sport'), image: image13, link: '/advertisments/sport' },
            { title: t('hobby_n_Relax'), image: image14, link: '/advertisments/hobby_n_Relax' },
            { title: t('rest'), image: image15, link: '/advertisments/rest' },
        ]);
    }, [t]);

    const settings = {
        slidesToShow: 8,
        slidesToScroll: 4,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,

                }
            }
        ]
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '83%' }}>
                <Slider {...settings} className="custom-carousel">
                    {loadedCategories.map((category, index) => (
                        <div key={index}>
                            <Link to={category.link} style={{ textDecoration: 'none', color: 'black' }}>
                                <div className="image-container" style={{ padding: '0 10px' }}>
                                    <div className='cardImage'>
                                        <img alt={loadedCategories.title} src={category.image} style={{ borderRadius: '10px' }} />
                                    </div>
                                    <div className="image-text" style={{ textAlign: 'center' }}>
                                        {t(category.title)}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CategoryCards;