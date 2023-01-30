import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";
import MaterialLink from "@mui/material/Link";
import { green } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

const Logo = () => (
    <ThemeProvider theme={theme}>
        <Toolbar sx={{ '&.MuiToolbar-root': { paddingLeft: 0, paddingRight: 0 } }}>
            <Typography variant="h6">
                <MaterialLink
                    component={RouterLink}
                    to="/"
                    sx={{
                        textDecoration: 'none',
                        fontWeight: "normal",
                        color: green[600],
                    }}
                >
                    Alchemist
                </MaterialLink>
            </Typography>
        </Toolbar>
    </ThemeProvider>
);

export default Logo;
