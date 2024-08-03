import React from 'react';
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { green } from '@mui/material/colors';
import ExploreIcon from '@mui/icons-material/Explore'; // Example icon for "Mission"
import VisibilityIcon from '@mui/icons-material/Visibility'; // Example icon for "Visualizations"
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Example icon for "Action"
import AssignmentIcon from '@mui/icons-material/Assignment'; // Example icon for "Responsibility"
import TouchAppIcon from '@mui/icons-material/TouchApp'; // Example icon for "Intuitive"

const statement = "At See the Logic, our mission is to make learning algorithms intuitive and engaging through innovative visualizations. We believe that understanding complex algorithms is best achieved by seeing them in action, not just through text and code. Our platform is dedicated to transforming abstract concepts into clear, visual insights, providing a better and more interactive way to master algorithms and enhance your problem-solving skills."

const missionData = [
    {
        title: 'Mission',
        icon: <ExploreIcon fontSize='large'/>,
        text: 'At See the Logic, our mission is to make learning algorithms intuitive and engaging through innovative visualizations.'
    },
    {
        title: 'Visualizations',
        icon: <VisibilityIcon />,
        text: 'By using creative visualizations, we turn complex algorithms into clear and interactive insights.'
    },
    {
        title: 'Action',
        icon: <PlayArrowIcon />,
        text: 'Seeing algorithms in action, rather than just reading about them, leads to a deeper understanding.'
    },
    {
        title: 'Responsibility',
        icon: <AssignmentIcon />,
        text: 'Our goal is to provide a more effective and engaging way to learn algorithms and improve problem-solving skills.'
    },
    {
        title: 'Intuitive',
        icon: <TouchAppIcon />,
        text: 'We focus on an intuitive learning experience, making abstract concepts easier to understand through visual aids.'
    }
];

const MissionStatement = () => {
    return (
        <Box
            sx={{
                padding: '40px',
                backgroundColor: '#f9f9f9', // Very light gray background
                borderRadius: '12px', // Rounded corners
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                margin: '0 auto', // Center horizontally
                width: '100%', // Full width
                boxSizing: 'border-box', // Include padding and border in element's total width and height
            }}
        >
            <Grid container spacing={4}>
                {missionData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column', // Stack title and icon vertically
                                    alignItems: 'center',
                                    padding: '16px',
                                    backgroundColor: green[300], // Light green background for icon area
                                    borderRight: '1px solid #ccc', // Divider line between icon and text
                                    flex: '0 0 150px', // Fixed minimum width for icon section
                                    maxWidth: '200px', // Maximum width to accommodate longer titles
                                    textAlign: 'center', // Center text horizontally
                                    overflow: 'hidden', // Hide overflowed content
                                    color: "#fff",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'text.primary',
                                        // fontWeight: 'bold',
                                        marginBottom: '8px', // Space between title and icon
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'normal', // Allow wrapping
                                        width: '100%' // Ensures the title can wrap within the box
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                {item.icon}
                            </Box>
                            <CardContent sx={{ flex: '1 0 auto', padding: '16px' }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: '1.6'
                                    }}
                                >
                                    {item.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MissionStatement;
