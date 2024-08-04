import { Container, Accordion } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { MyNavbar } from "../components/Navbar/Navbar";

const Help = () => {
    const { t } = useTranslation();
    return ( 
        <>
        <Helmet>
            <title>Help - Frequently Asked Questions | Hvala</title>
            <meta
              name="description"
              content="Find answers to frequently asked questions about Hvala's services. Get the support you need with our comprehensive FAQ section."
            />
            <meta
              name="keywords"
              content="FAQ, help, support, questions, answers, Hvala"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
              property="og:title"
              content="Help - Frequently Asked Questions | Hvala"
            />
            <meta
              property="og:description"
              content="Find answers to frequently asked questions about Hvala's services. Get the support you need with our comprehensive FAQ section."
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content="https://www.yourcompanywebsite.com/help"
            />
            <meta
              property="og:image"
              content="https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/faq.jpg?alt=media&token=example-token"
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:title"
              content="Help - Frequently Asked Questions | Hvala"
            />
            <meta
              name="twitter:description"
              content="Find answers to frequently asked questions about Hvala's services. Get the support you need with our comprehensive FAQ section."
            />
            <meta
              name="twitter:image"
              content="https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/faq.jpg?alt=media&token=example-token"
            />
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
                    <h1>Часто задаваемые вопросы</h1>
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
                            <Accordion.Header>{t("change_password_question")}</Accordion.Header>
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
}

export default Help;