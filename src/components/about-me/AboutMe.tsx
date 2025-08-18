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
                <p dangerouslySetInnerHTML={{ __html: t('ABOUT_ME.PRESENTATION')}}></p>
            </div>
        </article>
    )
}

export default AboutMe