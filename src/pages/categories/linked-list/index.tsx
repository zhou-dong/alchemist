import { Link } from 'react-router-dom';
import { Box, ThemeProvider, Grid, Card, CardContent, Typography, CardActionArea, Container, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';

const LinkedListCategory = () => {
    const linkedListProblems = [
        {
            title: 'Swap Nodes in Pairs',
            description: 'Swap every two adjacent nodes in a linked list',
            path: '/algorithms/swap-nodes-in-pairs',
            difficulty: 'Medium'
        },
        {
            title: 'Remove Duplicates from Sorted List',
            description: 'Remove all duplicates from a sorted linked list',
            path: '/algorithms/remove-duplicates-from-sorted-list',
            difficulty: 'Easy'
        },
        {
            title: 'Remove Duplicates from Sorted List II',
            description: 'Remove all nodes that have duplicate numbers',
            path: '/algorithms/remove-duplicates-from-sorted-list-ii',
            difficulty: 'Medium'
        },
        {
            title: 'Rotate List',
            description: 'Rotate the list to the right by k places',
            path: '/algorithms/rotate-list',
            difficulty: 'Medium'
        },
        {
            title: 'Partition List',
            description: 'Partition list around a value x',
            path: '/algorithms/partition-list',
            difficulty: 'Medium'
        },
        {
            title: 'Reverse Linked List',
            description: 'Reverse a singly linked list',
            path: '/algorithms/reverse-linked-list',
            difficulty: 'Easy'
        },
        {
            title: 'Reverse Linked List II',
            description: 'Reverse a linked list from position m to n',
            path: '/algorithms/reverse-linked-list-ii',
            difficulty: 'Medium'
        },
        {
            title: 'Insertion Sort List',
            description: 'Sort a linked list using insertion sort',
            path: '/algorithms/insertion-sort-list',
            difficulty: 'Medium'
        },
        {
            title: 'Remove Linked List Elements',
            description: 'Remove all elements from a linked list of integers that have value val',
            path: '/algorithms/remove-linked-list-elements',
            difficulty: 'Easy'
        },
        {
            title: 'Intersection of Two Linked Lists',
            description: 'Find the node at which the intersection of two singly linked lists begins',
            path: '/algorithms/intersection-of-two-linked-lists',
            difficulty: 'Easy'
        },
        {
            title: 'Palindrome Linked List',
            description: 'Check if a singly linked list is a palindrome',
            path: '/algorithms/palindrome-linked-list',
            difficulty: 'Easy'
        },
        {
            title: 'Odd Even Linked List',
            description: 'Group all odd nodes together followed by the even nodes',
            path: '/algorithms/odd-even-linked-list',
            difficulty: 'Medium'
        },
        {
            title: 'Sort List',
            description: 'Sort a linked list in O(n log n) time using constant space complexity',
            path: '/algorithms/sort-list',
            difficulty: 'Medium'
        },
        {
            title: 'Linked List Random Node',
            description: 'Return a random node\'s value from the linked list',
            path: '/algorithms/linked-list-random-node',
            difficulty: 'Medium'
        },
        {
            title: 'Middle of the Linked List',
            description: 'Return the middle node of the linked list',
            path: '/algorithms/middle-of-the-linked-list',
            difficulty: 'Easy'
        },
        {
            title: 'Delete Node in a Linked List',
            description: 'Delete a node (except the tail) in a singly linked list',
            path: '/algorithms/delete-node-in-a-linked-list',
            difficulty: 'Easy'
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
                            Linked List
                        </Typography>
                        <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 4 }}>
                            Master singly and doubly linked list operations and algorithms
                        </Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                        {linkedListProblems.map((problem, index) => (
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
                                            <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }}>
                                                Start solving →
                                            </Typography>
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

export default LinkedListCategory;
