import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../utils/changeLanguage';

const ContactData = () => {
    const { t, i18n } = useTranslation();
    const isSpanish = i18n.language === 'es';
    const langImg = isSpanish ? "img/skills/ingles.png" : "img/skills/espanol.png";
    const langAlt = isSpanish ? "Change to English" : "Cambiar a Español";
    const langTitle = isSpanish ? "Change to English" : "Cambiar a Español";

    return (
        <div className="contact-data">
                <p className="contact-data__p">Córdoba, Argentina</p>
                <p className="contact-data__p">
                    <a className="contact-data__a" href="mailto:joelacef@gmail.com" target="_blank" title="joelacef@gmail.com">
                        joelacef@gmail.com
                    </a>
                </p>
            <p>24/07/1992</p>
            <div className="social-links">
                <a href="https://www.linkedin.com/in/joelacef" title="Linkedin" target="_blank" className="linkedin"></a>
                <a href="https://github.com/narqe" title="Github" target="_blank" className="github"></a>
            </div>
            <div className="lang-container" onClick={() => changeLanguage(i18n)}>
                <img 
                    src={langImg}
                    alt={langAlt}
                    title={langTitle}
                    width="14"
                    height="14" 
                />
                {isSpanish ? 'English' : 'Español'}
            </div>
        </div>
    )
}

export default ContactData