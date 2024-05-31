"use client"

import { useTranslation } from 'react-i18next';
import AboutMe from '../components/about-me/AboutMe';
import Project from '../components/projects/Project';
import ProjectSection from '../components/projects/ProjectSection';
import MenuSection from '../components/menu/MenuSection';
import EducationSection from '../components/education/EducationSection';
import SkillsSection from '../components/skills/SkillsSection';

export default function Home() {
  const { t, i18n } = useTranslation();

  return (
    <main className="contenedor">
      <section className="contenedor-izq">
        <MenuSection />
      </section>
      <section className="contenedor-der">
        <AboutMe />
        <ProjectSection />
        <EducationSection />
        <SkillsSection />
      </section>
    </main>
  );
}
