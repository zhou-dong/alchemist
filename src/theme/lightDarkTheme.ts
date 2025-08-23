import { type PaletteMode } from '@mui/material';
import { type ThemeOptions } from '@mui/material/styles';

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: { main: '#007AFF' },
                background: { default: '#f4f6f8', paper: '#ffffff' },
            }
            : {
                primary: { main: '#00BFA5' },
                background: { default: '#121212', paper: '#1E1E1E' },
            }),
    },
    typography: {
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
        button: {
            textTransform: 'none',
        },
    },
});
