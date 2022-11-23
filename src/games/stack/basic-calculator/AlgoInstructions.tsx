import * as React from 'react';
import ReactMarkdown from "react-markdown";
import MuiStack from '@mui/material/Stack';
import { Paper, Popover, PopoverOrigin, Stack, ToggleButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Instruction from '../../../commons/Instruction';
import { description } from "./contents";
import AlgoInput from "./AlgoInput";
import LightTooltip from '../../../commons/LightTooltip';
import InputIcon from '@mui/icons-material/Input';
import { useAlgoContext } from './AlgoContext';
import AlgoClick from './AlgoClick';

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

const StyledReactMarkdown = styled(ReactMarkdown)(() => ({
    fontSize: "16px",
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
}));

const Input = () => {

    const name = "input";
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
    }

    const reference = React.useRef(null);

    React.useEffect(() => {
        setAnchorEl(reference.current);
    }, [reference])

    return (
        <>
            <LightTooltip title={capitalize(name)} placement="right">
                <ToggleButton
                    ref={reference}
                    onChange={handleToggle}
                    aria-label={name}
                    size="large"
                    sx={{ borderRadius: "50%" }}
                    value={name}
                    selected={open}
                >
                    <InputIcon fontSize="medium" />
                </ToggleButton>
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

const Instructions = () => (
    <MuiStack spacing={2} sx={{ position: 'fixed', top: 112, left: 40, zIndex: 1 }}>
        <Input />
        <Instruction
            name="Description"
            icon={<DescriptionOutlinedIcon fontSize="medium" />}
            popover={<StyledReactMarkdown>{description}</StyledReactMarkdown>}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
        />
    </MuiStack>
);

const States = () => {
    const { result, sign } = useAlgoContext();
    return (
        <Stack spacing={2} sx={{ position: 'fixed', top: 254, left: 40, zIndex: 1 }}>
            <Paper sx={{ padding: "10px 16px", borderRadius: 10 }} variant="outlined">
                <Typography variant="body2" display="inline">
                    RESULT:&nbsp;
                </Typography>
                <Typography variant="body2" display="inline" color="primary">
                    {result}
                </Typography>
            </Paper>
            <Paper sx={{ padding: "10px 16px", borderRadius: 10 }} variant="outlined">
                <Typography variant="body2" display="inline">
                    SIGN :&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
                <Typography variant="body2" display="inline" color="primary">
                    {sign}
                </Typography>
            </Paper>
            <AlgoClick />
        </Stack>
    )
}

const Main = () => {
    return (
        <>
            <Instructions />
            <States />
        </>
    );
}

export default Main;
