import { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    IconButton,
    Paper,
    Stack,
    Divider,
    Avatar,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BuildIcon from '@mui/icons-material/Build';
import GridViewIcon from '@mui/icons-material/GridView';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { green } from '@mui/material/colors';

const sectionsData = [
    {
        icon: <DescriptionIcon />,
        title: 'Problem Statement',
        content: (
            <Typography>
                This algorithm searches for the first occurrence of a substring (needle) within a larger string (haystack) and returns its index. If the substring is not found, it returns -1.
            </Typography>
        ),
    },
    {
        icon: <FormatListBulletedIcon />,
        title: 'Examples',
        content: (
            <Stack direction="column" spacing={1}>
                <Paper
                    variant="outlined"
                    sx={{
                        borderLeft: "4px solid" + green[600],
                        padding: "10px 12px",
                        // backgroundColor: green[50],
                    }}
                >
                    <Typography gutterBottom>
                        <strong>Input:</strong> <code>haystack = "hello"</code>, <code>needle = "ll"</code>
                    </Typography>
                    <Typography>
                        <strong>Output:</strong> <code>2</code>
                    </Typography>
                </Paper>
                <Paper
                    variant="outlined"
                    sx={{
                        borderLeft: "4px solid" + green[600],
                        padding: "10px 12px",
                        // backgroundColor: green[50],
                    }}
                >
                    <Typography gutterBottom>
                        <strong>Input:</strong> <code>haystack = "aaaaa"</code>, <code>needle = "bba"</code>
                    </Typography>
                    <Typography>
                        <strong>Output:</strong> <code>-1</code>
                    </Typography>
                </Paper>
            </Stack>
        ),
    },
    {
        icon: <BuildIcon />,
        title: 'How It Works',
        content: (
            <Typography>
                The algorithm checks for the substring <code>needle</code> starting from the beginning of <code>haystack</code> and compares it character by character. When it finds a match, it returns the starting index of the match. If no match is found by the end of the string, it returns -1.
            </Typography>
        ),
    },
    {
        icon: <QueryStatsIcon />,
        title: 'Time Complexity',
        content: (
            <Typography>
                The worst-case time complexity of this algorithm is O(n * m), where n is the length of <code>haystack</code> and m is the length of <code>needle</code>.
            </Typography>
        ),
    },
    {
        icon: <GridViewIcon />,
        title: 'Visualization',
        content: (
            <Typography>
                To make the algorithm more intuitive, we will visualize it using a 2-dimensional array (table). The rows represent the characters in the <code>haystack</code>, while the columns represent the characters in the <code>needle</code>.
                Let’s code and rock! 🎸
            </Typography>
        ),
    },
];

const AlgorithmExplorer = () => {
    const [currentSection, setCurrentSection] = useState(-1);

    const handlePreviousSection = () => {
        if (currentSection >= 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    const handleNextSection = () => {
        if (currentSection < sectionsData.length) {
            setCurrentSection(currentSection + 1);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>

            {sectionsData.map((section, index) => {
                const isVisible = currentSection >= index;
                return (
                    <Box
                        key={index}
                        style={{
                            transition: 'transform 1s ease, opacity 1s ease-in',
                            transform: isVisible ? 'translateX(0)' : 'translateX(-100px)', // Adjust Y distance
                            opacity: isVisible ? 1 : 0,
                            margin: '16px 0', // Spacing between sections
                        }}
                    >
                        <Box display="flex" alignItems="center" my={2} >

                            {/* <Divider
                                orientation="vertical"
                                flexItem
                                style={{
                                    margin: '0 8px',
                                    borderRightWidth: "2px",
                                }}
                                variant='middle'
                            /> */}

                            <Avatar
                                sx={{
                                    backgroundColor: green[600],
                                    marginRight: 2,
                                    color: "#fff",
                                    border: "1px solid gery",
                                }}>
                                {section.icon}
                            </Avatar>

                            <Box flexGrow={1}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 350 }}
                                    gutterBottom
                                >
                                    {section.title}
                                </Typography>
                                {section.content}
                            </Box>
                        </Box>
                    </Box>
                );
            })}

            <Box textAlign="center" mt={2}>
                <IconButton
                    sx={{
                        border: "2px solid lightgrey",
                        width: 65,
                        height: 65
                    }}
                    color="primary"
                    onClick={handlePreviousSection}
                    disabled={currentSection < 0}
                    style={{ marginRight: '10px' }}
                >
                    <NavigateBeforeIcon fontSize='large' />
                </IconButton>
                <IconButton
                    sx={{
                        border: "2px solid lightgrey",
                        width: 65,
                        height: 65
                    }}
                    color="primary"
                    onClick={handleNextSection}
                    disabled={currentSection === sectionsData.length}
                >
                    {(currentSection === sectionsData.length - 1) ? <RocketLaunchIcon /> : <NavigateNextIcon fontSize='large' />}

                </IconButton>
            </Box>
        </Container>
    );
};

export default AlgorithmExplorer;
