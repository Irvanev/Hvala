import { Container, Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { MyNavbar } from "../components/Navbar/Navbar";

const GUIDE_ITEMS = [
  { title: 'guide_home_title', body: 'guide_home' },
  { title: 'guide_categories_title', body: 'guide_categories' },
  { title: 'guide_ad_page_title', body: 'guide_ad_page' },
  { title: 'guide_profile_title', body: 'guide_profile' },
  { title: 'guide_add_ad_title', body: 'guide_add_ad' },
  { title: 'guide_messages_title', body: 'guide_messages' },
  { title: 'guide_seller_title', body: 'guide_seller' },
  { title: 'guide_settings_title', body: 'guide_settings' },
];

const FAQ_ITEMS = [
  { q: 'send_advert_question', a: 'send_advert' },
  { q: 'delete_advert_question', a: 'delete_advert' },
  { q: 'change_password_question', a: 'forgot_pass' },
  { q: 'change_email_question', a: 'change_language' },
  { q: 'share_advert_question', a: 'share_advert' },
  { q: 'send_seller_question', a: 'send_seller' },
  { q: 'chat_helper_question', a: 'chat_helper' },
  { q: 'do_filter_question', a: 'do_filter' },
  { q: 'edit_data_question', a: 'edit_data' },
  { q: 'rating_seller_question', a: 'rating_seller' },
  { q: 'security_data_question', a: 'security_data' },
];

const Help = () => {
  const { t } = useTranslation();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
      '@type': 'Question',
      name: t(q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(a),
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Pomoć - Često postavljana pitanja | Hvala</title>
        <meta
          name="description"
          content="Pronađite odgovore na često postavljana pitanja o uslugama Hvala. Dobijte podršku koja vam je potrebna uz našu sveobuhvatnu sekciju FAQ."
        />
        <meta
          name="keywords"
          content="FAQ, pomoć, podrška, pitanja, odgovori, Hvala, help Hvala, FAQ Montenegro, помощь Hvala, часто задаваемые вопросы"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Pomoć - Često postavljana pitanja | Hvala"
        />
        <meta
          property="og:description"
          content="Pronađite odgovore na često postavljana pitanja o uslugama Hvala. Dobijte podršku koja vam je potrebna uz našu sveobuhvatnu sekciju FAQ."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://hvala.app/help"
        />
        <link rel="canonical" href="https://hvala.app/help" />
        <meta
          property="og:image"
          content="https://hvala.app/android-chrome-512x512.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pomoć - Često postavljana pitanja | Hvala"
        />
        <meta
          name="twitter:description"
          content="Pronađite odgovore na često postavljana pitanja o uslugama Hvala. Dobijte podršku koja vam je potrebna uz našu sveobuhvatnu sekciju FAQ."
        />
        <meta
          name="twitter:image"
          content="https://hvala.app/android-chrome-512x512.png"
        />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <main>
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
          <h1>{t("many_ask_questions")}</h1>

          <section className="mb-4">
            <h2 className="h4 mb-3" style={{ color: '#03989F', fontWeight: 600 }}>{t("guide_heading")}</h2>
            <Accordion defaultActiveKey="guide-0">
              {GUIDE_ITEMS.map((item, idx) => (
                <Accordion.Item key={idx} eventKey={`guide-${idx}`}>
                  <Accordion.Header>{t(item.title)}</Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-0" style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>{t(item.body)}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </section>

          <h2 className="h5 mt-4 mb-3" style={{ color: '#333', fontWeight: 600 }}>{t("many_ask_questions")}</h2>
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{t("send_advert_question")}</Accordion.Header>
              <Accordion.Body>{t("send_advert")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>{t("delete_advert_question")}</Accordion.Header>
              <Accordion.Body>{t("delete_advert")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                {t("change_password_question")}
              </Accordion.Header>
              <Accordion.Body>{t("forgot_pass")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>{t("change_email_question")}</Accordion.Header>
              <Accordion.Body>{t("change_language")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>{t("share_advert_question")}</Accordion.Header>
              <Accordion.Body>{t("share_advert")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>{t("send_seller_question")}</Accordion.Header>
              <Accordion.Body>{t("send_seller")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>{t("chat_helper_question")}</Accordion.Header>
              <Accordion.Body>{t("chat_helper")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header>{t("do_filter_question")}</Accordion.Header>
              <Accordion.Body>{t("do_filter")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header>{t("edit_data_question")}</Accordion.Header>
              <Accordion.Body>{t("edit_data")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="9">
              <Accordion.Header>{t("rating_seller_question")}</Accordion.Header>
              <Accordion.Body>{t("rating_seller")}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="10">
              <Accordion.Header>{t("security_data_question")}</Accordion.Header>
              <Accordion.Body>{t("security_data")}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </main>
    </>
  );
};

export default Help;
