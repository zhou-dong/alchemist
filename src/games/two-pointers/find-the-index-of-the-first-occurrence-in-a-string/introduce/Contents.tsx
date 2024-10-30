import { Typography, Paper, Grid } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BuildIcon from '@mui/icons-material/Build';
import GridViewIcon from '@mui/icons-material/GridView';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { styled } from '@mui/system';

const CodeContainer = styled(Paper)({
    borderLeft: "4px solid grey",
    padding: "10px 12px",
});

const Examples = () => (
    <Grid container spacing={1}>
        <Grid item sm={12} md={6}>
            <CodeContainer variant="outlined">
                <Typography gutterBottom>
                    <strong>Input:</strong> <code>haystack = "hello"</code>, <code>needle = "ll"</code>
                </Typography>
                <Typography>
                    <strong>Output:</strong> <code>2</code>
                </Typography>
            </CodeContainer>
        </Grid>
        <Grid item sm={12} md={6}>
            <CodeContainer variant="outlined">
                <Typography gutterBottom>
                    <strong>Input:</strong> <code>haystack = "aaaaa"</code>, <code>needle = "bba"</code>
                </Typography>
                <Typography>
                    <strong>Output:</strong> <code>-1</code>
                </Typography>
            </CodeContainer>
        </Grid>
    </Grid>
);

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
                This algorithm searches for the first occurrence of a substring (needle) within a larger string (haystack) and returns its index. If the substring is not found, it returns -1.
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
