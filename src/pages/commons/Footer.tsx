import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Chip from '@mui/material/Chip';
import { Grid } from '@mui/material';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: "36px" }}>
            © Alchemist {new Date().getFullYear()}. All rights reserved.
        </Typography>
    );
}

function Mail() {
    return (
        <Chip icon={<MailOutlineIcon />} label="alchemist.dong@gmail.com" variant="outlined" sx={{ border: "none", color: "gray" }} />
    );
}

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
            }}
        >
            <Container maxWidth="sm">
                <Grid container>
                    <Grid item sm={6}>
                        <Copyright />
                    </Grid>
                    <Grid item sm={6}>
                        <Mail />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
