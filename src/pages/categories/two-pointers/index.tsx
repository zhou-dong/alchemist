import { Link } from 'react-router-dom';
import { Box, ThemeProvider, Grid, Card, CardContent, Typography, CardActionArea, Container, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';

const TwoPointersCategory = () => {
    const twoPointersProblems = [
        {
            title: 'Container With Most Water',
            description: 'Find two lines that together with the x-axis forms a container that would hold the greatest amount of water',
            path: '/container-with-most-water',
            difficulty: 'Medium',
            technique: 'Two Pointers'
        },
        {
            title: 'Remove Element',
            description: 'Remove all instances of a value in-place and return the new length',
            path: '/remove-element',
            difficulty: 'Easy',
            technique: 'Two Pointers'
        },
        {
            title: 'Remove Duplicates from Sorted Array',
            description: 'Remove duplicates in-place such that each element appears only once',
            path: '/remove-duplicates-from-sorted-array',
            difficulty: 'Easy',
            technique: 'Two Pointers'
        },
        {
            title: 'Merge Two Sorted Lists',
            description: 'Merge two sorted linked lists and return it as a sorted list',
            path: '/merge-two-sorted-lists',
            difficulty: 'Easy',
            technique: 'Two Pointers'
        },
        {
            title: 'Remove Nth Node From End of List',
            description: 'Remove the nth node from the end of the list and return its head',
            path: '/remove-nth-node-from-end-of-list',
            difficulty: 'Medium',
            technique: 'Two Pointers'
        },
        {
            title: 'Linked List Cycle',
            description: 'Detect if there is a cycle in the linked list',
            path: '/linked-list-cycle',
            difficulty: 'Easy',
            technique: 'Two Pointers (Fast/Slow)'
        },
        {
            title: 'Linked List Cycle II',
            description: 'Find the node where the cycle begins',
            path: '/linked-list-cycle-ii',
            difficulty: 'Medium',
            technique: 'Two Pointers (Fast/Slow)'
        },
        {
            title: 'Find the Index of the First Occurrence in a String',
            description: 'Find the index of the first occurrence of needle in haystack',
            path: '/find-the-index-of-the-first-occurrence-in-a-string',
            difficulty: 'Easy',
            technique: 'Two Pointers'
        },
        {
            title: 'Longest Common Prefix',
            description: 'Find the longest common prefix string amongst an array of strings',
            path: '/longest-common-prefix',
            difficulty: 'Easy',
            technique: 'Two Pointers'
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
                            Two Pointers
                        </Typography>
                        <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 4 }}>
                            Master the two pointer technique for array and string problems
                        </Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                        {twoPointersProblems.map((problem, index) => (
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
                                                    {problem.technique}
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

export default TwoPointersCategory;
