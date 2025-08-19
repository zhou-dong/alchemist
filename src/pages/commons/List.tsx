import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, CardActionArea, Grid, Typography, Box, Chip } from "@mui/material";
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
    PlayArrow,
    SentimentVerySatisfied,
    SentimentSatisfied,
    SentimentVeryDissatisfied
} from "@mui/icons-material";
import { useGames } from "../../games/commons/GamesContext";
import React from "react";

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
        category: 'Dynamic Programming'
    };
};

// Function to get difficulty styling
const getDifficulty = (difficulty?: string) => {
    const difficultyMap = {
        easy: {
            level: 'Easy',
            color: '#4CAF50',
            icon: <SentimentVerySatisfied sx={{ fontSize: "20px" }} style={{ color: '#4CAF50' }} />
        },
        medium: {
            level: 'Medium',
            color: '#FF9800',
            icon: <SentimentSatisfied sx={{ fontSize: "20px" }} style={{ color: '#FF9800' }} />
        },
        hard: {
            level: 'Hard',
            color: '#F44336',
            icon: <SentimentVeryDissatisfied sx={{ fontSize: "20px" }} style={{ color: '#F44336' }} />
        }
    };

    return difficultyMap[difficulty?.toLocaleLowerCase() as keyof typeof difficultyMap] || difficultyMap.medium;
};

const Algorithm = ({ title, path, xs, sm, md, lg, xl, difficulty }: AlgorithmProps) => {
    const categoryInfo = getCategoryInfo(title, path);
    const difficultyInfo = getDifficulty(difficulty);

    return (
        <Grid
            item
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
        >
            <Card
                sx={{
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    border: '1px solid #e0e0e0',
                    boxShadow: 'none',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        border: '1px solid #e0e0e0'
                    }
                }}
            >
                <CardActionArea
                    component={RouterLink}
                    to={path}
                    sx={{ height: '100%', textDecoration: 'none' }}
                >
                    <CardContent sx={{ p: 3, height: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                                {title}
                            </Typography>
                        </Box>
                        <Box component="div" sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0.9
                                    }}
                                >
                                    {React.cloneElement(categoryInfo.icon, { fontSize: "12px" })}
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {categoryInfo.category}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0.9
                                    }}
                                >
                                    {difficultyInfo.icon}
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {difficultyInfo.level}
                                </Typography>
                            </Box>
                            <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }}>
                                Start solving →
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

const Sorting = ({ xs, sm, md, lg, xl }: Props) => {
    const { games } = useGames();

    return (
        <Grid container spacing={3}>
            {games.map((game, index) => (
                <Algorithm
                    key={index}
                    title={game.name}
                    path={game.path}
                    difficulty={game.difficulty}
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
