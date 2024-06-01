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
    <main className="container">
      <section className="leftside-container">
        <MenuSection />
      </section>
      <section className="rightside-container">
        <AboutMe />
        <ProjectSection />
        <EducationSection />
        <SkillsSection />
      </section>
    </main>
  );
}
