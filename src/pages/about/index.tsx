import React from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Paper, 
    Grid, 
    ThemeProvider, 
    Divider,
    Card,
    CardContent,
    Avatar,
    Chip,
    Button
} from '@mui/material';
import {
    Animation,
    Lightbulb,
    Visibility,
    SportsEsports,
    Code,
    School,
    TrendingUp,
    Psychology,
    RocketLaunch,
    Star,
    CheckCircle
} from '@mui/icons-material';
import theme from '../../commons/theme';
import Footer from '../commons/Footer';
import Header from '../commons/Header';

const AboutUs: React.FC = () => {
    const features = [
        {
            icon: <Animation sx={{ fontSize: 40, color: '#2196F3' }} />,
            title: 'Interactive Visualizations',
            description: 'See algorithms come to life with dynamic, step-by-step visual representations that make complex concepts crystal clear.'
        },
        {
            icon: <SportsEsports sx={{ fontSize: 40, color: '#4CAF50' }} />,
            title: 'Gamified Learning',
            description: 'Transform learning into an engaging experience with interactive challenges and real-time feedback.'
        },
        {
            icon: <Visibility sx={{ fontSize: 40, color: '#FF9800' }} />,
            title: 'Visual Insights',
            description: 'Gain deep understanding through visual patterns and intuitive representations of algorithmic concepts.'
        },
        {
            icon: <Code sx={{ fontSize: 40, color: '#9C27B0' }} />,
            title: 'Practical Implementation',
            description: 'Learn not just the theory, but how to implement algorithms in real-world scenarios.'
        }
    ];

    const stats = [
        { number: '100+', label: 'Algorithms' },
        { number: '13', label: 'Categories' },
        { number: '3', label: 'Difficulty Levels' },
        { number: '∞', label: 'Learning Paths' }
    ];

    const values = [
        {
            icon: <Lightbulb sx={{ fontSize: 32, color: '#FFC107' }} />,
            title: 'Innovation',
            description: 'Pushing the boundaries of how algorithms are taught and learned'
        },
        {
            icon: <School sx={{ fontSize: 32, color: '#2196F3' }} />,
            title: 'Education',
            description: 'Making complex concepts accessible to learners of all levels'
        },
        {
            icon: <TrendingUp sx={{ fontSize: 32, color: '#4CAF50' }} />,
            title: 'Growth',
            description: 'Continuous improvement and expansion of our learning platform'
        },
        {
            icon: <Psychology sx={{ fontSize: 32, color: '#9C27B0' }} />,
            title: 'Understanding',
            description: 'Deep comprehension over surface-level memorization'
        }
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
                sx={{ backgroundColor: '#fafafa' }}
            >
                <Header />
                
                {/* Hero Section */}
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        py: 8,
                        textAlign: 'center'
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                fontSize: { xs: '2.5rem', md: '3.5rem' }
                            }}
                        >
                            About Alchemist
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 4,
                                opacity: 0.9,
                                maxWidth: 800,
                                mx: 'auto',
                                lineHeight: 1.6
                            }}
                        >
                            Transforming algorithm learning through innovative visualizations and interactive experiences
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Chip
                                icon={<RocketLaunch />}
                                label="Interactive Learning"
                                sx={{ 
                                    backgroundColor: 'rgba(255,255,255,0.2)', 
                                    color: 'white',
                                    fontSize: '1rem',
                                    py: 1
                                }}
                            />
                            <Chip
                                icon={<Star />}
                                label="Visual Mastery"
                                sx={{ 
                                    backgroundColor: 'rgba(255,255,255,0.2)', 
                                    color: 'white',
                                    fontSize: '1rem',
                                    py: 1
                                }}
                            />
                            <Chip
                                icon={<CheckCircle />}
                                label="Practical Skills"
                                sx={{ 
                                    backgroundColor: 'rgba(255,255,255,0.2)', 
                                    color: 'white',
                                    fontSize: '1rem',
                                    py: 1
                                }}
                            />
                        </Box>
                    </Container>
                </Box>

                {/* Mission Section */}
                <Container maxWidth="lg" sx={{ py: 8 }}>
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 600,
                                mb: 3,
                                color: 'text.primary'
                            }}
                        >
                            Our Mission
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'text.secondary',
                                maxWidth: 800,
                                mx: 'auto',
                                lineHeight: 1.8
                            }}
                        >
                            At Alchemist, we believe that understanding complex algorithms is best achieved by seeing them in action. 
                            Our platform transforms abstract concepts into clear, visual insights, providing an interactive and engaging 
                            way to master algorithms and enhance problem-solving skills.
                        </Typography>
                    </Box>

                    {/* Features Grid */}
                    <Grid container spacing={4} sx={{ mb: 8 }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        textAlign: 'center',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Box sx={{ mb: 3 }}>
                                            {feature.icon}
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 2,
                                                color: 'text.primary'
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                lineHeight: 1.6
                                            }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Stats Section */}
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 3,
                            p: 6,
                            mb: 8,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h3"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 600,
                                mb: 5,
                                color: 'text.primary'
                            }}
                        >
                            Platform Highlights
                        </Typography>
                        <Grid container spacing={4} justifyContent="center">
                            {stats.map((stat, index) => (
                                <Grid item xs={6} sm={3} key={index}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                fontWeight: 700,
                                                color: 'primary.main',
                                                mb: 1
                                            }}
                                        >
                                            {stat.number}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: 'text.secondary',
                                                fontWeight: 500
                                            }}
                                        >
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Values Section */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h4"
                            component="h3"
                            sx={{
                                fontWeight: 600,
                                mb: 5,
                                color: 'text.primary'
                            }}
                        >
                            Our Values
                        </Typography>
                        <Grid container spacing={4}>
                            {values.map((value, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Box sx={{ mb: 2 }}>
                                            {value.icon}
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            component="h4"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 2,
                                                color: 'text.primary'
                                            }}
                                        >
                                            {value.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                lineHeight: 1.6
                                            }}
                                        >
                                            {value.description}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Call to Action */}
                    <Box
                        sx={{
                            textAlign: 'center',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            borderRadius: 3,
                            p: 6,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h3"
                            sx={{
                                fontWeight: 600,
                                mb: 3
                            }}
                        >
                            Ready to Master Algorithms?
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 4,
                                opacity: 0.9,
                                maxWidth: 600,
                                mx: 'auto'
                            }}
                        >
                            Join thousands of learners who have transformed their understanding of algorithms through our interactive platform.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: 'white',
                                color: 'primary.main',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                        >
                            Start Learning Now
                        </Button>
                    </Box>
                </Container>

                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default AboutUs;
