import React from 'react';
import { Container, Typography, Box, Paper, Grid, ThemeProvider, Divider } from '@mui/material';
import AnimationIcon from '@mui/icons-material/Animation';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import theme from '../../commons/theme';
import Footer from '../commons/Footer';
import Header from '../commons/Header';
import Slogan from '../roadmap/Slogan';

interface QuotePaperProps {
    icon: React.ReactNode;
    text: string;
}

const QuotePaper: React.FC<QuotePaperProps> = ({ icon, text }) => (
    <Paper
        elevation={5}
        sx={{
            padding: 2,
            borderLeft: "4px solid",
            borderColor: theme.palette.primary.main,
            textAlign: 'left',
            marginBottom: 4
        }}
    >
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                {icon}
            </Grid>
            <Grid item xs>
                <Typography
                    variant="body1"
                    component="blockquote"
                    paragraph
                >
                    {text}
                </Typography>
            </Grid>
        </Grid>
    </Paper>
);

const AboutUs: React.FC = () => {
    const first = "At alchemist, our mission is to make learning algorithms intuitive and engaging through innovative visualizations.";
    const second = "We believe that understanding complex algorithms is best achieved by seeing them in action, not just through text and code.";
    const third = "Learning algorithms by playing games makes mastering these concepts more exciting and interactive.";
    const forth = "Our platform is dedicated to transforming abstract concepts into clear, visual insights, providing a better and more interactive way to master algorithms and enhance your problem-solving skills.";

    return (
        <ThemeProvider theme={theme}>
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
            >
                <Header />
                <Divider />
                <Slogan />
                <Container sx={{ marginTop: 2 }}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item xs={12} md={8}>
                            <QuotePaper
                                icon={<AnimationIcon color="primary" fontSize='large' />}
                                text={first}
                            />
                            <QuotePaper
                                icon={<VisibilityIcon color="primary" fontSize='large' />}
                                text={second}
                            />
                            <QuotePaper
                                icon={<SportsEsportsIcon color="primary" fontSize='large' />}
                                text={third}
                            />
                            <QuotePaper
                                icon={<LightbulbIcon color="primary" fontSize='large' />}
                                text={forth}
                            />
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default AboutUs;
