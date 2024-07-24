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
        <title>Contact Us - Hvala | Get in Touch Today</title>
        <meta
          name="description"
          content="Reach out to Hvala for inquiries, support, or feedback. Our team is ready to assist you. Contact us via email, phone, or visit our office."
        />
        <meta
          name="keywords"
          content="contact, support, customer service, Hvala, email"
        />
        <meta
          property="og:title"
          content="Contact Us - Hvala | Get in Touch Today"
        />
        <meta
          property="og:description"
          content="Looking for support or have a question? Contact Hvala today via email. We're here to help."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.yourcompanywebsite.com/contact"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/9.jpg?alt=media&token=653bbaef-3d39-410e-93fe-3adaec37f56c"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact Us - Hvala | Get in Touch Today"
        />
        <meta
          name="twitter:description"
          content="Need assistance? Contact Hvala for all inquiries, support, or feedback. We're ready to help you."
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
          <a href="https://www.instagram.com/hvala.app?igsh=ZmJiOWtrbDY1enNm">
            <Image
              src={Instagram}
              alt="Instagram"
              style={{ height: "50px", width: "50px", marginRight: "10px" }}
            />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61553691035329&mibextid=ZbWKwL">
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
