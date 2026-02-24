import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./authorizations.module.css";
import { useHistory, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Form, Input, Flex, Modal, Spin, message } from "antd";
import { useTranslation } from "react-i18next";
import Logotype from "../../assets/logo_def.png";
import { auth, db } from "../../config/firebase";
import { MyNavbar } from "../../components/Navbar/Navbar";
import { NavBarBack } from "../../components/Navbar/NavBarBack";
import { useUserRole } from "../../context/UserRoleContext";

import {
  collection,
  query,
  getDocs,
  where,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

export const Authorization = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { setRole } = useUserRole();

  const buildReferralCode = (userId) => {
    const normalized = String(userId || "").replace(/[^a-zA-Z0-9]/g, "");
    return `HVL-${(normalized.slice(0, 6) || "USER").toUpperCase()}`;
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

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        const userId = user.uid;
        localStorage.setItem("userId", userId);

        // Получите роль пользователя из базы данных или другого источника
        const userRole = await fetchUserRole(userId);
        setRole(userRole);

        history.push("/profile");
      } else {
        setLoginError(t("confirm_email"));
      }
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setLoginError(t("invalid_email_or_password"));
      } else {
        setLoginError(error.message);
      }
    }
  };

  const fetchUserRole = async (userId) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    let userRole = null;
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        userRole = doc.data().role;
      }
    });

    return userRole;
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      message.success(t("forgot_password_sent"));
      setIsModalVisible(false);
    } catch (error) {
      setResetError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Helmet>
        <title>Stranica za Autorizaciju - Prijavite se | Hvala</title>
        <meta
          name="description"
          content="Prijavite se na Hvala i pristupite najboljim oglasima za razne kategorije, uključujući nekretnine, transport, odeću, elektroniku i još mnogo toga."
        />
        <meta
          name="keywords"
          content="autorizacija, prijava, korisnik, autentifikacija, login Hvala, sign in Montenegro, вход Hvala, авторизация"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Stranica za Autorizaciju - Prijavite se | Hvala"
        />
        <meta
          property="og:description"
          content="Prijavite se na Hvala i pristupite najboljim oglasima za razne kategorije, uključujući nekretnine, transport, odeću, elektroniku i još mnogo toga."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hvala.app/sign_in" />
        <link rel="canonical" href="https://hvala.app/sign_in" />
        <meta
          property="og:image"
          content="https://hvala.app/android-chrome-512x512.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Stranica za Autorizaciju - Prijavite se | Hvala"
        />
        <meta
          name="twitter:description"
          content="Prijavite se na Hvala i pristupite najboljim oglasima za razne kategorije, uključujući nekretnine, transport, odeću, elektroniku i još mnogo toga."
        />
        <meta
          name="twitter:image"
          content="https://hvala.app/android-chrome-512x512.png"
        />
      </Helmet>

      <NavBarBack />

      <MyNavbar />

      <div className={styles.body}>
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
              autoComplete="on"
            >
              <Form.Item
                label={t("email")}
                name="email"
                rules={[
                  { required: true, message: t("input_email") },
                  { type: "email", message: t("input_correct_email") },
                ]}
              >
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              {loginError && <p style={{ color: "red" }}>{loginError}</p>}
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <p>
                      {t("notRegisteredYet")}{" "}
                      <Link to={`/sign_up`} className={styles.customLink}>
                        {t("register")}
                      </Link>
                    </p>
                  </Form.Item>
                  <p>
                    <a
                      className={styles.customLink}
                      onClick={showModal}
                      href="#"
                    >
                      {t("forgot_password")}
                    </a>
                  </p>
                </Flex>
              </Form.Item>
              <Form.Item>
                <button
                  className={styles.submitButton}
                  size="large"
                  htmlType="submit"
                  id="login"
                >
                  {t("login")}
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
            </Form>
          </div>
        </div>
      </div>
      <Modal
        title={t("recovery_password")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handlePasswordReset}>
          <Form.Item
            label="Email"
            name="resetEmail"
            rules={[
              { required: true, message: "Пожалуйста, введите ваш email" },
              {
                type: "email",
                message: "Пожалуйста, введите корректный email",
              },
            ]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <button
              disabled={loading}
              className={styles.submitButton}
              size="large"
              htmlType="submit"
            >
              {loading ? <Spin /> : t("send")}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
