"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import './projects.css';

const Project = ({ title, desc } : { title: string, desc: string }) => {
    const { t } = useTranslation();

    return (
        <div className="project-container">
            <p 
                className="project-title"
                dangerouslySetInnerHTML={{ __html: t(title) }}>
            </p>
            <p  
                className="project-description" 
                dangerouslySetInnerHTML={{ __html: t(desc) }}
            >
            </p>
        </div>
    )
}

export default Project