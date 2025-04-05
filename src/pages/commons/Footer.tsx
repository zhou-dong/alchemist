import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Grid, Stack, Toolbar } from '@mui/material';
import { grey } from '@mui/material/colors';

const Copyright = () => (
    <Typography>
        © Alchemist {new Date().getFullYear()}. All rights reserved.
    </Typography>
);

const Email = () => (
    <Stack direction="row">
        <MailOutlineIcon sx={{ marginRight: "2px" }} />
        <Typography>
            alchemist.dong@gmail.com
        </Typography>
    </Stack>
);

export const footerHeight = 64;

export default function Footer() {
    return (
        <Toolbar
            component="footer"
            sx={{
                mt: 'auto',
                backgroundColor: grey[300],
            }}
        >
            <Container maxWidth="sm">
                <Grid container>
                    <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Copyright />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Email />
                    </Grid>
                </Grid>
            </Container>
        </Toolbar>
    );
}
