import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { Container, Form, Button } from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import Logotype from "../../assets/logo.png"
import {auth} from "../../config/firebase"
import {MyNavbar} from '../../components/Navbar/Navbar';

export const Authorization = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            if (user.emailVerified) {
                const userId = user.uid;
                localStorage.setItem('userId', userId);
                history.push('/advertisment');
            } else {
                alert('Пожалуйста, подтвердите свой адрес электронной почты перед входом.');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>

            <style type="text/css">
                {`
                #login {
                    font-size: 20px;
                    width: 100%;
                    background-color: orange;
                    color: white;
                    border: none;
                }
                #login:hover {
                    background-color: darkorange;
                    color: white;
                }
                
                `}
            </style>

            <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light d-lg-none">
                <div className="container">
                    <ul className="navbar-nav me-auto mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={goBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <MyNavbar/>

            <div style={{paddingTop: '4.5rem'}}>
                <img src={Logotype} alt="logo" style={{width: "200px", height: "200px", borderRadius: "50%", display: "block", margin: "auto"}}/>
            </div>
            <Container style={{ display: 'flex', alignItems: 'center', justifyContent: "center"}}>
                <Form onSubmit={handleSubmit} style={{width: "400px"}} autocomplete="on">
                    <Form.Group className="mb-3">
                        <Form.Label>{t('email')}</Form.Label>
                        <Form.Control type="email" id="email" name='email' placeholder="name@example.com" value={email}
                                      onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('password')}</Form.Label>
                        <Form.Control type="password" id="password" name='password' value={password}
                                      onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="saveSession">
                        <Form.Check type="checkbox" label={t('remember_me')}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <p>{t('notRegisteredYet')} <a href="/sign_up">{t('register')}</a></p>
                    </Form.Group>
                    <div>
                        <Button type="submit" className="btn" id="login">{t('login')}</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}