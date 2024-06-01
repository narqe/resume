import React from 'react'
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    
    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang)
    } 
    return (
        <nav>
            <ul>
                <li><a href="#about-me" title={t('MENU.ABOUT_ME')}>{t('MENU.ABOUT_ME')}</a></li>
                <li><a href="#projects" title={t('MENU.PROJECTS')}>{t('MENU.PROJECTS')}</a></li>
                <li><a href="#education" title={t('MENU.EDUCATION')}>{t('MENU.EDUCATION')}</a></li>
                <li><a href="#skills" title={t('MENU.SKILLS')}>{t('MENU.SKILLS')}</a></li>
            </ul>
        </nav>
    )
}

export default Navbar