import React from 'react'
import ContactData from './ContactData';
import Navbar from './Navbar';
import './menu.css';
import { useTranslation } from 'react-i18next';

const MenuSection = () => {
    const { i18n } = useTranslation();

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang)
    } 

    return (
        <header className="menu-container" id="menu">
            <figure className="profile-img">
                <img src="img/foto.jpg" alt="Joel Acef" title="Joel Acef" width="200" />
            </figure>
            <h1 className="name-title">Joel Acef</h1>
            <h2 className="subtitle">SR Front-End Developer</h2>
            <div className="mobile-menu">
                <a href="#menu" title="Menu" className="menu"></a>
                <div
                    onClick={() => changeLang(i18n.language === 'es' ? 'en' : 'es')} 
                    className={i18n.language === 'es' ? 'en' : 'es'}
                >
                </div>
            </div>  
            <Navbar />
            <ContactData />
        </header>
    )
}

export default MenuSection