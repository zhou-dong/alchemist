import { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    IconButton,
    Paper,
    Stack,
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
import { styled } from '@mui/system';

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
                        borderLeft: "4px solid grey",
                        padding: "10px 12px",
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
                        borderLeft: "4px solid grey",
                        padding: "10px 12px",
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

const Navigator = styled(IconButton)({
    width: 60,
    height: 60,
    backgroundColor: green[500],
    color: "#fff",
    '&:hover': {
        backgroundColor: green[600],
    },
    '&.Mui-disabled': {
        backgroundColor: 'lightgray',
        color: 'gray',
    },
});

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
                            transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
                            opacity: isVisible ? 1 : 0,
                            margin: '16px 0',
                        }}
                    >
                        <Box display="flex" alignItems="center" my={2}>
                            <Avatar
                                sx={{
                                    backgroundColor: "#fff",
                                    marginRight: 2,
                                    color: green[600],
                                    border: "2px solid " + green[600],
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

            <Stack direction="row" spacing={3} textAlign="center" mt={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Navigator
                    onClick={handlePreviousSection}
                    disabled={currentSection < 0}
                >
                    <NavigateBeforeIcon fontSize='large' />
                </Navigator>
                <Navigator
                    onClick={handleNextSection}
                    disabled={currentSection === sectionsData.length}
                >
                    {(currentSection === sectionsData.length - 1) ? <RocketLaunchIcon /> : <NavigateNextIcon fontSize='large' />}
                </Navigator>
            </Stack>
        </Container>
    );
};

export default AlgorithmExplorer;
