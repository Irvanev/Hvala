import styles from "./footer.module.css"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import googleLogoRu from '../../assets/ru_google.png';
import googleLogoSr from '../../assets/rs_google.png';
import googleLogoEn from '../../assets/en_google.png';
import appleLogoEn from "../../assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
import appleLogoRu from "../../assets/Download_on_the_App_Store_Badge_RU_RGB_blk_100317.svg"
import { t } from 'i18next';

export const CustomFooter = () => {
  const { i18n } = useTranslation();

  let appleLogo;
  let googleLogo;

  switch (i18n.language) {
    case 'en':
      appleLogo = appleLogoEn;
      googleLogo = googleLogoEn;
      break;
    case 'ru':
      appleLogo = appleLogoRu;
      googleLogo = googleLogoRu;
      break;
    case 'me':
      appleLogo = appleLogoEn;
      googleLogo = googleLogoSr;
      break;
    default:
      appleLogo = appleLogoEn;
      googleLogo = googleLogoEn;
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.footerCol}>
            <h4>Hvala</h4>
            <ul>
              <li>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <a href="#">about us</a>
                </Link>
              </li>
              <li>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <a href="#">our services</a>
                </Link>
              </li>
              <li>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <a href="#">privacy policy</a>
                </Link>
              </li>
              <li>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <a href="#">affiliate program</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>{t('category')}</h4>
            <ul>
              <li>
                <Link to="/advertisments/electronics" style={{ textDecoration: 'none' }}>
                  <a href="/advertisments/electronics">{t('electronics')}</a>
                </Link>
              </li>
              <li>
                <Link to="/advertisments/estate" style={{ textDecoration: 'none' }}>
                  <a href="/advertisments/estate">{t('estate')}</a>
                </Link>
              </li>
              <li>
                <Link to="/advertisments/clothes" style={{ textDecoration: 'none' }}>
                  <a href="/advertisments/clothes">{t('clothes')}</a>
                </Link>
              </li>
              <li>
                <Link to="/advertisments/rest" style={{ textDecoration: 'none' }}>
                  <a href="/advertisments/rest">{t('rest')}</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>follow us</h4>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/hvala.app?igsh=ZmJiOWtrbDY1enNm"><FontAwesomeIcon icon={faFacebookF} size="2x" /></a>
              <a href="https://www.facebook.com/profile.php?id=61553691035329&mibextid=ZbWKwL"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
            </div>
          </div>
          <div className={styles.downloadApps}>
            <a href="https://play.google.com/store/apps/details?id=app.hvala.release" target="_blank" rel="noopener noreferrer">
              <img src={googleLogo} alt="Download on the App Store" style={{ width: '150px', height: '49px', marginRight: '20px' }} />
            </a>
            <a href="https://apps.apple.com/ru/app/hvala/id6475787279" target="_blank" rel="noopener noreferrer">
              <img src={appleLogo} alt="Get it on Google Play" style={{ width: '150px', height: 'auto' }} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-info mt-3">
        <div className="footer-info-section left">
          <a href="/privacy_policy">{t('privacy_policy')}</a>
        </div>
        <div className="footer-info-section right">
          <p>2024 ©Hvala</p>
        </div>
      </div>
      <style jsx>{`
                .footer-info {
                    background-color: #f8f8f8;
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                }

                .footer-info-section {
                    width: 45%;
                }

                .footer-info-section.left {
                    text-align: left;
                }

                .footer-info-section.right {
                    text-align: right;
                }

                .footer-info-section h4 {
                    margin-bottom: 10px;
                }

                .footer-info-section p {
                    margin: 0;
                }
            `}</style>
    </footer>
  )
}