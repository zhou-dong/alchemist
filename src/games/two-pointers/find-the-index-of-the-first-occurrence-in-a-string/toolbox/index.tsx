import * as React from 'react';
import MuiStack from '@mui/material/Stack';
import { Popover, PopoverOrigin, ToggleButton } from '@mui/material';
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

const capitalize = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const anchorOrigin: PopoverOrigin = {
    vertical: 'center',
    horizontal: 'right',
};

const transformOrigin: PopoverOrigin = {
    vertical: 'center',
    horizontal: 'left',
};

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

    const name = "input";
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
    }

    const reference = React.useRef(null);

    return (
        <>
            <LightTooltip title={capitalize(name)} placement="right">
                <StyledButton
                    ref={reference}
                    onChange={handleToggle}
                    aria-label={name}
                    size="large"
                    sx={{ borderRadius: "50%" }}
                    value={name}
                    selected={open}
                >
                    <InputIcon fontSize="medium" />
                </StyledButton>
            </LightTooltip>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            >
                <AlgoInput setAnchorEl={setAnchorEl} />
            </Popover>
        </>
    )
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

const BackToWelcome = () => {
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
    const { displayCode, displayOverview } = useAlgoContext();

    return (
        <>
            {displayOverview && <Overview />}
            {displayCode && <CodeSolution />}
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
                <BackToWelcome />
            </MuiStack>
        </>
    );
};

export default Main;
