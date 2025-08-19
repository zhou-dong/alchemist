import { Link } from 'react-router-dom';
import { Box, ThemeProvider, Grid, Card, CardContent, Typography, CardActionArea, Container, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';

const StatisticsCategory = () => {
    const statisticsProblems = [
        {
            title: 'Find Median from Data Stream',
            description: 'Design a data structure that supports finding the median of a stream of integers',
            path: '/algorithms/find-median-from-data-stream',
            difficulty: 'Hard',
            concept: 'Median Finding'
        },
        {
            title: 'Sliding Window Median',
            description: 'Find the median for each window of size k in an array',
            path: '/algorithms/sliding-window-median',
            difficulty: 'Hard',
            concept: 'Sliding Window + Median'
        },
        {
            title: 'Kth Largest Element in an Array',
            description: 'Find the kth largest element in an unsorted array',
            path: '/algorithms/kth-largest-element-in-an-array',
            difficulty: 'Medium',
            concept: 'Order Statistics'
        },
        {
            title: 'Top K Frequent Elements',
            description: 'Find the k most frequent elements in an array',
            path: '/algorithms/top-k-frequent-elements',
            difficulty: 'Medium',
            concept: 'Frequency Analysis'
        },
        {
            title: 'Top K Frequent Words',
            description: 'Return the k most frequent words in a list',
            path: '/algorithms/top-k-frequent-words',
            difficulty: 'Medium',
            concept: 'Frequency Analysis'
        },
        {
            title: 'Kth Largest Element in a Stream',
            description: 'Design a class to find the kth largest element in a stream',
            path: '/algorithms/kth-largest-element-in-a-stream',
            difficulty: 'Medium',
            concept: 'Stream Processing'
        },
        {
            title: 'Linked List Random Node',
            description: 'Return a random node from a linked list with equal probability',
            path: '/algorithms/linked-list-random-node',
            difficulty: 'Medium',
            concept: 'Random Sampling'
        },
        {
            title: 'Kth Smallest Element in a BST',
            description: 'Find the kth smallest element in a binary search tree',
            path: '/algorithms/kth-smallest-element-in-a-bst',
            difficulty: 'Medium',
            concept: 'Order Statistics + BST'
        },
        {
            title: 'Kth Smallest Element in a Sorted Matrix',
            description: 'Find the kth smallest element in a sorted matrix',
            path: '/algorithms/kth-smallest-element-in-a-sorted-matrix',
            difficulty: 'Medium',
            concept: 'Matrix + Order Statistics'
        },
        {
            title: 'Find K Pairs with Smallest Sums',
            description: 'Find k pairs with the smallest sums from two sorted arrays',
            path: '/algorithms/find-k-pairs-with-smallest-sums',
            difficulty: 'Medium',
            concept: 'K-Smallest Elements'
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
                            Statistics & Probability
                        </Typography>
                        <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 4 }}>
                            Master statistical concepts, order statistics, and probability algorithms
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {statisticsProblems.map((problem, index) => (
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
                                                    {problem.concept}
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

export default StatisticsCategory;
