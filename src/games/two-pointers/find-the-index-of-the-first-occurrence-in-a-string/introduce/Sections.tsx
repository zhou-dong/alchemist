import {
    Typography,
    Box,
    IconButton,
    Stack,
    Avatar,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { green } from '@mui/material/colors';
import { styled } from '@mui/system';
import { Statement } from './Statements';

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

interface Props {
    statmentIndex: number;
    setStatementIndex: React.Dispatch<React.SetStateAction<number>>;
    statements: Statement[];
}

const AlgorithmExplorer = ({ statmentIndex, setStatementIndex, statements }: Props) => {


    const handlePreviousSection = () => {
        if (statmentIndex >= 0) {
            setStatementIndex(statmentIndex - 1);
        }
    };

    const handleNextSection = () => {
        if (statmentIndex < statements.length) {
            setStatementIndex(statmentIndex + 1);
        }
    };

    return (
        <Box>
            {statements.map((section, index) => {
                const isVisible = statmentIndex >= index;
                return (
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
                                {section.icon}
                            </Avatar>
                            <Box flexGrow={1}>
                                <Typography
                                    variant="h6"
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

            <Stack
                direction="row"
                spacing={3}
                textAlign="center"
                mt={4}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Navigator
                    onClick={handlePreviousSection}
                    disabled={statmentIndex < 0}
                >
                    <NavigateBeforeIcon fontSize='large' />
                </Navigator>
                <Navigator
                    onClick={handleNextSection}
                    disabled={statmentIndex === statements.length}
                >
                    {(statmentIndex === statements.length - 1) ? <RocketLaunchIcon /> : <NavigateNextIcon fontSize='large' />}
                </Navigator>
            </Stack>
        </Box>
    );
};

export default AlgorithmExplorer;
