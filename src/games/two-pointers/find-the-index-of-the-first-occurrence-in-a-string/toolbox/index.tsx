import MuiStack from '@mui/material/Stack';
import { ToggleButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LightTooltip from '../../../../commons/LightTooltip';
import InputIcon from '@mui/icons-material/Input';
import CodeIcon from '@mui/icons-material/Code';
import { useAlgoContext } from '../AlgoContext';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Overview from './Overview';
import CodeSolution from './CodeSolution';
import GameInput from '../input/GameInput';
import Game from "../game";
import testCases from "./test-cases.json";
import { buildSteps, createTable, createTableStyle } from '../game/algo';
import { State } from '../AlgoState';
import TagFacesIcon from '@mui/icons-material/TagFaces';

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
    const { setState } = useAlgoContext();

    return (
        <LightTooltip title="Input" placement="right">
            <StyledButton
                onChange={() => setState(State.Input)}
                aria-label="input"
                size="large"
                value="input"
            >
                <InputIcon fontSize="medium" />
            </StyledButton>
        </LightTooltip>
    );
}

const GameSign = () => {
    const { displayGame, setDisplayGame, table, setTable, setTableStyle, setIndex, setState, setSteps, setHaystack, setNeedle } = useAlgoContext();

    const getRandomTestCase = () => {
        const max = testCases.length;
        const index = Math.floor(Math.random() * max);
        return testCases[index];
    }

    const fillTable = () => {
        const { input } = getRandomTestCase();
        const { haystack, needle } = input;

        const table = createTable(haystack, needle);
        const tableStyle = createTableStyle(haystack, needle);
        const steps = buildSteps(haystack, needle);

        setTable(table);
        setTableStyle(tableStyle);
        setIndex(0);
        setSteps(steps);
        setState(State.Playing);

        setHaystack(haystack);
        setNeedle(needle);
    }

    const handleToggle = () => {
        setDisplayGame(isOpen => {
            const open = !isOpen;
            if (open && table.length === 0) {
                fillTable();
            }
            return open;
        });
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
    const { setState } = useAlgoContext();

    return (
        <LightTooltip title="Description" placement="right">
            <StyledButton
                onClick={() => setState(State.Description)}
                aria-label="description"
                size="large"
                value="Description"
            >
                <TagFacesIcon fontSize="medium" />
            </StyledButton>
        </LightTooltip>
    );
};

const Main = () => {
    const { displayCode, displayOverview, displayGame } = useAlgoContext();

    return (
        <>
            {displayOverview && <Overview />}
            {displayCode && <CodeSolution />}
            {displayGame && <Game />}
            <MuiStack spacing={2}
                sx={{
                    position: 'fixed',
                    top: 112,
                    left: 40,
                    zIndex: 1
                }}
            >
                <Instruction />
                <Code />
                <GameSign />
                <BackToOverview />
                <Input />
            </MuiStack>
        </>
    );
};

export default Main;
