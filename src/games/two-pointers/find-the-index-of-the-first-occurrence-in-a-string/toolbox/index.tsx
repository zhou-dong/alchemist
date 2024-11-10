import MuiStack from '@mui/material/Stack';
import { ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LightTooltip from '../../../../commons/LightTooltip';
import InputIcon from '@mui/icons-material/Input';
import { useAlgoContext } from '../AlgoContext';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import { State } from '../AlgoState';
import React from 'react';

export enum Tool {
    Description,
    Input,
    Gaming
}

const StyledButton = styled(ToggleButton)(({ theme }) => ({
    borderRadius: "50%",
    color: theme.palette.primary.light,
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.light,
        color: "#fff",
    },
    '&&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: "#fff",
    },
    zIndex: 10,
}));

const Description: React.FC<{ current: Tool }> = ({ current }) => {
    const { setState } = useAlgoContext();

    return (
        <LightTooltip title="Description" placement="right">
            <StyledButton
                onChange={() => setState(State.Description)}
                aria-label="Description"
                size="large"
                value="Description"
                selected={current === Tool.Description}
            >
                <DescriptionOutlinedIcon fontSize="medium" />
            </StyledButton>
        </LightTooltip>
    );
};

const Input: React.FC<{ current: Tool }> = ({ current }) => {
    const { setState } = useAlgoContext();

    return (
        <LightTooltip title="Input" placement="right">
            <StyledButton
                onChange={() => setState(State.Input)}
                aria-label="input"
                size="large"
                value="input"
                selected={current === Tool.Input}
            >
                <InputIcon fontSize="medium" />
            </StyledButton>
        </LightTooltip>
    );
}

const Game: React.FC<{ current: Tool }> = ({ current }) => {
    const { setState, table } = useAlgoContext();

    return (
        <LightTooltip title="Game" placement="right">
            <StyledButton
                onChange={() => setState(State.Playing)}
                aria-label="game"
                size="large"
                value="Game"
                selected={current === Tool.Gaming}
                disabled={table.length == 0}
            >
                <SportsEsportsOutlinedIcon fontSize="medium" />
            </StyledButton>
        </LightTooltip>
    );
};

interface Props {
    current: Tool;
}

const Main = ({ current }: Props) => (
    <MuiStack spacing={2}
        sx={{
            position: 'fixed',
            top: 112,
            left: 40,
            zIndex: 1
        }}
    >
        <Description current={current} />
        <Input current={current} />
        <Game current={current} />
    </MuiStack>
);

export default Main;
