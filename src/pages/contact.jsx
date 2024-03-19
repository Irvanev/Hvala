import React from "react";
import { useTranslation } from "react-i18next";
import { MyNavbar } from "../components/Navbar/Navbar";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Instagram from "../assets/instagram_icon.png";
import Facebook from "../assets/facebook_icon.png";

const Contact = () => {
  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleSocialClick = (url) => {
    window.open(url, "_blank");
  };

  const { t } = useTranslation();

  return (
    <div>
      <style type="text/css">
        {`
                @media (max-width: 1000px) {
                    body {
                        padding-bottom: 6.0rem;
                    }
                }
                @media (min-width: 1000px) {
                    body {
                        padding-top: 3.5rem;
                        padding-bottom: 3.5em;
                    }
                }
                `}
      </style>
      <MyNavbar />
      <Container className="mt-3">
        <h3>Контактная информация</h3>
        <h5
          style={{
            lineHeight: "1.5",
            color: "#333",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Если у вас есть вопросы, предложения или комментарии, мы всегда рады
          услышать от вас. Наша команда всегда готова помочь вам с любыми
          вопросами, связанными с нашим приложением. Не стесняйтесь обращаться к
          нам по электронной почте в любое время. Мы ценим ваше мнение и
          стремимся улучшить наше приложение, чтобы оно было максимально удобным
          и полезным для вас. Также вы можете связаться с нами через социальные
          сети - мы активны в Instagram и Facebook.
        </h5>
        <div
          style={{ marginTop: "10px" }}
          onClick={() => handleEmailClick("support@hvala.app")}
        >
          <p style={{ fontSize: "20px", color: "black" }}>
            Email: <span style={{ color: "orange" }}>support@hvala.app</span>
          </p>
        </div>
        <div
          style={{ marginTop: "10px" }}
          onClick={() => handleEmailClick("info@hvala.app")}
        >
          <p style={{ fontSize: "20px", color: "black" }}>
            Email: <span style={{ color: "orange" }}>info@hvala.app</span>
          </p>
        </div>
        <div
          style={{
            marginTop: "10px",
            between: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={Instagram}
            alt="Instagram"
            style={{ height: "50px", width: "50px", marginRight: "10px" }}
            onClick={() =>
              handleSocialClick("https://www.instagram.com/your_username")
            }
          />
          <Image
            src={Facebook}
            alt="Facebook"
            style={{ height: "50px", width: "50px", marginLeft: "10px" }}
            onClick={() =>
              handleSocialClick("https://www.facebook.com/your_username")
            }
          />
        </div>
      </Container>
    </div>
  );
};

export default Contact;
