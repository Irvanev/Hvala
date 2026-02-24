import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CaretLeftOutlined, CaretRightOutlined, PictureOutlined } from '@ant-design/icons';

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
import image16 from '../../assets/16_Shoes.png';
import image17 from '../../assets/17_Work.png';
import { arrayUnion } from 'firebase/firestore';

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'transparent', top: '30%' }}
            onClick={onClick}
        >
            <CaretLeftOutlined style={{ color: '#FFBF34', fontSize: '24px' }} />
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
            <CaretRightOutlined style={{ color: '#FFBF34', fontSize: '24px' }} />
        </div>
    );
};

const CategoryCards = () => {

    const [loadedCategories, setLoadedCategories] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        setLoadedCategories([
            { title: t('estate'), image: image1, link: '/advertisments/estate' },
            { title: t('transport'), image: image2, link: '/advertisments/transport' },
            { title: t('electronics'), image: image3, link: '/advertisments/electronics' },
            { title: t('clothes'), image: image4, link: '/advertisments/clothes' },
            { title: t('shoes'), image: image16, link: '/advertisments/shoes', isNew: true },
            { title: t('work'), image: image17, link: '/advertisments/work', isNew: true },
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
                    slidesToShow: 3,
                    slidesToScroll: 3,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                }
            }
        ]
    };

    return (
        <div className='container'>
            <div className='d-lg-none' style={{ display: 'flex', justifyContent: 'center', width: '90%', margin: '0 auto' }}>
                <div style={{ width: '100%' }}>
                    <Slider {...settings} className="custom-carousel" style={{ margin: '0 auto' }}>
                        {loadedCategories.map((category, index) => (
                            <div key={index}>
                                <Link to={category.link} style={{ textDecoration: 'none', color: 'black' }}>
                                    <div className="image-container" style={{ padding: '0 10px', position: 'relative' }}>
                                        {category.isNew && (
                                            <span style={{ position: 'absolute', top: 4, right: 14, background: '#03989F', color: '#fff', fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: 4, zIndex: 1 }}>NEW</span>
                                        )}
                                        <div className='cardImage'>
                                            {category.placeholder ? (
                                                <div style={{ width: '100%', aspectRatio: '1', borderRadius: '10px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80px' }}>
                                                    <PictureOutlined style={{ fontSize: '32px', color: '#bfbfbf' }} />
                                                </div>
                                            ) : (
                                                <img alt={category.title} src={category.image} style={{ borderRadius: '10px' }} />
                                            )}
                                        </div>
                                        <div className="image-text" style={{ textAlign: 'center' }}>
                                            {category.title}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className='d-none d-lg-block' style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '0 auto' }}>
                <div style={{ width: '100%' }}>
                    <Slider {...settings} className="custom-carousel" style={{ margin: '0 auto' }}>
                        {loadedCategories.map((category, index) => (
                            <div key={index}>
                                <Link to={category.link} style={{ textDecoration: 'none', color: 'black' }}>
                                    <div className="image-container" style={{ padding: '0 10px', position: 'relative' }}>
                                        {category.isNew && (
                                            <span style={{ position: 'absolute', top: 4, right: 14, background: '#03989F', color: '#fff', fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: 4, zIndex: 1 }}>NEW</span>
                                        )}
                                        <div className='cardImage'>
                                            {category.placeholder ? (
                                                <div style={{ width: '100%', aspectRatio: '1', borderRadius: '10px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80px' }}>
                                                    <PictureOutlined style={{ fontSize: '32px', color: '#bfbfbf' }} />
                                                </div>
                                            ) : (
                                                <img alt={category.title} src={category.image} style={{ borderRadius: '10px' }} />
                                            )}
                                        </div>
                                        <div className="image-text" style={{ textAlign: 'center' }}>
                                            {category.title}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default CategoryCards;