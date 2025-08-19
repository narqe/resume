import { useTranslation } from 'react-i18next';
import Skill from './Skill';
import Typography from '@mui/material/Typography';
import { getOtherSkills } from '@/services/skillsService';
import './skills.css';

const SkillsSection = () => {
    const { t } = useTranslation();
    const skills = getOtherSkills();

    return (
        <article id="skills">
            <h2>{t('MENU.SKILLS')}</h2>
            <div className="skills-container">
                {skills.map((skill, idx) => (
                    <Skill
                        key={idx}
                        imgSrc={skill?.imgSrc}
                        label={skill?.label}
                        desc={t(skill.desc)}
                    />
                ))}
            </div>
        </article>
    );
}

export default SkillsSection