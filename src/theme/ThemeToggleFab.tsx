import { Fab, useTheme } from '@mui/material';
import { useColorMode } from './ColorModeContext';

// Import the icon as a module
import * as Brightness7 from '@mui/icons-material/Brightness7';
import * as Brightness4 from '@mui/icons-material/Brightness4';

// Cast to a React component
const Brightness7Icon = Brightness7.default as unknown as React.ElementType;
const Brightness4Icon = Brightness4.default as unknown as React.ElementType;

export default function ThemeToggleFab() {
    const theme = useTheme();
    const { toggleColorMode } = useColorMode();

    return (
        <Fab
            color="primary"
            onClick={toggleColorMode}
            sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 1300, // on top of most elements
            }}
        >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </Fab>
    );
}
