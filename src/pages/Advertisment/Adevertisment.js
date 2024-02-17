import {useEffect, useState} from 'react';
import {collection, getDocs, limit, orderBy, query, startAfter} from 'firebase/firestore';
import {db} from "../../config/firebase";
import Logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import LogoSearch from "../../assets/hvala.png"
import Navbar from '../../components/Navbar/Navbar';
import "./advert.css"


export const Advertisement = () => {
    const [ads, setAds] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);

    const aStyle = {
        textDecoration: 'none',
    }

    const logoSearch = {
        marginRight: "10px",
        width: "140px"
    }
    const collapse = {
        backgroundColor: "#ffa600",
        color: "azure"
    }

    const drop = {
        position: "absolute",
        zIndex: 1,
        top: "16%",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.5)"
    }



    const fetchAds = async (afterDoc) => {
        let adsQuery = query(collection(db, 'advertisment'), orderBy('timeCreation', 'desc'), limit(20));
        if (afterDoc) {
            adsQuery = query(collection(db, 'advertisment'), orderBy('timeCreation', 'desc'), startAfter(afterDoc), limit(20));
        }
        const adsSnapshot = await getDocs(adsQuery);
        const adsList = adsSnapshot.docs
            .map(doc => ({id: doc.id, ...doc.data()}))
            .filter(ad => Object.keys(ad).length > 1); // фильтруем пустые документы
        setLastDoc(adsSnapshot.docs[adsSnapshot.docs.length - 1]);
        setAds(prevAds => [...prevAds, ...adsList]);
    };

    useEffect(() => {
        fetchAds();
    }, []);

    return (
        <div>
            <Navbar />
        <div className="container" id="advertMedia">
            <form class="d-flex py-4">
                <a href="/home">
                    <img src={LogoSearch} alt="Logo" style={logoSearch}/>
                </a>
                <button class="btn btn me-2 d-none d-lg-block" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" style={collapse}>Категории</button>

                <div class="collapse" id="collapseExample"  style={drop}>
                    <ul id="categories" class="list-group">
                        <li class="list-group-item"><a href="adsCategory.html?category=estate">Недвижимость</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=transport">Транспорт</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=clothes">Одежда</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=electronics">Электроника</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=house_goods">Товары для дома</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=building_materials_and_tools">Стройматериалы и инструменты</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=transport_goods">Товары для транспорта</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=home_appliance">Бытовая техника</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=service">Услуги</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=child_goods">Товары для детей</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=health_and_beauty">Товары для красоты и здоровья</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=sport">Спорт</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=hobby_n_Relax">Хобби и отдых</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=subcat14">Товары для животных</a></li>
                        <li class="list-group-item"><a href="adsCategory.html?category=rest">Прочее</a></li>
                    </ul>
                </div>
                <input class="form-control" type="search" placeholder="Search" aria-label="Search" />
            </form>
        </div>

            <div className="album bg-light mt-3">
                <div className="container">
                    <div id="cardAds" className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        {ads.map((ad, index) => (
                            <div className="col" key={index}>
                                <Link key={ad.id} to={`/advertisment/${ad.id}`} style={aStyle}>
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top"
                                             src={(ad.photoUrls && ad.photoUrls[0]) || Logo} width="100%" height="225"
                                             alt="imageAd"/>
                                        <div className="card-body">
                                            <p className="card-text">{ad.title}</p>
                                            <h6 className="card-text">{ad.price}</h6>
                                            <p className="card-text">{ad.location}</p>
                                            <p className="card-text"></p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="container mt-3">
                <button className='btn btn-primary' type="button" onClick={() => fetchAds(lastDoc)}>Показать еще</button>
            </div>

        </div>
    );
}