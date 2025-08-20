import { Link } from 'react-router-dom';
import { Box, ThemeProvider, Grid, Card, CardContent, Typography, CardActionArea, Container, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';

const SortingCategory = () => {
    const sortingProblems = [
        {
            title: 'Bubble Sort',
            description: 'Simple comparison-based sorting algorithm with O(n²) complexity',
            path: '/algorithms/bubble-sort',
            difficulty: 'Easy',
            complexity: 'O(n²)'
        },
        {
            title: 'Selection Sort',
            description: 'In-place comparison sorting algorithm with O(n²) complexity',
            path: '/algorithms/selection-sort',
            difficulty: 'Easy',
            complexity: 'O(n²)'
        },
        {
            title: 'Insertion Sort',
            description: 'Simple sorting algorithm that builds the final array one item at a time',
            path: '/algorithms/insertion-sort',
            difficulty: 'Easy',
            complexity: 'O(n²)'
        },
        {
            title: 'Merge Sort',
            description: 'Divide and conquer algorithm with O(n log n) complexity',
            path: '/algorithms/merge-sort',
            difficulty: 'Medium',
            complexity: 'O(n log n)'
        },
        {
            title: 'Quick Sort',
            description: 'Efficient, in-place sorting algorithm with O(n log n) average complexity',
            path: '/algorithms/quick-sort',
            difficulty: 'Medium',
            complexity: 'O(n log n)'
        },
        {
            title: 'Heap Sort',
            description: 'Comparison-based sorting algorithm using heap data structure',
            path: '/algorithms/heap-sort',
            difficulty: 'Medium',
            complexity: 'O(n log n)'
        },
        {
            title: 'Counting Sort',
            description: 'Non-comparison based sorting algorithm for integers',
            path: '/algorithms/counting-sort',
            difficulty: 'Medium',
            complexity: 'O(n + k)'
        },
        {
            title: 'Bucket Sort',
            description: 'Distribution sort that works by distributing elements into buckets',
            path: '/algorithms/bucket-sort',
            difficulty: 'Medium',
            complexity: 'O(n + k)'
        },
        {
            title: 'Radix Sort',
            description: 'Non-comparative integer sorting algorithm',
            path: '/algorithms/radix-sort',
            difficulty: 'Medium',
            complexity: 'O(nk)'
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
                            Sorting Algorithms
                        </Typography>
                        <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 4 }}>
                            Master comparison and non-comparison based sorting algorithms
                        </Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                        {sortingProblems.map((problem, index) => (
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
                                                    Complexity: {problem.complexity}
                                                </Typography>
                                                <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }}>
                                                    Start learning →
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

export default SortingCategory;
