import * as React from 'react';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Popover, ToggleButton, PopoverOrigin } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import MuiStack from '@mui/material/Stack';
import InputIcon from '@mui/icons-material/Input';
import AlgoInput from "./AlgoInput";
import { description, solution } from "./contents";
import ReactMarkdown from "react-markdown";
import { styled } from '@mui/material/styles';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import Instructions from './Instructions';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';

const anchorOrigin: PopoverOrigin = {
    vertical: 'center',
    horizontal: 'right',
};

const transformOrigin: PopoverOrigin = {
    vertical: 'center',
    horizontal: 'left',
};

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 13,
    },
}));

const StyledReactMarkdown = styled(ReactMarkdown)(() => ({
    fontSize: "16px",
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
}));

const capitalize = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const Item: React.FC<{
    name: string,
    icon: JSX.Element,
    popover: JSX.Element
}> = ({ icon, popover, name }) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
    }

    return (
        <>
            <LightTooltip title={capitalize(name)} placement="right">
                <ToggleButton
                    onChange={handleToggle}
                    aria-label={name}
                    size="large"
                    sx={{ borderRadius: "50%" }}
                    value={name}
                    selected={open}
                >
                    {icon}
                </ToggleButton>
            </LightTooltip>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            >
                {popover}
            </Popover>
        </>
    )
}

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

const Tips = () => {

    const name = "tips";
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
    }

    return (
        <>
            <LightTooltip title={capitalize(name)} placement="right">
                <ToggleButton
                    onChange={handleToggle}
                    aria-label={name}
                    size="large"
                    sx={{ borderRadius: "50%" }}
                    value={name}
                    selected={open}
                >
                    <TipsAndUpdatesOutlinedIcon fontSize="medium" />
                </ToggleButton>
            </LightTooltip>
            <Instructions
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            />
        </>
    )
}

export default function AlgoMenu() {
    return (
        <MuiStack spacing={2} sx={{ position: 'fixed', top: 112, left: 40 }}>
            <Input />
            <Item
                name="description"
                icon={<DescriptionOutlinedIcon fontSize="medium" />}
                popover={<StyledReactMarkdown>{description}</StyledReactMarkdown>}
            />
            <Item
                name="solution"
                icon={<EmojiObjectsOutlinedIcon fontSize="medium" />}
                popover={<StyledReactMarkdown>{solution}</StyledReactMarkdown>}
            />
            <Tips />
        </MuiStack>
    );
}
