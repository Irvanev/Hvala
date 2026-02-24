import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { MyNavbar } from "../components/Navbar/Navbar";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Instagram from "../assets/instagram_icon.png";
import Facebook from "../assets/facebook_icon.png";

const Contact = () => {
  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>Kontaktirajte nas - Hvala | Stupite u kontakt danas</title>
        <meta
          name="description"
          content="Kontaktirajte Hvala za upite, podršku ili povratne informacije. Naš tim je spreman da vam pomogne. Kontaktirajte nas putem e-pošte, telefona ili posetite našu kancelariju."
        />
        <meta
          name="keywords"
          content="kontakt, podrška, korisnička služba, Hvala, e-pošta, contact Hvala, support Montenegro, контакт Hvala, поддержка"
        />
        <meta
          property="og:title"
          content="Kontaktirajte nas - Hvala | Stupite u kontakt danas"
        />
        <meta
          property="og:description"
          content="Tražite podršku ili imate pitanje? Kontaktirajte Hvala danas putem e-pošte. Tu smo da vam pomognemo."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://hvala.app/contacts"
        />
        <link rel="canonical" href="https://hvala.app/contacts" />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/9.jpg?alt=media&token=653bbaef-3d39-410e-93fe-3adaec37f56c"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kontaktirajte nas - Hvala | Stupite u kontakt danas"
        />
        <meta
          name="twitter:description"
          content="Treba vam pomoć? Kontaktirajte Hvala za sve upite, podršku ili povratne informacije. Spremni smo da vam pomognemo."
        />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/9.jpg?alt=media&token=653bbaef-3d39-410e-93fe-3adaec37f56c"
        />
      </Helmet>
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
        <h3>{t("contact_navbar")}</h3>
        <h5
          style={{
            lineHeight: "1.5",
            color: "#333",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {t("contactUs")}
        </h5>
        <div
          style={{ marginTop: "10px" }}
          onClick={() => handleEmailClick("support@hvala.app")}
        >
          <p style={{ fontSize: "20px", color: "black" }}>
            {t("email")}:{" "}
            <span style={{ color: "orange" }}>support@hvala.app</span>
          </p>
        </div>
        <div
          style={{ marginTop: "10px" }}
          onClick={() => handleEmailClick("info@hvala.app")}
        >
          <p style={{ fontSize: "20px", color: "black" }}>
            {t("email")}:{" "}
            <span style={{ color: "orange" }}>info@hvala.app</span>
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
          <a
            href="https://www.instagram.com/hvala.app?igsh=ZmJiOWtrbDY1enNm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={Instagram}
              alt="Instagram"
              style={{ height: "50px", width: "50px", marginRight: "10px" }}
            />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61553691035329&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={Facebook}
              alt="Facebook"
              style={{ height: "50px", width: "50px", marginLeft: "10px" }}
            />
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
