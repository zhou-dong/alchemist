import MuiStack from '@mui/material/Stack';
import { ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LightTooltip from '../../../../commons/LightTooltip';
import InputIcon from '@mui/icons-material/Input';
import { useAlgoContext } from '../AlgoContext';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { State } from '../AlgoState';
import React from 'react';

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

const Tool: React.FC<{
    name: string,
    content: JSX.Element,
    selected: boolean,
    disabled: boolean,
    onClick: (event: React.MouseEvent<HTMLElement>, value: any) => void
}> = ({ name, content, onClick, selected, disabled }) => (
    <LightTooltip title={name} placement="right">
        <StyledButton
            onClick={onClick}
            aria-label={name}
            size="large"
            value={name}
            selected={selected}
            disabled={disabled}
        >
            {content}
        </StyledButton>
    </LightTooltip>
);

const Description: React.FC<{ current: State }> = ({ current }) => {
    const { setState } = useAlgoContext();

    return (
        <LightTooltip title="Description" placement="right">
            <StyledButton
                onClick={() => setState(State.Description)}
                aria-label="Description"
                size="large"
                value="Description"
                selected={current === State.Description}
            >
                <DescriptionOutlinedIcon fontSize="medium" />
            </StyledButton>
        </LightTooltip>
    );
};

const Input: React.FC<{ current: State }> = ({ current }) => {
    const { setState } = useAlgoContext();

    return (
        <LightTooltip title="Input" placement="right">
            <StyledButton
                onClick={() => setState(State.Input)}
                aria-label="input"
                size="large"
                value="input"
                selected={current === State.Input}
            >
                <InputIcon fontSize="medium" />
            </StyledButton>
        </LightTooltip>
    );
}

interface Props {
    current: State;
}

const Main = ({ current }: Props) => {
    const { setState, table } = useAlgoContext();

    return (
        <MuiStack spacing={2}
            sx={{
                position: 'fixed',
                top: 112,
                left: 40,
                zIndex: 1
            }}
        >
            <Tool
                name="Welcome"
                content={<SentimentSatisfiedAltIcon fontSize="medium" />}
                selected={current === State.Welcome}
                disabled={false}
                onClick={() => setState(State.Welcome)}
            />
            <Tool
                name="Description"
                content={<DescriptionOutlinedIcon fontSize="medium" />}
                selected={current === State.Description}
                disabled={false}
                onClick={() => setState(State.Description)}
            />
            <Tool
                name="Input"
                content={<InputIcon fontSize="medium" />}
                selected={current === State.Input}
                disabled={false}
                onClick={() => setState(State.Input)}
            />
            <Tool
                name="Game"
                content={<SportsEsportsOutlinedIcon fontSize="medium" />}
                selected={current === State.Playing}
                disabled={table.length === 0}
                onClick={() => setState(State.Playing)}
            />
        </MuiStack>
    );
}

export default Main;
