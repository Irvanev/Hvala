import Logo from '../../assets/logo.png';
import Navbar from "../../components/Navbar/Navbar";

export const Profile = () => {
    const AdsCard = {
        maxWidth: '1000px'
    }
    const profileImage = {
        borderRadius: '50%',
        with: '100px',
        height: '100px',
    }
    const cont = {
        paddingTop: '70px'
    }
    const selections = {
        display: 'block',
        marginBottom: '10px'
    }
    return (
        <div>

            <Navbar />

            <div class="container" id="info" style={cont}>
                <div class="row">
                    <div class="col-3 profile">
                        <div class="profile-picture">
                            <img src={Logo} alt="photoProfile" id="userPhoto" style={profileImage}/>
                        </div>
                        <h2 class="profile-name" id="userName">Name</h2>
                        <div class="profile-reviews">
                            <p id="rating">5.0</p>
                            <p id="kolRating">17 Отзывов</p>
                        </div>
                        <div class="profile-sections">
                            <a href="#" style={selections}>Настройки</a>
                            <a href="#" style={selections}>Сообщения</a>
                        </div>
                    </div>
                    <div class="col-9">
                        <h2>Мои объявления</h2>
                        <div class="card mb-3" style={AdsCard}>
                            <div class="row g-0">
                                <div class="col-md-3">
                                    <img src="" class="img-fluid rounded-start" alt="" id="adPhoto"/>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title" id="title"></h5>
                                        <p class="card-text" id="price"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}