import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";
import MaterialLink from "@mui/material/Link";

const Logo = () => (
    <Toolbar>
        <Typography
            variant="h6"
            color="primary"
            sx={{ fontWeight: "normal" }}
        >
            <MaterialLink component={RouterLink} to="/" style={{ textDecoration: 'none' }}>
                Alchemist
            </MaterialLink>
        </Typography>
    </Toolbar>
);

export default Logo;
