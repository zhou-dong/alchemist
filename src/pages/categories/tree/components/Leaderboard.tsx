import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Tabs,
  Tab,
  LinearProgress,
  Grid
} from '@mui/material';
import { 
  EmojiEvents, 
  TrendingUp, 
  Speed, 
  Psychology,
  Timer
} from '@mui/icons-material';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  level: number;
  completed: number;
  accuracy: number;
  efficiency: number;
  streak: number;
  rank: number;
}

interface LeaderboardProps {
  currentUserId?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentUserId }) => {
  const [tabValue, setTabValue] = useState(0);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, this would come from an API
  const mockData: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'TreeMaster2024',
      avatar: '🌳',
      score: 4500,
      level: 9,
      completed: 8,
      accuracy: 96.5,
      efficiency: 94.2,
      streak: 12,
      rank: 1
    },
    {
      id: '2',
      name: 'BinarySearchPro',
      avatar: '🔍',
      score: 4200,
      level: 8,
      completed: 7,
      accuracy: 94.8,
      efficiency: 91.5,
      streak: 8,
      rank: 2
    },
    {
      id: '3',
      name: 'AlgoWizard',
      avatar: '🧙',
      score: 3800,
      level: 8,
      completed: 6,
      accuracy: 92.1,
      efficiency: 89.3,
      streak: 5,
      rank: 3
    },
    {
      id: '4',
      name: 'DataStructureNinja',
      avatar: '🥷',
      score: 3500,
      level: 7,
      completed: 6,
      accuracy: 90.5,
      efficiency: 87.8,
      streak: 3,
      rank: 4
    },
    {
      id: '5',
      name: 'CodeCrusher',
      avatar: '💪',
      score: 3200,
      level: 7,
      completed: 5,
      accuracy: 88.9,
      efficiency: 85.2,
      streak: 2,
      rank: 5
    }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLeaderboardData(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return '#666';
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 9) return '#9C27B0';
    if (level >= 7) return '#F44336';
    if (level >= 5) return '#FF9800';
    if (level >= 3) return '#4CAF50';
    return '#2196F3';
  };

  const currentUserEntry = currentUserId 
    ? leaderboardData.find(entry => entry.id === currentUserId)
    : null;

  const renderLeaderboardTable = () => (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Player</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right">Completed</TableCell>
            <TableCell align="right">Accuracy</TableCell>
            <TableCell align="right">Efficiency</TableCell>
            <TableCell align="right">Streak</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboardData.map((entry) => (
            <TableRow 
              key={entry.id}
              sx={{ 
                bgcolor: entry.id === currentUserId ? 'action.hover' : 'inherit',
                '&:hover': { bgcolor: 'action.selected' }
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: getRankColor(entry.rank),
                      fontWeight: 'bold',
                      minWidth: 30
                    }}
                  >
                    {getRankIcon(entry.rank)}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: getLevelColor(entry.level), width: 32, height: 32 }}>
                    {entry.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {entry.name}
                    </Typography>
                    {entry.id === currentUserId && (
                      <Chip label="You" size="small" color="primary" />
                    )}
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {entry.score.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Chip 
                  label={entry.level}
                  size="small"
                  sx={{ 
                    bgcolor: getLevelColor(entry.level),
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">
                  {entry.completed}/8
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body2">
                    {entry.accuracy.toFixed(1)}%
                  </Typography>
                  <TrendingUp sx={{ fontSize: 16, color: '#4CAF50' }} />
                </Box>
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body2">
                    {entry.efficiency.toFixed(1)}%
                  </Typography>
                  <Speed sx={{ fontSize: 16, color: '#2196F3' }} />
                </Box>
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body2">
                    {entry.streak}
                  </Typography>
                  <Timer sx={{ fontSize: 16, color: '#FF5722' }} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderStatsOverview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmojiEvents sx={{ mr: 1, color: '#FFD700' }} />
              <Typography variant="h6">Top Performer</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
              {leaderboardData[0]?.name || 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {leaderboardData[0]?.score.toLocaleString() || 0} points
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Psychology sx={{ mr: 1, color: '#9C27B0' }} />
              <Typography variant="h6">Highest Level</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9C27B0' }}>
              {Math.max(...leaderboardData.map(entry => entry.level))}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tree Deity
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Timer sx={{ mr: 1, color: '#FF5722' }} />
              <Typography variant="h6">Longest Streak</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF5722' }}>
              {Math.max(...leaderboardData.map(entry => entry.streak))}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              days
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmojiEvents sx={{ mr: 1, color: '#FFD700' }} />
            <Typography variant="h6">Leaderboard</Typography>
          </Box>
          <LinearProgress />
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Loading leaderboard...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <EmojiEvents sx={{ mr: 1, color: '#FFD700' }} />
          <Typography variant="h6">Leaderboard</Typography>
        </Box>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Rankings" />
          <Tab label="Statistics" />
        </Tabs>

        {tabValue === 0 && renderLeaderboardTable()}
        {tabValue === 1 && renderStatsOverview()}

        {currentUserEntry && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Your Current Status
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">
                Rank #{currentUserEntry.rank} • {currentUserEntry.score.toLocaleString()} points
              </Typography>
              <Chip 
                label={`Level ${currentUserEntry.level}`}
                color="primary"
                variant="outlined"
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
