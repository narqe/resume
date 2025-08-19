import { useTranslation } from 'react-i18next';
import Skill from '../skills/Skill';
import SkillImage from '../skills/SkillImage';
import './projects.css';
import { getProjectSkills } from '@/services/skillsService';

const Project = ({ project } : { project: string }) => {
    const { t } = useTranslation();
    const skills = getProjectSkills(project);

    return (
        <section className="project-item">
            <h1 className="project-title">{t(`PROJECTS.${project}.TITLE`)}</h1>
            <div className="project-metadata">
                <span>{t(`PROJECTS.${project}.PERIOD`)}</span>
                <span><strong>({t(`PROJECTS.${project}.AREA`)})</strong></span>
            </div>
            <p className="project-description" dangerouslySetInnerHTML={{ __html: t(`PROJECTS.${project}.DESC`) }} />
            {skills && (
                <div className="project-skill-container">
                    <h3>{t('PROJECTS.SKILLS')}</h3>
                    <div className="project-skills">
                        {skills.map(skill => (
                            <SkillImage key={`${skill}__${project}`} imgSrc={skill} label={skill} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default Project