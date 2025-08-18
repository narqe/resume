import React from 'react'
import { useTranslation } from 'react-i18next';

const ContactData = () => {
    const { t, i18n } = useTranslation();

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang)
    } 
    return (
        <div className="contact-data">
            <p><span>{t('CONTACT_DATA.BIRTHDATE')}: </span>24/07/1992</p>
            <p><span>{t('CONTACT_DATA.BIRTHPLACE')}: </span>Córdoba, Argentina</p>
            <p>
                <span>E-mail:</span> 
                <a href="mailto:joelacef@gmail.com" target="_blank" title="joelacef@gmail.com">
                    joelacef@gmail.com
                </a>
            </p>
            <div className="social-links">
                <a href="https://www.linkedin.com/in/joelacef" title="Linkedin" target="_blank" className="linkedin"></a>
                <a href="https://github.com/narqe" title="Github" target="_blank" className="github"></a>
            </div>
            <div className="lang-container" onClick={() => changeLang(i18n.language === 'es' ? 'en' : 'es')}>
                <img 
                    src={i18n.language === 'es' ? "img/skills/ingles.png" : "img/skills/espanol.png"}
                    alt={i18n.language === 'es' ? 'Change to English' : 'Cambiar a Español'} 
                    title={i18n.language === 'es' ? 'Change to English' : 'Cambiar a Español'}
                    width="14"
                    height="14" 
                />
                {i18n.language === 'es' ? 'English' : 'Español'}
            </div>
        </div>
    )
}

export default ContactData