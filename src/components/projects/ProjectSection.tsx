import { useTranslation } from 'react-i18next';
import Project from './Project';

const ProjectSection = () => {
    const { t } = useTranslation();

    return (
        <main id="projects">
            <h2>{t('MENU.PROJECTS')}</h2>
            <article className="projects-container">
                <Project project="PROJECT_6" />
                <Project project="PROJECT_1" />
                <Project project="PROJECT_2" />
                <Project project="PROJECT_3" />
                <Project project="PROJECT_4" />
                <Project project="PROJECT_5" />
            </article>
        </main>
    )
}

export default ProjectSection