import { PROJECT_SKILLS, OTHER_SKILLS } from '@/constants/SKILLS';
import { SkillProp } from '@/models/Skill';

export function getProjectSkills(project: string): string[] {
    return PROJECT_SKILLS[project] || [];
}

export function getOtherSkills(): SkillProp[] {
    return OTHER_SKILLS;
}
