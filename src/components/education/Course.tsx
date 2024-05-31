import React from 'react'
import Typography from '@mui/material/Typography';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import SchoolIcon from '@mui/icons-material/School';

const Course = ({ 
    year, 
    degree, 
    status 
} : { 
    year: string, 
    degree: string, 
    status: string 
}) => {
    return (
        <TimelineItem>
            <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="right"
                variant="h5"
                color="text.secondary"
            >
                { year }
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                <TimelineDot sx={{ bgcolor: '#e9af8b'}}>   
                    <SchoolIcon />
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            </TimelineSeparator>
            <TimelineContent>
                <Typography variant="overline" sx={{ fontWeight: 'bold' }}>
                    { degree }
                </Typography>
                <Typography 
                    sx={{ 
                        fontWeight: 'normal', 
                        color: '#fff' 
                    }} 
                    component="p" 
                > 
                    ({ status })
                </Typography>
            </TimelineContent>
        </TimelineItem>
    )
}

export default Course