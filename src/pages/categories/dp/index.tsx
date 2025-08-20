import { Link } from 'react-router-dom';
import { Box, ThemeProvider, Grid, Card, CardContent, Typography, CardActionArea, Container, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';

const DPCategory = () => {
    const dpProblems = [
        {
            title: 'Edit Distance',
            description: 'Find the minimum number of operations required to convert one string to another',
            path: '/algorithms/edit-distance',
            difficulty: 'Hard'
        },
        {
            title: 'Coin Change - Fewest Number',
            description: 'Find the minimum number of coins needed to make up a given amount',
            path: '/algorithms/coin-change',
            difficulty: 'Medium'
        },
        {
            title: 'Coin Change - How Many Ways',
            description: 'Find the number of different ways to make up a given amount',
            path: '/algorithms/coin-change-ii',
            difficulty: 'Medium'
        },
        {
            title: 'Longest Common Subsequence',
            description: 'Find the length of the longest common subsequence of two strings',
            path: '/algorithms/longest-common-subsequence',
            difficulty: 'Medium'
        },
        {
            title: 'Longest Common Substring',
            description: 'Find the length of the longest common substring of two strings',
            path: '/algorithms/longest-common-substring',
            difficulty: 'Medium'
        },
        {
            title: 'Is Subsequence',
            description: 'Check if one string is a subsequence of another',
            path: '/algorithms/is-subsequence',
            difficulty: 'Easy'
        },
        {
            title: 'Is Substring',
            description: 'Check if one string is a substring of another',
            path: '/algorithms/is-substring',
            difficulty: 'Easy'
        },
        {
            title: 'Minimum Path Sum',
            description: 'Find the minimum path sum from top-left to bottom-right in a grid',
            path: '/algorithms/minimum-path-sum',
            difficulty: 'Medium'
        },
        {
            title: 'Rod Cutting Problem',
            description: 'Find the maximum value obtainable by cutting a rod of given length',
            path: '/algorithms/rod-cutting-problem',
            difficulty: 'Medium'
        },
        {
            title: 'Wildcard Matching',
            description: 'Implement wildcard pattern matching with support for ? and *',
            path: '/algorithms/wildcard-matching',
            difficulty: 'Hard'
        },
        {
            title: 'Regular Expression',
            description: 'Implement regular expression matching with support for . and *',
            path: '/algorithms/regular-expression',
            difficulty: 'Hard'
        },
        {
            title: 'Word Break',
            description: 'Determine if a string can be segmented into space-separated words',
            path: '/algorithms/word-break',
            difficulty: 'Medium'
        },
        {
            title: 'Knapsack Problem',
            description: 'Classic 0/1 knapsack problem with dynamic programming',
            path: '/algorithms/knapsack-problem',
            difficulty: 'Medium'
        },
        {
            title: 'Subset Sum Problem',
            description: 'Check if there exists a subset with given sum',
            path: '/algorithms/subset-sum-problem',
            difficulty: 'Medium'
        },
        {
            title: 'Minimum Jumps to Reach End',
            description: 'Find minimum number of jumps to reach the end of array',
            path: '/algorithms/minimum-jumps-to-end',
            difficulty: 'Medium'
        },
        {
            title: 'Longest Increasing Subsequence',
            description: 'Find the length of longest strictly increasing subsequence',
            path: '/algorithms/longest-increasing-subsequence',
            difficulty: 'Medium'
        },
        {
            title: 'Maximum Subarray Problem',
            description: 'Find the contiguous subarray with the largest sum',
            path: '/algorithms/maximum-subarray-problem',
            difficulty: 'Medium'
        },
        {
            title: 'Longest Palindromic Subsequence',
            description: 'Find the length of longest palindromic subsequence',
            path: '/algorithms/longest-palindromic-subsequence',
            difficulty: 'Medium'
        },
        {
            title: 'Longest Palindromic Substring',
            description: 'Find the longest palindromic substring in a string',
            path: '/algorithms/longest-palindromic-substring',
            difficulty: 'Medium'
        },
        {
            title: 'Palindrome Partitioning',
            description: 'Partition a string into palindrome substrings',
            path: '/algorithms/palindrome-partitioning',
            difficulty: 'Medium'
        },
        {
            title: 'House Robber',
            description: 'Rob houses to maximize profit without alerting police',
            path: '/algorithms/house-robber',
            difficulty: 'Medium'
        },
        {
            title: 'Egg Dropping Problem',
            description: 'Find minimum number of attempts to determine critical floor',
            path: '/algorithms/egg-dropping-problem',
            difficulty: 'Hard'
        },
        {
            title: 'Trapping Rain Water',
            description: 'Calculate how much water can be trapped between bars',
            path: '/algorithms/trapping-rain-water',
            difficulty: 'Hard'
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
                            Dynamic Programming
                        </Typography>
                        <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 4 }}>
                            Master optimization problems with memoization and recursive solutions
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {dpProblems.map((problem, index) => (
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

export default DPCategory;
