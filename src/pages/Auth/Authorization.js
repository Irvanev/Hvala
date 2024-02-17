import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';
import "./authorizations.css"
import Logotype from "../../assets/logo.png"
import {auth} from "../../config/firebase"
import Navbar from "../../components/Navbar/Navbar";

export const Authorization = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            history.push('/advertisment');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light d-lg-none">
                <div className="container">
                    <ul className="navbar-nav me-auto mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick="goBack()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <Navbar />

            <div id="start">
                <img src={Logotype} alt="logo" id="logo"/>
            </div>
            <div className="container" id="conAuth">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="sign_in_email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="sign_in_email" aria-describedby="emailHelp"
                               placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sign_in_password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="sign_in_password" value={password}
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="saveSession"/>
                        <label className="form-check-label" htmlFor="saveSession">Запомнить меня</label>
                    </div>
                    <div className="mb-3">
                        <p>Еще не зарегистрированы? <a href="/sign_up">Зарегистрироваться</a></p>
                    </div>
                    <div id="sumbitButton">
                        <button type="submit" className="btn" id="buttonSum">Войти</button>
                    </div>
                </form>
            </div>
        </div>
    );
}