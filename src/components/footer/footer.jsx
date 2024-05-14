import styles from "./footer.module.css"
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import googleLogoRu from '../../assets/ru_google.png';
import googleLogoSr from '../../assets/rs_google.png';
import googleLogoEn from '../../assets/en_google.png';
import appleLogoEn from "../../assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
import appleLogoRu from "../../assets/Download_on_the_App_Store_Badge_RU_RGB_blk_100317.svg"

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
              <li><a href="#">about us</a></li>
              <li><a href="#">our services</a></li>
              <li><a href="#">privacy policy</a></li>
              <li><a href="#">affiliate program</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Category</h4>
            <ul>
              <li><a href="#">Electronics</a></li>
              <li><a href="#">Estate</a></li>
              <li><a href="#">Clothes</a></li>
              <li><a href="#">Rest</a></li>

            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>follow us</h4>
            <div className={styles.socialLinks}>
              <a href="#"><FontAwesomeIcon icon={faFacebookF} size="2x" /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
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
    </footer>
  )
}