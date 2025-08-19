
import Typography from '@mui/material/Typography';
import SkillImage from './SkillImage';
import { SkillProp } from '@/models/Skill';

const Skill = ({ desc, label, imgSrc } : SkillProp) => {
    return (
        <div className="skill">
            {imgSrc ? <SkillImage imgSrc={imgSrc} label={label} /> : null}
            <Typography variant="h6">{ desc }</Typography>
        </div>
    )
}

export default Skill