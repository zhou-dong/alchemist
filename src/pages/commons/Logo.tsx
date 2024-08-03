import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";
import MaterialLink from "@mui/material/Link";

interface Props {
    color: string
}

const Logo = ({ color }: Props) => (
    <MaterialLink
        component={RouterLink}
        to="/"
        sx={{
            textDecoration: 'none',
            fontWeight: "normal",
            color,
        }}
    >
        <Typography
            variant="h5"
            sx={{
                fontWeight: 300
            }}
        >
            Alchemist
        </Typography>
    </MaterialLink>
);

export default Logo;
