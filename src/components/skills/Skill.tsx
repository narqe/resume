
import React from 'react';
import Typography from '@mui/material/Typography';
import SkillImage from './SkillImage';

const Skill = ({ 
    desc,
    label,
    imgSrc, 
} : { 
    desc: string,
    label?: string,
    imgSrc?: string, 
}) => {
    return (
        <div className="skill">
            {imgSrc ? <SkillImage imgSrc={imgSrc} label={label} /> : null}
            <Typography variant="h6">{ desc }</Typography>
        </div>
    )
}

export default Skill