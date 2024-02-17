import React, {useState} from 'react';
import Logotype from "../../assets/logo.png"
import "./registration.css"
import {auth, db} from "../../config/firebase"
import {createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc, serverTimestamp} from "firebase/firestore";
import {useHistory} from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";

export const Registration = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confPassword) {
            alert('Пароли не совпадают');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                addtime: serverTimestamp(), // текущее время
                role: "user",
                fcmtoken: "",
                location: "",
                photoUrl: "",
                rating: 0,
                name: username,
                email: email,
                id: user.uid
            });
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

            <div class="container mt-3" id="conAuth">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                               placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="username" class="form-label">User name</label>
                        <input type="text" class="form-control" id="username" value={username}
                               onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" value={password}
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="confPassword" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="confPassword" value={confPassword}
                               onChange={e => setConfPassword(e.target.value)}/>
                    </div>
                    <button type="submit" id="buttonSum" class="btn">Регистрация</button>
                    <div class="mb-3 pb-5">
                        <p>Уже зарегистрированы? <a href="/sign_in">Войти</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}