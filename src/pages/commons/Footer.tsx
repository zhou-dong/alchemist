import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Chip from '@mui/material/Chip';
import { Grid } from '@mui/material';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: "36px" }}>
            {'Copyright © '}
            <Link color="inherit" href="https://alchemist-al.com">
                alchemist
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}
        >
            <CssBaseline />
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
        </Box>
    );
}
