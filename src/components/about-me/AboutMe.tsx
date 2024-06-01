"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import './about-me.css';

const AboutMe = () => {
    const { t } = useTranslation();

    return (
        <article id="about-me">
            <h2>{t('MENU.ABOUT_ME')}</h2>
            <div className="about-me">
                <p dangerouslySetInnerHTML={{ __html: t('ABOUT_ME.PRESENTATION')}}></p><br />
                <a href="https://www.linkedin.com/in/joelacef" title="Linkedin" target="_blank" className="linkedin"></a>
                <a href="https://github.com/narqe" title="Github" target="_blank" className="github"></a>
                <a href="https://www.behance.net/joelacef" title="Behance" target="_blank" className="behance"></a>
            </div>
        </article>
    )
}

export default AboutMe