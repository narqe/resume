import React from 'react'
import Typography from '@mui/material/Typography';

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
            {
                imgSrc && <img 
                    src={`img/skills/${imgSrc}.png`} 
                    alt={label} 
                    title={label} 
                    width="20"
                />
            }
            <Typography variant="h6">{ desc }</Typography>
        </div>
    )
}

export default Skill