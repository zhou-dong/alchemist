import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Grid, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

function Copyright() {
    return (
        <Typography
            color="text.secondary"
            sx={{
                color: "#000",
                lineHeight: "36px"
            }}
        >
            © Alchemist {new Date().getFullYear()}. All rights reserved.
        </Typography>
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
                backgroundColor: grey[300],
            }}
        >
            <Container maxWidth="sm">
                <Grid container>
                    <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Copyright />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Stack direction="row">
                            <MailOutlineIcon sx={{ marginRight: "2px" }} />
                            <Typography>
                                alchemist.dong@gmail.com
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
