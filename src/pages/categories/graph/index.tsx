import { Link } from 'react-router-dom';
import { Box, ThemeProvider, Grid, Card, CardContent, Typography, CardActionArea, Container, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';

const GraphCategory = () => {
    const graphProblems = [
        {
            title: 'Course Schedule',
            description: 'Check if it is possible to finish all courses given prerequisites',
            path: '/algorithms/course-schedule',
            difficulty: 'Medium',
            algorithm: 'Topological Sort'
        },
        {
            title: 'Course Schedule II',
            description: 'Find the order of courses to finish all courses',
            path: '/algorithms/course-schedule-ii',
            difficulty: 'Medium',
            algorithm: 'Topological Sort'
        },
        {
            title: 'Number of Islands',
            description: 'Count the number of islands in a 2D grid',
            path: '/algorithms/number-of-islands',
            difficulty: 'Medium',
            algorithm: 'DFS/BFS'
        },
        {
            title: 'Surrounded Regions',
            description: 'Capture surrounded regions in a 2D board',
            path: '/algorithms/surrounded-regions',
            difficulty: 'Medium',
            algorithm: 'DFS/BFS'
        },
        {
            title: 'Number of Provinces',
            description: 'Find the number of connected components in a graph',
            path: '/algorithms/number-of-provinces',
            difficulty: 'Medium',
            algorithm: 'DFS/BFS'
        },
        {
            title: 'Max Area of Island',
            description: 'Find the maximum area of an island in a 2D grid',
            path: '/algorithms/max-area-of-island',
            difficulty: 'Medium',
            algorithm: 'DFS/BFS'
        },
        {
            title: 'Redundant Connection',
            description: 'Find the edge that can be removed to make a tree',
            path: '/algorithms/redundant-connection',
            difficulty: 'Medium',
            algorithm: 'Union Find'
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
                            Graph Algorithms
                        </Typography>
                        <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 4 }}>
                            Master graph algorithms, DFS, BFS, and connectivity problems
                        </Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                        {graphProblems.map((problem, index) => (
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
                                                    {problem.algorithm}
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

export default GraphCategory;
