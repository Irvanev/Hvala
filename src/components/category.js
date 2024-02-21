import LogoSearch from "../assets/hvala.png"
const Categories = () => {
    return ( 
        <div>

            <div className="container" id="advertMedia">
                <form className="d-flex py-4">
                    <a href="/advertisment">
                        <img src={LogoSearch} alt="Logo" style={{marginRight: "10px", width: "140px"}}/>
                    </a>
                    <button className="btn btn me-2 d-none d-lg-block" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseExample" style={{backgroundColor: "#ffa600", color: "azure"}}>Категории
                    </button>

                    <div className="collapse" id="collapseExample" style={{position: "absolute", zIndex: 1, top: "16%", boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.5)"}}>
                        <ul id="categories" className="list-group">
                            <li className="list-group-item"><a href="/advertisments/estate">Недвижимость</a>
                            </li>
                            <li className="list-group-item"><a href="/advertisments/transport">Транспорт</a>
                            </li>
                            <li className="list-group-item"><a href="/advertisments/clothes">Одежда</a></li>
                            <li className="list-group-item"><a href="/advertisments/electronics">Электроника</a>
                            </li>
                            <li className="list-group-item"><a href="/advertisments/house_goods">Товары для
                                дома</a></li>
                            <li className="list-group-item"><a
                                href="/advertisments/building_materials_and_tools">Стройматериалы и
                                инструменты</a></li>
                            <li className="list-group-item"><a href="/advertisments/transport_goods">Товары для
                                транспорта</a></li>
                            <li className="list-group-item"><a href="/advertisments/home_appliance">Бытовая
                                техника</a></li>
                            <li className="list-group-item"><a href="/advertisments/service">Услуги</a></li>
                            <li className="list-group-item"><a href="/advertisments/child_goods">Товары для
                                детей</a></li>
                            <li className="list-group-item"><a href="/advertisments/health_and_beauty">Товары
                                для красоты и здоровья</a></li>
                            <li className="list-group-item"><a href="/advertisments/sport">Спорт</a></li>
                            <li className="list-group-item"><a href="/advertisments/hobby_n_Relax">Хобби и
                                отдых</a></li>
                            <li className="list-group-item"><a href="/advertisments/subcat14">Товары для
                                животных</a></li>
                            <li className="list-group-item"><a href="/advertisments/rest">Прочее</a></li>
                        </ul>
                    </div>
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                </form>
            </div>

        </div>
     );
}
 
export default Categories;