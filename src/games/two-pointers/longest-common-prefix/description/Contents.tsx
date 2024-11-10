import React from 'react';
import { Typography, Paper, Grid, Avatar, Stack } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Box, styled } from '@mui/system';
import { green } from '@mui/material/colors';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import TitleIcon from '@mui/icons-material/Title';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';

const CodeContainer = styled(Paper)({
    borderLeft: "4px solid grey",
    padding: "10px 12px",
});

const Examples = () => (
    <Grid container spacing={1}>
        <Grid item sm={12} md={6}>
            <CodeContainer variant="outlined">
                <Typography gutterBottom>
                    <strong>Input:</strong> <code>strs = ["dog", "dove", "domino"]</code>
                </Typography>
                <Typography>
                    <strong>Output:</strong> <code>"do"</code>
                </Typography>
            </CodeContainer>
        </Grid>
        <Grid item sm={12} md={6}>
            <CodeContainer variant="outlined">
                <Typography gutterBottom>
                    <strong>Input:</strong> <code>strs = ["apple", "banana", "cherry"]</code>
                </Typography>
                <Typography>
                    <strong>Output:</strong> <code>""</code>
                </Typography>
            </CodeContainer>
        </Grid>
    </Grid>
);

const SolutionItem = styled(Stack)({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
});

export interface Content {
    icon: JSX.Element;
    title: string;
    content: JSX.Element;
}

export const contents: Content[] = [
    {
        icon: <DescriptionIcon />,
        title: 'Problem Statement',
        content: (
            <Typography>
                Given a list of strings, the goal is to determine the longest string that is a prefix of all strings in the list.
            </Typography>
        ),
    },
    {
        icon: <FormatListBulletedIcon />,
        title: 'Examples',
        content: (
            <Examples />
        ),
    },
    {
        icon: <LooksOneOutlinedIcon />,
        title: '',
        content: (
            <>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <TitleIcon />
                    <Typography mt={1}>
                        Solution: Horizontal Scanning
                    </Typography>
                </SolutionItem>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <TipsAndUpdatesOutlinedIcon />
                    <Typography mt={1}>
                        In this approach, we start with the first string as the initial common prefix, and iteratively compare it with each subsequent string to update the common prefix. If at any point the common prefix becomes empty, we stop.
                    </Typography>
                </SolutionItem>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <QueryStatsIcon />
                    <Typography>
                        Time Complexity: <code>O(m * n)</code>, where m is the length of the longest string, and n is the number of strings in the array.
                    </Typography>
                </SolutionItem>
            </>
        ),
    },
    {
        icon: <LooksTwoOutlinedIcon />,
        title: '',
        content: (
            <>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <TitleIcon />
                    <Typography mt={1}>
                        Solution: Vertical Scanning
                    </Typography>
                </SolutionItem>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <TipsAndUpdatesOutlinedIcon />
                    <Typography mt={1}>
                        This approach compares each character in the strings, column by column, across all strings. We stop when characters at a given position in any string don't match.
                    </Typography>
                </SolutionItem>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <QueryStatsIcon />
                    <Typography>
                        Time Complexity: <code>O(m * n)</code>, where m is the number of strings and n is the length of the shortest string.
                    </Typography>
                </SolutionItem>
            </>
        ),
    },
    {
        icon: <Looks3OutlinedIcon />,
        title: '',
        content: (
            <>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <TitleIcon />
                    <Typography mt={1}>
                        Solution: Divide and Conquer
                    </Typography>
                </SolutionItem>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <TipsAndUpdatesOutlinedIcon />
                    <Typography mt={1}>
                        This approach divides the array into two halves, finds the longest common prefix of each half recursively, and then combines the results.
                    </Typography>
                </SolutionItem>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <QueryStatsIcon />
                    <Typography>
                        Time Complexity: <code>O(m * log n)</code>, where m is the length of the longest string, and n is the number of strings.
                    </Typography>
                </SolutionItem>
            </>
        ),
    },
    {
        icon: <Looks4OutlinedIcon />,
        title: '',
        content: (
            <>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <TitleIcon />
                    <Typography mt={1}>
                        Solution: Binary Search
                    </Typography>
                </SolutionItem>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <TipsAndUpdatesOutlinedIcon />
                    <Typography mt={1}>
                        In this approach, we use binary search on the length of the prefix. For each length, we check if all strings in the list have that prefix.
                    </Typography>
                </SolutionItem>
                <SolutionItem mt={1} direction="row" spacing={1} >
                    <QueryStatsIcon />
                    <Typography>
                        Time Complexity: <code>O(m * log n)</code>, where m is the length of the longest string, and n is the number of strings.
                    </Typography>
                </SolutionItem>
            </>
        ),
    },
];

const DisplayContent: React.FC<{
    index: number,
    isVisible: boolean,
    statement: Content
}> = ({ index, isVisible, statement }) => (
    <Box
        key={index}
        sx={{
            transition: 'transform 1s ease, opacity 1s ease-in',
            transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
            opacity: isVisible ? 1 : 0,
            padding: "2px 6px",
            borderRadius: "4px",
        }}
    >
        <Box
            display="flex"
            alignItems="center"
            my={2}
        >
            <Avatar
                sx={{
                    backgroundColor: index % 2 === 0 ? green[400] : "#fff",
                    marginRight: 2,
                    color: index % 2 === 0 ? "#fff" : green[600],
                    border: "1px solid " + green[400],
                }}>
                {statement.icon}
            </Avatar>
            <Box flexGrow={1}>
                {statement.title &&
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        {statement.title}
                    </Typography>
                }
                {statement.content}
            </Box>
        </Box>
    </Box>
);

interface Props {
    contentIndex: number;
    contents: Content[];
}

export const DisplayContents = ({ contentIndex, contents }: Props) => (
    <Box>
        {contents.map((content, index) => (
            <DisplayContent
                key={index}
                index={index}
                isVisible={contentIndex >= index}
                statement={content}
            />
        ))}
    </Box>
);
