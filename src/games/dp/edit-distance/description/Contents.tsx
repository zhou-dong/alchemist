import { Typography, Paper, Avatar, Stack } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Box, styled } from '@mui/system';
import { green } from '@mui/material/colors';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';

const CodeContainer = styled(Paper)({
    borderLeft: "4px solid grey",
    padding: "10px 12px",
});

const Examples = () => (
    <CodeContainer variant="outlined">
        <Typography gutterBottom>
            The distance between kitten and sitting is 3. A minimal edit script that transforms the former into the latter is:
        </Typography>
        <ol>
            <li>
                <Typography gutterBottom>
                    kitten → sitten (substitution of 's' for 'k')
                </Typography>
            </li>
            <li>
                <Typography gutterBottom>
                    sitten → sittin (substitution of 'i' for 'e')
                </Typography>
            </li>
            <li>
                <Typography>
                    sittin → sitting (insertion of 'g' at the end)
                </Typography>
            </li>
        </ol>
    </CodeContainer>
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
            <>
                <Typography>
                    Edit Distance (or Levenshtein Distance) measures the minimum number of operations required to transform one string into another. The allowed operations are:
                </Typography>
                <ul>
                    <li>
                        <Typography>Insertion of a character</Typography>
                    </li>
                    <li>
                        <Typography>Deletion of a character</Typography>
                    </li>
                    <li>
                        <Typography>Substitution of one character for another</Typography>
                    </li>
                </ul>
            </>
        ),
    },
    {
        icon: <WbIncandescentIcon />,
        title: 'Usage',
        content: (
            <Typography>
                This algorithm is often used in applications such as spell checking, DNA sequence comparison, and natural language processing, where determining the similarity between two sequences is important.
            </Typography>
        ),
    },
    {
        icon: <FormatListBulletedIcon />,
        title: 'Example',
        content: (
            <Examples />
        ),
    },
    {
        icon: <VideoCameraBackIcon />,
        title: 'Algorithm Approach',
        content: (
            <Stack direction="column" spacing={1}>
                <Typography>
                    To make the algorithm more intuitive, we will visualize it using a 2-dimensional array (table).
                </Typography>
                <Typography>
                    We will build a matrix where each cell represents the minimum number of operations needed to convert a substring of one string into a substring of another. The idea is to break the problem down into smaller subproblems and solve them efficiently.
                </Typography>
            </Stack>
        ),
    },
    {
        icon: <QueryStatsIcon />,
        title: 'Time and Space Complexity',
        content: (
            <Stack direction="column" spacing={1}>
                <Typography>
                    The time complexity is O(m * n), where m and n are the lengths of the two input strings. This is because we are filling an (m + 1) x (n + 1) matrix.
                </Typography>
                <Typography>
                    The space complexity is also O(m * n). Optimizations can reduce the space complexity to O(min(m, n)) using space-efficient techniques.
                </Typography>
            </Stack>
        ),
    },
];

const DisplayContent: React.FC<{
    index: number,
    isVisible: boolean,
    statement: Content
}> = ({
    index,
    isVisible,
    statement
}) => (
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
                my={1}
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
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        {statement.title}
                    </Typography>
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
