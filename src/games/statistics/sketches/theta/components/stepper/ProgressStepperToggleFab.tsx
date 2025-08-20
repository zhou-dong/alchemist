import { Fab, Tooltip } from '@mui/material';
import * as MenuOpen from '@mui/icons-material/MenuOpen';
import * as Menu from '@mui/icons-material/Menu';

const MenuOpenIcon = MenuOpen.default as unknown as React.ElementType;
const MenuIcon = Menu.default as unknown as React.ElementType;

export default function StepperToggleFab({
    visible,
    onToggle,
}: {
    visible: boolean;
    onToggle: () => void;
}) {
    return (
        <Tooltip title={visible ? 'Hide Stepper' : 'Show Stepper'} placement="left">
            <Fab
                color="secondary"
                onClick={onToggle}
                sx={{
                    position: 'fixed',
                    bottom: 96, // stacked with theme toggle
                    right: 24,
                    zIndex: 1300,
                }}
            >
                {visible ? <MenuOpenIcon /> : <MenuIcon />}
            </Fab>
        </Tooltip>
    );
}
