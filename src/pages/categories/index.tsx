import { Link } from 'react-router-dom';
import { Box, ThemeProvider, Grid, Card, CardContent, Typography, CardActionArea, Container, Button, Paper, Divider } from '@mui/material';
import { ArrowForward, TrendingUp, Code, DataObject, Functions, AccountTree, Sort, Queue, Storage, Search, TouchApp, Window, Calculate, Psychology } from '@mui/icons-material';
import theme from '../../commons/theme';
import Header from '../commons/Header';
import Footer from '../commons/Footer';

const Main = () => {
    const categories = [
        {
            title: 'Dynamic Programming',
            description: 'Optimization problems, memoization, and recursive solutions',
            path: '/pages/categories/dp',
            color: '#FF6B6B',
            count: 25,
            icon: <Functions sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)'
        },
        {
            title: 'Tree',
            description: 'Binary trees, BST, tree traversals, and tree algorithms',
            path: '/pages/categories/tree',
            color: '#4ECDC4',
            count: 35,
            icon: <AccountTree sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #4ECDC4 0%, #6EDDD6 100%)'
        },
        {
            title: 'Linked List',
            description: 'Singly and doubly linked list operations and algorithms',
            path: '/pages/categories/linked-list',
            color: '#45B7D1',
            count: 15,
            icon: <DataObject sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #45B7D1 0%, #67C5DB 100%)'
        },
        {
            title: 'Graph',
            description: 'Graph algorithms, DFS, BFS, and connectivity problems',
            path: '/pages/categories/graph',
            color: '#96CEB4',
            count: 8,
            icon: <TrendingUp sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #96CEB4 0%, #A8D8C0 100%)'
        },
        {
            title: 'Sorting',
            description: 'Comparison and non-comparison based sorting algorithms',
            path: '/pages/categories/sorting',
            color: '#FFEAA7',
            count: 7,
            icon: <Sort sx={{ fontSize: 24, color: '#D4A017' }} />,
            gradient: 'linear-gradient(135deg, #FFEAA7 0%, #FFD93D 100%)'
        },
        {
            title: 'Stack & Queue',
            description: 'Stack and queue data structures and implementations',
            path: '/pages/categories/stack-queue',
            color: '#DDA0DD',
            count: 6,
            icon: <Queue sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #DDA0DD 0%, #E6B3E6 100%)'
        },
        {
            title: 'Hash Table',
            description: 'Hash-based data structures and collision resolution',
            path: '/pages/categories/hash-table',
            color: '#F8BBD9',
            count: 2,
            icon: <Storage sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #F8BBD9 0%, #FAD0E6 100%)'
        },
        {
            title: 'Binary Search',
            description: 'Binary search variations and applications',
            path: '/pages/categories/binary-search',
            color: '#B39DDB',
            count: 3,
            icon: <Search sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #B39DDB 0%, #C5AEE4 100%)'
        },
        {
            title: 'Two Pointers',
            description: 'Two pointer technique for array and string problems',
            path: '/pages/categories/two-pointers',
            color: '#FFCC80',
            count: 8,
            icon: <TouchApp sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #FFCC80 0%, #FFD699 100%)'
        },
        {
            title: 'Sliding Window',
            description: 'Sliding window technique for subarray problems',
            path: '/pages/categories/sliding-window',
            color: '#A5D6A7',
            count: 1,
            icon: <Window sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #A5D6A7 0%, #B8E0B9 100%)'
        },
        {
            title: 'Math',
            description: 'Mathematical problems and number theory',
            path: '/pages/categories/math',
            color: '#FFAB91',
            count: 5,
            icon: <Calculate sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #FFAB91 0%, #FFC4A8 100%)'
        },
        {
            title: 'Greedy',
            description: 'Greedy algorithms and optimization strategies',
            path: '/pages/categories/greedy',
            color: '#9FA8DA',
            count: 1,
            icon: <Code sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #9FA8DA 0%, #B3BEE5 100%)'
        },
        {
            title: 'Statistics',
            description: 'Statistical concepts, order statistics, and probability algorithms',
            path: '/pages/categories/statistics',
            color: '#FF7043',
            count: 10,
            icon: <Psychology sx={{ fontSize: 24, color: 'white' }} />,
            gradient: 'linear-gradient(135deg, #FF7043 0%, #FF8A65 100%)'
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
                <Container maxWidth="lg" sx={{ flex: 1, py: 6 }}>
                    {/* Hero Section */}
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 5, 
                            mb: 5, 
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            borderRadius: 4
                        }}
                    >
                        <Typography 
                            variant="h3" 
                            component="h1" 
                            gutterBottom 
                            sx={{ 
                                fontWeight: 700,
                                mb: 2,
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            Algorithm Categories
                        </Typography>
                        <Typography 
                            variant="h6" 
                            component="p" 
                            sx={{ 
                                opacity: 0.9,
                                maxWidth: 600,
                                mx: 'auto',
                                lineHeight: 1.6
                            }}
                        >
                            Master the fundamentals of computer science through our comprehensive collection of algorithm problems. 
                            Choose your path and start your journey to becoming an algorithm expert.
                        </Typography>
                    </Paper>
                    
                    {/* Categories Grid */}
                    <Grid container spacing={3}>
                        {categories.map((category, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card 
                                    sx={{ 
                                        height: '100%',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-6px)',
                                            boxShadow: '0 16px 32px rgba(0,0,0,0.12)',
                                            '& .category-icon': {
                                                transform: 'scale(1.1) rotate(3deg)',
                                            }
                                        }
                                    }}
                                >
                                    <CardActionArea 
                                        component={Link} 
                                        to={category.path}
                                        sx={{ height: '100%', textDecoration: 'none' }}
                                    >
                                        <CardContent sx={{ p: 0, height: '100%' }}>
                                            {/* Header with Icon and Count */}
                                            <Box 
                                                sx={{ 
                                                    p: 3,
                                                    background: category.gradient,
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <Box 
                                                    className="category-icon"
                                                    sx={{ 
                                                        position: 'absolute',
                                                        top: -8,
                                                        right: -8,
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: '50%',
                                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'transform 0.3s ease',
                                                        backdropFilter: 'blur(10px)'
                                                    }}
                                                >
                                                    {category.icon}
                                                </Box>
                                                
                                                <Box sx={{ position: 'relative', zIndex: 1 }}>
                                                    <Typography 
                                                        variant="h5" 
                                                        component="h2" 
                                                        sx={{ 
                                                            fontWeight: 700,
                                                            color: 'white',
                                                            mb: 1,
                                                            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                                        }}
                                                    >
                                                        {category.title}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography 
                                                            variant="h6" 
                                                            component="span" 
                                                            sx={{ 
                                                                fontWeight: 700,
                                                                color: 'white',
                                                                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                                            }}
                                                        >
                                                            {category.count}
                                                        </Typography>
                                                        <Typography 
                                                            variant="body2" 
                                                            sx={{ 
                                                                color: 'rgba(255,255,255,0.9)',
                                                                fontWeight: 500
                                                            }}
                                                        >
                                                            problems
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            
                                            {/* Content */}
                                            <Box sx={{ p: 3 }}>
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary" 
                                                    sx={{ 
                                                        mb: 2,
                                                        lineHeight: 1.5,
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    {category.description}
                                                </Typography>
                                                
                                                <Divider sx={{ my: 2 }} />
                                                
                                                {/* Action Button */}
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <Typography 
                                                        variant="body2" 
                                                        color="text.secondary"
                                                        sx={{ fontWeight: 500 }}
                                                    >
                                                        Start Learning
                                                    </Typography>
                                                    <Box 
                                                        sx={{ 
                                                            width: 28, 
                                                            height: 28, 
                                                            borderRadius: '50%',
                                                            backgroundColor: category.color,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            transition: 'transform 0.2s ease',
                                                            '&:hover': {
                                                                transform: 'scale(1.1)'
                                                            }
                                                        }}
                                                    >
                                                        <ArrowForward sx={{ fontSize: 16, color: 'white' }} />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    
                    {/* Call to Action */}
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 4, 
                            mt: 5, 
                            textAlign: 'center',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            borderRadius: 3
                        }}
                    >
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                            Ready to Master Algorithms?
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                            Choose a category above and start solving problems to improve your algorithmic thinking skills.
                        </Typography>
                        <Button 
                            component={Link}
                            to="/pages/games"
                            variant="contained" 
                            size="large"
                            sx={{ 
                                backgroundColor: 'white',
                                color: 'primary.main',
                                px: 4,
                                py: 1.5,
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.9)'
                                }
                            }}
                        >
                            View All Problems
                        </Button>
                    </Paper>
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default Main;
