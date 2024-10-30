import * as React from 'react';
import ReactMarkdown from "react-markdown";
import MuiStack from '@mui/material/Stack';
import { Popover, PopoverOrigin, ToggleButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Instruction from '../../../commons/Instruction';
import { description } from "./contents";
import AlgoInput from "./AlgoInput";
import LightTooltip from '../../../commons/LightTooltip';
import InputIcon from '@mui/icons-material/Input';
import CodeIcon from '@mui/icons-material/Code';
import { useAlgoContext } from './AlgoContext';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { green } from '@mui/material/colors';

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

const StyledReactMarkdown = styled(ReactMarkdown)(() => ({
    fontSize: "16px",
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
}));

const Code = () => {
    const { displayCode, setDisplayCode } = useAlgoContext();
    const theme = useTheme();
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
}

const Input = () => {

    const name = "input";
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
    }

    const reference = React.useRef(null);

    // React.useEffect(() => {
    //     setAnchorEl(reference.current);
    // }, [reference])

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

const Main = () => {
    const { setDisplayIntroduce } = useAlgoContext();
    const theme = useTheme();
    return (
        <MuiStack spacing={2} sx={{ position: 'fixed', top: 112, left: 40, zIndex: 1 }}>
            <Input />
            <Instruction
                name="Description"
                icon={<DescriptionOutlinedIcon fontSize="medium" />}
                popover={<StyledReactMarkdown>{description}</StyledReactMarkdown>}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            />
            <Code />
            <LightTooltip title="Introduction" placement="right">
                <ToggleButton
                    onClick={() => setDisplayIntroduce(true)}
                    aria-label="introduce"
                    size="large"
                    sx={{
                        borderRadius: "50%",
                        backgroundColor: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.info.contrastText,
                    }}
                    value="Introduction"
                >
                    <MenuBookIcon fontSize="medium" sx={{ color: "#fff" }} />
                </ToggleButton>
            </LightTooltip>
        </MuiStack>
    );
};

export default Main;
