import React from 'react'
import Course from './Course';
import { useTranslation } from 'react-i18next';
import Timeline from '@mui/lab/Timeline';

const EducationSection = () => {
    const { t } = useTranslation();

    return (
        <article id="education">
            <h2>{t('MENU.EDUCATION')}</h2>
            <Timeline position="alternate">
                <Course year="2024" degree={t('EDUCATION.COURSE_5')} status={t('EDUCATION.COMPLETED')} />
                <Course year="2019 ~ 2020" degree={t('EDUCATION.COURSE_4')} status={t('EDUCATION.COMPLETED')} />
                <Course year="2012 ~ 2018" degree={t('EDUCATION.COURSE_3')} status={t('EDUCATION.NOT_COMPLETED')}/>
                <Course year="2010 ~ 2012" degree={t('EDUCATION.COURSE_2')} status={t('EDUCATION.COMPLETED')} />
                <Course year="2004 ~ 2009" degree={t('EDUCATION.COURSE_1')} status={t('EDUCATION.COMPLETED')} />
            </Timeline>
        </article>
    )
}

export default EducationSection