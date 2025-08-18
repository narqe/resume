"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import './projects.css';

const Project = ({ project } : { project: string }) => {
    const { t } = useTranslation();

    return (
        <section className="project-item">
            <h1 className="project-title">{t(`${project}.TITLE`)}</h1>
            <div className="project-metadata">
                <span>{t(`${project}.PERIOD`)}</span>
                <span><strong>({t(`${project}.AREA`)})</strong></span>
            </div>
            <p className="project-description" dangerouslySetInnerHTML={{ __html: t(`${project}.DESC`) }} />
        </section>
    )
}

export default Project