import * as React from 'react';
import { Popover, PopoverOrigin, ToggleButton } from '@mui/material';
import LightTooltip from './LightTooltip';

interface Props {
    name: string;
    icon: JSX.Element;
    popover: JSX.Element;
    anchorOrigin: PopoverOrigin;
    transformOrigin: PopoverOrigin;
}

const Instruction = ({ icon, popover, name, anchorOrigin, transformOrigin }: Props) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
    }

    return (
        <>
            <LightTooltip title={name} placement="right">
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

export default Instruction;
