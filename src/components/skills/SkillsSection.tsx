import React from 'react'
import { useTranslation } from 'react-i18next';
import Skill from './Skill';
import Typography from '@mui/material/Typography';
import './skills.css';

const SkillsSection = () => {
    const { t } = useTranslation()
    return (
        <article id="skills">
            <h2>{t('MENU.SKILLS')}</h2>
            <div className="skills-container">
                <Skill imgSrc="espanol" label="Español" desc={t("SKILLS.SPANISH")} />
                <Skill imgSrc="ingles" label="English" desc={`${t("SKILLS.ENGLISH")} (B2)`} />
                <Skill imgSrc="github" label="Github" desc="Github" />
                <Skill imgSrc="docker" label="Docker" desc="Docker" />
                <Skill imgSrc="aws" label="AWS" desc="AWS" />
                <Skill imgSrc="mongo" label="MongoDB" desc="MongoDB" />
                <Skill imgSrc="azure" label="Azure DevOps" desc="Azure DevOps" />
                <Skill imgSrc="apollo" label="Apollo" desc="Apollo" />
                <Skill imgSrc="graphql" label="GraphQL" desc="GraphQL" />
                <Skill imgSrc="cleanarchitecture" label="Clean Architecture" desc="Clean Architecture" />
                <Skill desc="API Restful" />
                <Skill desc="Scrum" />
                <Skill desc="Microservices" />
            </div>
        </article>
    )
}

export default SkillsSection