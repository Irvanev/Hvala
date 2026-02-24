import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import Logotype from "../../assets/logo_def.png";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { useHistory, Link } from "react-router-dom";
import { useUserRole } from "../../context/UserRoleContext";
import { MyNavbar } from "../../components/Navbar/Navbar";
import { Form, Input, Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { NavBarBack } from "../../components/Navbar/NavBarBack";

import styles from "./registration.module.css";

export const Registration = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const { setRole } = useUserRole();
  const referralCodeFromUrl = new URLSearchParams(window.location.search).get("ref") || "";

  const buildReferralCode = (userId) => {
    const normalized = String(userId || "").replace(/[^a-zA-Z0-9]/g, "");
    return `HVL-${(normalized.slice(0, 6) || "USER").toUpperCase()}`;
  };

  const fetchUserRole = async (userId) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("id", "==", userId));
    const querySnapshot = await getDocs(q);
    let userRole = null;
    querySnapshot.forEach((docSnap) => {
      if (docSnap.exists()) userRole = docSnap.data().role;
    });
    return userRole;
  };

  const ensureUserInFirestore = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        addtime: serverTimestamp(),
        role: "user",
        link: user.uid,
        fcmtoken: "",
        location: "",
        photoUrl: user.photoURL || "",
        rating: 0,
        name: user.displayName || user.email?.split("@")[0] || "User",
        email: user.email || "",
        id: user.uid,
        hvalaCoinBalance: 0,
        hvalaCoinCreatedAt: serverTimestamp(),
        firstAdBonusGranted: false,
        referralCode: buildReferralCode(user.uid),
        invitedByReferralCode: referralCodeFromUrl,
      });
      await addDoc(collection(db, "message"), {
        from_avatar: "",
        from_name: user.displayName || user.email?.split("@")[0] || "User",
        from_uid: user.uid,
        last_msg: "",
        last_time: serverTimestamp(),
        msg_num: 0,
        to_avatar: "https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/avatars%2Fhpdpgwmqdy688id.jpg?alt=media&token=bbd54fdc-6c39-46dd-9292-7f778e54584d",
        to_name: "Chat-helper",
        to_uid: "rT133kD5FROrwnXIweP3crx1S1Y2",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setLoginError("");
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      await ensureUserInFirestore(user);

      localStorage.setItem("userId", user.uid);
      const userRole = await fetchUserRole(user.uid);
      setRole(userRole || "user");
      history.push("/profile");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
        setLoginError("");
      } else if (error.code === "auth/account-exists-with-different-credential") {
        setLoginError(t("google_email_exists"));
      } else {
        setLoginError(error.message || t("google_sign_in_error"));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    await signOut(auth);
    localStorage.clear();
    history.push("/sign_in");
  };

  const handleCancel = async () => {
    setIsModalVisible(false);
    await signOut(auth);
    localStorage.clear();
    history.push("/sign_in");
  };

  const checkUsername = async (username) => {
    const q = query(collection(db, "users"), where("name", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const checkEmail = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e) => {
    if (password !== confPassword) {
      return;
    }
    if (!username || !username.trim()) {
      return;
    }
    const isUsernameTaken = await checkUsername(username.trim());
    if (isUsernameTaken) {
      setLoginError(t("username_is_taken"));
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      showModal();

      await setDoc(doc(db, "users", user.uid), {
        addtime: serverTimestamp(),
        role: "user",
        link: user.uid,
        fcmtoken: "",
        location: "",
        photoUrl: "",
        rating: 0,
        name: username,
        email: email,
        id: user.uid,
        hvalaCoinBalance: 0,
        hvalaCoinCreatedAt: serverTimestamp(),
        firstAdBonusGranted: false,
        referralCode: buildReferralCode(user.uid),
        invitedByReferralCode: referralCodeFromUrl,
      });

      await addDoc(collection(db, "message"), {
        from_avatar: "",
        from_name: username,
        from_uid: user.uid,
        last_msg:"",
        last_time: serverTimestamp(),
        msg_num: 0,
        to_avatar: "https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/avatars%2Fhpdpgwmqdy688id.jpg?alt=media&token=bbd54fdc-6c39-46dd-9292-7f778e54584d",
        to_name: "Chat-helper",
        to_uid:"rT133kD5FROrwnXIweP3crx1S1Y2"
      });

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Stranica za Registraciju - Prijavite se | Hvala</title>
        <meta
          name="description"
          content="Registrujte se na Hvala i pristupite najboljim oglasima za razne kategorije, uključujući nekretnine, transport, odeću, elektroniku i još mnogo toga."
        />
        <meta
          name="keywords"
          content="registracija, prijava, korisnik, autentifikacija, register Hvala, sign up Montenegro, регистрация Hvala, создать аккаунт"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Stranica za Registraciju - Prijavite se | Hvala"
        />
        <meta
          property="og:description"
          content="Registrujte se na Hvala i pristupite najboljim oglasima za razne kategorije, uključujući nekretnine, transport, odeću, elektroniku i još mnogo toga."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hvala.app/sign_up" />
        <link rel="canonical" href="https://hvala.app/sign_up" />
        <meta
          property="og:image"
          content="https://hvala.app/android-chrome-512x512.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Stranica za Registraciju - Prijavite se | Hvala"
        />
        <meta
          name="twitter:description"
          content="Registrujte se na Hvala i pristupite najboljim oglasima za razne kategorije, uključujući nekretnine, transport, odeću, elektroniku i još mnogo toga."
        />
        <meta
          name="twitter:image"
          content="https://hvala.app/android-chrome-512x512.png"
        />
      </Helmet>
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
                @media (max-width: 1000px) {
                    body {
                        padding-bottom: 4.5rem;
                    }
                }
                @media (min-width: 1000px) {
                  body {
                        padding-top: 4.5rem;
                        padding-bottom: 2.5rem;
                    }
                
                `}
      </style>

      <NavBarBack />

      <MyNavbar />

      <div className="container">
        <div style={{ paddingTop: "4.5rem" }}>
          <img
            src={Logotype}
            alt="logo"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              display: "block",
              margin: "auto",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            style={{ width: "400px" }}
          >
            <Form.Item
              label={t("email")}
              name="email"
              rules={[
                { required: true, message: t("input_email") },
                { type: "email", message: t("input_correct_email") },
                () => ({
                  validator(_, value) {
                    return checkEmail(value).then((isEmailTaken) => {
                      if (isEmailTaken) {
                        return Promise.reject(t("email_busy"));
                      }
                      return Promise.resolve();
                    });
                  },
                }),
              ]}
            >
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={t("username")}
              name="username"
              rules={[
                { required: true, message: t("input_username") },
                () => ({
                  validator(_, value) {
                    if (!value || !String(value).trim()) {
                      return Promise.resolve();
                    }
                    return checkUsername(value.trim()).then((isUsernameTaken) => {
                      if (isUsernameTaken) {
                        return Promise.reject(t("username_busy"));
                      }
                      return Promise.resolve();
                    });
                  },
                }),
              ]}
            >
              <Input
                type="text"
                value={username}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={t("password")}
              name="password"
              rules={[
                { required: true, message: t("input_password") },
                { min: 6, message: t("input_correct_password") },
              ]}
            >
              <Input.Password
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={t("confirmPassword")}
              name="confirmPassword"
              rules={[
                { required: true, message: t("input_password_again") },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t("passwords_not_match")));
                  },
                }),
              ]}
            >
              <Input.Password
                value={confPassword}
                autoComplete="new-password"
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <p>
                {t("alreadyRegistered")}{" "}
                <Link to={`/sign_in`} className={styles.customLink}>
                  {t("login")}
                </Link>
              </p>
            </Form.Item>
            <Form.Item>
              <button
                size="large"
                htmlType="submit"
                className={styles.submitButton}
              >
                {t("register")}
              </button>
            </Form.Item>
            <Form.Item style={{ marginBottom: 8 }}>
              <div style={{ textAlign: "center", color: "#999", fontSize: 14 }}>
                {t("or")}
              </div>
            </Form.Item>
            <Form.Item>
              <div className={styles.googleButtonWrapper}>
                <span className={styles.newBadge}>{t("new")}</span>
                <button
                type="button"
                className={styles.googleButton}
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <span>{t("loading")}...</span>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {t("sign_in_with_google")}
                  </>
                )}
              </button>
              </div>
            </Form.Item>
            <Modal
              title={t("confirming_email")}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>{t("confirmEmail")}</p>
            </Modal>
          </Form>
        </div>
      </div>
    </div>
  );
};
