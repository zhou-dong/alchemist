import { Link } from 'react-router-dom';
import { Box, ThemeProvider, Grid, Card, CardContent, Typography, CardActionArea, Container, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';

const StackQueueCategory = () => {
    const stackQueueProblems = [
        {
            title: 'Valid Parentheses',
            description: 'Check if a string of parentheses is valid',
            path: '/valid-parentheses',
            difficulty: 'Easy',
            dataStructure: 'Stack'
        },
        {
            title: 'Implement Queue using Stacks',
            description: 'Implement a queue using only stack operations',
            path: '/implement-queue-using-stacks',
            difficulty: 'Medium',
            dataStructure: 'Stack + Queue'
        },
        {
            title: 'Implement Stack using Queues',
            description: 'Implement a stack using only queue operations',
            path: '/implement-stack-using-queues',
            difficulty: 'Medium',
            dataStructure: 'Queue + Stack'
        },
        {
            title: 'Implement Stack using Queue',
            description: 'Implement a stack using a single queue',
            path: '/implement-stack-using-queue',
            difficulty: 'Medium',
            dataStructure: 'Queue + Stack'
        },
        {
            title: 'Basic Calculator',
            description: 'Implement a basic calculator to evaluate a simple expression string',
            path: '/basic-calculator',
            difficulty: 'Hard',
            dataStructure: 'Stack'
        },
        {
            title: 'Basic Calculator II',
            description: 'Implement a basic calculator to evaluate a simple expression string with +, -, *, /',
            path: '/basic-calculator-ii',
            difficulty: 'Medium',
            dataStructure: 'Stack'
        }
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return '#4CAF50';
            case 'Medium': return '#FF9800';
            case 'Hard': return '#F44336';
            default: return '#757575';
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
            >
                <Header />
                <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
                    <Box sx={{ mb: 4 }}>
                        <Button
                            component={Link}
                            to="/pages/categories"
                            startIcon={<ArrowBack />}
                            sx={{ mb: 2 }}
                        >
                            Back to Categories
                        </Button>
                        <Typography variant="h3" component="h1" gutterBottom>
                            Stack & Queue
                        </Typography>
                        <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 4 }}>
                            Master stack and queue data structures and their implementations
                        </Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                        {stackQueueProblems.map((problem, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card 
                                    sx={{ 
                                        height: '100%',
                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 4
                                        }
                                    }}
                                >
                                    <CardActionArea 
                                        component={Link} 
                                        to={problem.path}
                                        sx={{ height: '100%', textDecoration: 'none' }}
                                    >
                                        <CardContent sx={{ p: 3, height: '100%' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                                                    {problem.title}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        px: 2,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        backgroundColor: getDifficultyColor(problem.difficulty),
                                                        color: 'white',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {problem.difficulty}
                                                </Box>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                {problem.description}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                    {problem.dataStructure}
                                                </Typography>
                                                <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }}>
                                                    Start solving →
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default StackQueueCategory;
