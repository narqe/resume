import { useTranslation } from 'react-i18next';
import Project from './Project';

const ProjectSection = () => {
    const { t } = useTranslation();

    return (
        <article id="projects" className="contenedor-der__experiencia">
            <h2>{t('MENU.PROJECTS')}</h2>
            <div className="contenedor-der__list-experiencia">
                <Project title="PROJECTS.PROJECT_1.TITLE" desc="PROJECTS.PROJECT_1.DESC" />
                <Project title="PROJECTS.PROJECT_2.TITLE" desc="PROJECTS.PROJECT_2.DESC" />
                <Project title="PROJECTS.PROJECT_3.TITLE" desc="PROJECTS.PROJECT_3.DESC" />
                <Project title="PROJECTS.PROJECT_4.TITLE" desc="PROJECTS.PROJECT_4.DESC" />
                <Project title="PROJECTS.PROJECT_5.TITLE" desc="PROJECTS.PROJECT_5.DESC" />
            </div>
        </article>
    )
}

export default ProjectSection