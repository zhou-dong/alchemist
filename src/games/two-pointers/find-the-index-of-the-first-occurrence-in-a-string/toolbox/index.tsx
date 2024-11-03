import MuiStack from '@mui/material/Stack';
import { ToggleButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AlgoInput from "./AlgoInput";
import LightTooltip from '../../../../commons/LightTooltip';
import InputIcon from '@mui/icons-material/Input';
import CodeIcon from '@mui/icons-material/Code';
import { useAlgoContext } from '../AlgoContext';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import Overview from './Overview';
import CodeSolution from './CodeSolution';

const StyledButton = styled(ToggleButton)(({ theme }) => ({
    borderRadius: "50%",
    '&:hover': {
        backgroundColor: theme.palette.info.light,
        borderColor: theme.palette.info.light,
        color: theme.palette.info.contrastText,
    },
    '&&.Mui-selected': {
        backgroundColor: theme.palette.info.light,
        borderColor: theme.palette.info.light,
        color: theme.palette.info.contrastText,
    },
    zIndex: 10,
}));

const Code = () => {
    const { displayCode, setDisplayCode } = useAlgoContext();

    const handleToggle = () => {
        setDisplayCode(isOpen => !isOpen);
    }

    return (
        <LightTooltip title="Code" placement="right">
            <StyledButton
                onChange={handleToggle}
                aria-label="code"
                size="large"
                value="code"
                selected={displayCode}
            >
                <CodeIcon fontSize="medium" />
            </StyledButton>
        </LightTooltip>
    );
};

const Instruction = () => {
    const { displayOverview, setDisplayOverview } = useAlgoContext();

    const handleToggle = () => {
        setDisplayOverview(isOpen => !isOpen);
    }

    return (
        <LightTooltip title="Instruction" placement="right">
            <StyledButton
                onChange={handleToggle}
                aria-label="Instruction"
                size="large"
                value="Instruction"
                selected={displayOverview}
            >
                <DescriptionOutlinedIcon fontSize="medium" />
            </StyledButton>
        </LightTooltip>
    );
};

const Input = () => {
    const { displayInput, setDisplayInput } = useAlgoContext();

    const handleToggle = () => {
        setDisplayInput(open => !open);
    }

    return (
        <LightTooltip title="Input" placement="right">
            <StyledButton
                onChange={handleToggle}
                aria-label="input"
                size="large"
                value="input"
                selected={displayInput}
            >
                <InputIcon fontSize="medium" />
            </StyledButton>
        </LightTooltip>
    );
}

const Game = () => {
    const { displayGame, setDisplayGame } = useAlgoContext();

    const handleToggle = () => {
        setDisplayGame(isOpen => !isOpen);
    }

    return (
        <LightTooltip title="Game" placement="right">
            <StyledButton
                onChange={handleToggle}
                aria-label="game"
                size="large"
                value="Game"
                selected={displayGame}
            >
                <SportsEsportsOutlinedIcon fontSize="medium" />
            </StyledButton>
        </LightTooltip>
    );
};

const BackToOverview = () => {
    const { setDisplayIntroduction } = useAlgoContext();
    const theme = useTheme();

    return (
        <LightTooltip title="Introduction" placement="right">
            <ToggleButton
                onClick={() => setDisplayIntroduction(true)}
                aria-label="introduce"
                size="large"
                sx={{
                    borderRadius: "50%",
                    '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.info.contrastText,
                    },
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                }}
                value="Introduction"
            >
                <KeyboardBackspaceIcon fontSize="medium" />
            </ToggleButton>
        </LightTooltip>
    );
};

const Main = () => {
    const { displayCode, displayOverview, displayInput } = useAlgoContext();

    return (
        <>
            {displayOverview && <Overview />}
            {displayCode && <CodeSolution />}
            {displayInput && <AlgoInput />}
            <MuiStack spacing={2}
                sx={{
                    position: 'fixed',
                    top: 112,
                    left: 40,
                    zIndex: 1
                }}
            >
                <Input />
                <Instruction />
                <Code />
                <Game />
                <BackToOverview />
            </MuiStack>
        </>
    );
};

export default Main;
