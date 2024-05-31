import React from 'react'
import { useTranslation } from 'react-i18next';
import Skill from './Skill';
import Typography from '@mui/material/Typography';
import './skills.css';

const SkillsSection = () => {
    const { t } = useTranslation()
    return (
        <article id="skills" className="contenedor-der__idiomas">
            <h2>{t('MENU.SKILLS')}</h2>
            <div className="contenedor-der__list-skills">
                <Skill imgSrc="espanol" label="Español" desc={t("SKILLS.SPANISH")} />
                <Skill imgSrc="ingles" label="English" desc={`${t("SKILLS.ENGLISH")} (B1)`} />
                <Skill imgSrc="react" label="React" desc="React" />
                <Skill imgSrc="angular" label="Angular" desc="Angular" />
                <Skill imgSrc="vue" label="Vue" desc="Vue" />
                <Skill imgSrc="next" label="NextJs" desc="NextJs" />
                <Skill imgSrc="node" label="NodeJs" desc="NodeJs" />
                <Skill imgSrc="github" label="Github" desc="Github" />
                <Skill imgSrc="docker" label="Docker" desc="Docker" />
                <Skill imgSrc="aws" label="AWS" desc="AWS" />
                <Skill imgSrc="sql" label="SQL" desc="SQL" />
                <Skill imgSrc="mongo" label="MongoDB" desc="MongoDB" />
                <Skill imgSrc="jenkins" label="Jenkins" desc="Jenkins" />
                <Skill imgSrc="azure" label="Azure DevOps" desc="Azure DevOps" />
                <Skill desc="API Rest" />
                <Skill desc="Unit Test" />
                <Skill imgSrc="cicd" label="CI/CD" desc="CI/CD" />
                <Skill desc="Scrum" />
                <Skill imgSrc="apollo" label="Apollo" desc="Apollo" />
                <Skill imgSrc="graphql" label="GraphQL" desc="GraphQL" />
                <Skill imgSrc="redux" label="RedUx" desc="Redux" />
                <Skill imgSrc="bootstrap" label="Bootstrap" desc="Bootstrap" />
                <Skill imgSrc="material" label="Material UI" desc="Material UI" />
                <Skill imgSrc="tailwind" label="Tailwind" desc="Tailwind" />
            </div>
        </article>
    )
}

export default SkillsSection