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
        <header className="contenedor-izq__menu" id="menu">
            <figure className="foto-cv">
                <img src="img/foto.jpg" alt="Joel Acef" title="Joel Acef" width="200" />
            </figure>
            <h1 className="nombre">Joel <span>Acef</span></h1>
            <div className="close-menu">
                <a href="#menu" title="Menu" className="menu"></a>
                <div
                    onClick={() => changeLang(i18n.language === 'es' ? 'en' : 'es')} 
                    className={i18n.language === 'es' ? 'en' : 'es'}
                >
                </div>
            </div>  
            <Navbar /><hr />
            <ContactData />
        </header>
    )
}

export default MenuSection