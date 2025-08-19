import { Link as RouterLink } from "react-router-dom";
import { Paper, CardActionArea, Grid, Typography, Box, Chip } from "@mui/material";
import {
    Functions,
    AccountTree,
    DataObject,
    TrendingUp,
    Sort,
    Queue,
    Storage,
    Search,
    TouchApp,
    Window,
    Calculate,
    Code,
    Psychology,
    PlayArrow
} from "@mui/icons-material";
import { useGames } from "../../games/commons/GamesContext";

interface Props {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

interface AlgorithmProps extends Props {
    title: string;
    path: string;
    difficulty?: string;
    category?: string;
}

// Function to get category icon and color based on title or path
const getCategoryInfo = (title: string, path: string) => {
    const lowerTitle = title.toLowerCase();
    const lowerPath = path.toLowerCase();

    if (lowerTitle.includes('sort') || lowerPath.includes('sort')) {
        return {
            icon: <Sort sx={{ fontSize: 18, color: '#D4A017' }} />,
            color: '#FFF3E0',
            category: 'Sorting'
        };
    }
    if (lowerTitle.includes('tree') || lowerPath.includes('tree') || lowerTitle.includes('bst') || lowerTitle.includes('binary')) {
        return {
            icon: <AccountTree sx={{ fontSize: 18, color: '#2E7D32' }} />,
            color: '#E8F5E8',
            category: 'Tree'
        };
    }
    if (lowerTitle.includes('linked') || lowerTitle.includes('list') || lowerPath.includes('linked')) {
        return {
            icon: <DataObject sx={{ fontSize: 18, color: '#1976D2' }} />,
            color: '#E3F2FD',
            category: 'Linked List'
        };
    }
    if (lowerTitle.includes('graph') || lowerPath.includes('graph') || lowerTitle.includes('island') || lowerTitle.includes('course')) {
        return {
            icon: <TrendingUp sx={{ fontSize: 18, color: '#388E3C' }} />,
            color: '#E8F5E8',
            category: 'Graph'
        };
    }
    if (lowerTitle.includes('stack') || lowerTitle.includes('queue') || lowerPath.includes('stack') || lowerPath.includes('queue')) {
        return {
            icon: <Queue sx={{ fontSize: 18, color: '#7B1FA2' }} />,
            color: '#F3E5F5',
            category: 'Stack & Queue'
        };
    }
    if (lowerTitle.includes('hash') || lowerTitle.includes('lru') || lowerTitle.includes('two sum') || lowerPath.includes('hash')) {
        return {
            icon: <Storage sx={{ fontSize: 18, color: '#C2185B' }} />,
            color: '#FCE4EC',
            category: 'Hash Table'
        };
    }
    if (lowerTitle.includes('binary search') || lowerTitle.includes('sqrt') || lowerPath.includes('binary')) {
        return {
            icon: <Search sx={{ fontSize: 18, color: '#5E35B1' }} />,
            color: '#EDE7F6',
            category: 'Binary Search'
        };
    }
    if (lowerTitle.includes('pointer') || lowerTitle.includes('window') || lowerPath.includes('pointer')) {
        return {
            icon: <TouchApp sx={{ fontSize: 18, color: '#F57C00' }} />,
            color: '#FFF3E0',
            category: 'Two Pointers'
        };
    }
    if (lowerTitle.includes('sliding') || lowerPath.includes('sliding')) {
        return {
            icon: <Window sx={{ fontSize: 18, color: '#388E3C' }} />,
            color: '#E8F5E8',
            category: 'Sliding Window'
        };
    }
    if (lowerTitle.includes('math') || lowerTitle.includes('roman') || lowerTitle.includes('palindrome') || lowerTitle.includes('integer')) {
        return {
            icon: <Calculate sx={{ fontSize: 18, color: '#D84315' }} />,
            color: '#FBE9E7',
            category: 'Math'
        };
    }
    if (lowerTitle.includes('greedy') || lowerPath.includes('greedy')) {
        return {
            icon: <Code sx={{ fontSize: 18, color: '#3949AB' }} />,
            color: '#E8EAF6',
            category: 'Greedy'
        };
    }
    if (lowerTitle.includes('median') || lowerTitle.includes('kth') || lowerTitle.includes('top k') || lowerTitle.includes('frequency')) {
        return {
            icon: <Psychology sx={{ fontSize: 18, color: '#E64A19' }} />,
            color: '#FBE9E7',
            category: 'Statistics'
        };
    }
    // Default to Dynamic Programming for most other cases
    return {
        icon: <Functions sx={{ fontSize: 18, color: '#D32F2F' }} />,
        color: '#FFEBEE',
        category: 'DP'
    };
};

// Function to estimate difficulty based on title
const getDifficulty = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('easy') || lowerTitle.includes('simple') || lowerTitle.includes('basic')) {
        return { level: 'Easy', color: '#4CAF50' };
    }
    if (lowerTitle.includes('hard') || lowerTitle.includes('complex') || lowerTitle.includes('advanced')) {
        return { level: 'Hard', color: '#F44336' };
    }
    return { level: 'Medium', color: '#FF9800' };
};

const Algorithm = ({ title, path, xs, sm, md, lg, xl }: AlgorithmProps) => {
    const categoryInfo = getCategoryInfo(title, path);
    const difficulty = getDifficulty(title);

    return (
        <Grid
            item
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
        >
            <Paper
                elevation={1}
                sx={{
                    borderRadius: 2,
                    height: '100%',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        elevation: 4,
                    }
                }}
            >
                <CardActionArea component={RouterLink} to={path} sx={{ height: '100%' }}>
                    <Box sx={{ p: 3.5, height: '100%' }}>
                        {/* Header with Icon and Category */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 3
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box 
                                    sx={{ 
                                        width: 40, 
                                        height: 40, 
                                        borderRadius: '50%',
                                        backgroundColor: categoryInfo.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0.9
                                    }}
                                >
                                    {categoryInfo.icon}
                                </Box>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: 'text.secondary',
                                        fontWeight: 500,
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    {categoryInfo.category}
                                </Typography>
                            </Box>
                            
                            <Chip 
                                label={difficulty.level}
                                size="small"
                                sx={{ 
                                    backgroundColor: difficulty.color,
                                    color: 'white',
                                    fontWeight: 500,
                                    fontSize: '0.75rem',
                                    height: 24
                                }}
                            />
                        </Box>
                        
                        {/* Title */}
                        <Typography 
                            variant="h5" 
                            component="h3" 
                            sx={{ 
                                fontWeight: 600,
                                color: 'text.primary',
                                lineHeight: 1.3,
                                fontSize: '1.1rem',
                                mb: 2.5
                            }}
                        >
                            {title}
                        </Typography>
                        
                        {/* Action Button */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between'
                        }}>
                            <Typography 
                                variant="body1" 
                                color="text.secondary" 
                                sx={{ 
                                    fontSize: '0.9rem',
                                    opacity: 0.8
                                }}
                            >
                                Click to start solving
                            </Typography>
                            <Box 
                                sx={{ 
                                    width: 28, 
                                    height: 28, 
                                    borderRadius: '50%',
                                    backgroundColor: categoryInfo.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'transform 0.2s ease',
                                    opacity: 0.8,
                                    '&:hover': {
                                        transform: 'scale(1.1)'
                                    }
                                }}
                            >
                                <PlayArrow sx={{ fontSize: 16, color: 'text.primary' }} />
                            </Box>
                        </Box>
                    </Box>
                </CardActionArea>
            </Paper>
        </Grid>
    );
};

const Sorting = ({ xs, sm, md, lg, xl }: Props) => {
    const { games } = useGames();

    return (
        <Grid container spacing={2}>
            {games.map((game, index) => (
                <Algorithm
                    key={index}
                    title={game.name}
                    path={game.path}
                    xs={xs}
                    sm={sm}
                    md={md}
                    lg={lg}
                    xl={xl}
                />
            ))}
        </Grid>
    );
};

export default Sorting;
