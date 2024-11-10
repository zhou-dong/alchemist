import React from 'react';
import Title from "./Title";
import { Container, Divider, IconButton, Stack, styled } from "@mui/material";
import { contents, DisplayContents } from './Contents';
import InputIcon from '@mui/icons-material/Input';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useAlgoContext } from '../AlgoContext';
import { State } from '../AlgoState';
import Toolbox from '../toolbox';

const Navigator = styled(IconButton)(({ theme }) => ({
    width: 60,
    height: 60,
    border: "1px solid lightgray",
    color: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: "#fff",
    },
    '&.Mui-disabled': {
        backgroundColor: 'lightgray',
        color: 'gray',
    },
}));

const Main = () => {

    const { setState } = useAlgoContext();

    const [statmentIndex, setStatementIndex] = React.useState(-1);

    React.useEffect(() => {
        setStatementIndex(0);
    }, []);

    const handleFirstPageClick = () => {
        setStatementIndex(-1);
    }

    const handlePreviousSection = () => {
        if (statmentIndex >= 0) {
            setStatementIndex(statmentIndex - 1);
        }
    };

    const handleNextSection = () => {
        if (statmentIndex < contents.length) {
            setStatementIndex(statmentIndex + 1);
        }
    };

    const handleLastPageClick = () => {
        setStatementIndex(contents.length - 1);
    };

    const handleInputClick = () => {
        setState(State.Input);
    };

    return (
        <>
            <Toolbox current={State.Description} />
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                <Title displayStar={statmentIndex >= 0} />

                <Divider variant="middle" />
                <DisplayContents contentIndex={statmentIndex} contents={contents} />

                <Stack
                    direction="row"
                    spacing={3}
                    textAlign="center"
                    mt={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Navigator
                        onClick={() => setState(State.Welcome)}
                    >
                        <DescriptionOutlinedIcon fontSize='medium' />
                    </Navigator>

                    <Navigator
                        onClick={handleFirstPageClick}
                        disabled={statmentIndex < 0}
                    >
                        <FirstPageIcon fontSize='large' />
                    </Navigator>
                    <Navigator
                        onClick={handlePreviousSection}
                        disabled={statmentIndex < 0}
                    >
                        <NavigateBeforeIcon fontSize='large' />
                    </Navigator>

                    <Navigator
                        onClick={handleNextSection}
                        disabled={statmentIndex === contents.length - 1}
                    >
                        <NavigateNextIcon fontSize='large' />
                    </Navigator>

                    <Navigator
                        onClick={handleLastPageClick}
                        disabled={statmentIndex === contents.length - 1}
                    >
                        <LastPageIcon fontSize='large' />
                    </Navigator>

                    <Navigator
                        onClick={handleInputClick}
                    >
                        <InputIcon fontSize='medium' />
                    </Navigator>
                </Stack>
            </Container>
        </>
    );
};

export default Main;
