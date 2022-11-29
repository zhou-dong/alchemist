import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";
import MaterialLink from "@mui/material/Link";
import { green } from '@mui/material/colors';

const Logo = () => (
    <Toolbar sx={{ position: "fixed" }}>
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
);

export default Logo;