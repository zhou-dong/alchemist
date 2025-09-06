import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  LinearProgress,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import { 
  EmojiEvents, 
  Speed, 
  GpsFixed, 
  TrendingUp, 
  Timer,
  Psychology
} from '@mui/icons-material';
import { useGamification } from '../hooks/useGamification';

const StatsPanel: React.FC = () => {
  const { state, getProgressToNextLevel } = useGamification();
  const { stats, currentLevel } = state;
  const progressToNext = getProgressToNextLevel() || 0;

  const statItems = [
    {
      icon: <EmojiEvents sx={{ fontSize: 20 }} />,
      label: 'Total Score',
      value: stats.totalScore.toLocaleString(),
      color: '#FFD700'
    },
    {
      icon: <Psychology sx={{ fontSize: 20 }} />,
      label: 'Level',
      value: `${currentLevel.name} (${currentLevel.level})`,
      color: currentLevel.color
    },
    {
      icon: <TrendingUp sx={{ fontSize: 20 }} />,
      label: 'Completed',
      value: `${stats.totalCompleted}/8`,
      color: '#4CAF50'
    },
    {
      icon: <Speed sx={{ fontSize: 20 }} />,
      label: 'Avg Accuracy',
      value: `${stats.averageAccuracy.toFixed(1)}%`,
      color: '#2196F3'
    },
    {
      icon: <GpsFixed sx={{ fontSize: 20 }} />,
      label: 'Avg Efficiency',
      value: `${stats.averageEfficiency.toFixed(1)}%`,
      color: '#9C27B0'
    },
    {
      icon: <Timer sx={{ fontSize: 20 }} />,
      label: 'Current Streak',
      value: `${stats.currentStreak} days`,
      color: '#FF5722'
    }
  ];

  return (
    <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: currentLevel.color, mr: 2 }}>
            {currentLevel.level}
          </Avatar>
          <Box>
            <Typography variant="h6" component="div">
              {currentLevel.name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {stats.totalScore.toLocaleString()} points
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Progress to Next Level</Typography>
            <Typography variant="body2">{Number(progressToNext).toFixed(1)}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progressToNext} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#FFD700'
              }
            }} 
          />
        </Box>

        <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />

        <Grid container spacing={2}>
          {statItems.map((item, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ color: item.color, mr: 1 }}>
                  {item.icon}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {item.label}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: item.color, fontWeight: 'bold' }}>
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {stats.longestStreak > 0 && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Chip 
              label={`Longest Streak: ${stats.longestStreak} days`}
              color="secondary"
              variant="outlined"
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
