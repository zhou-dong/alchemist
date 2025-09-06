import React from 'react';
import { Box, LinearProgress, Typography, Chip } from '@mui/material';
import { useGamification } from '../hooks/useGamification';

interface ProgressBarProps {
  conceptId: string;
  showDetails?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ conceptId, showDetails = false }) => {
  const { state } = useGamification();
  const progress = state.progress.get(conceptId);
  const concept = state.unlockedConcepts.has(conceptId);

  if (!concept) {
    return (
      <Box sx={{ width: '100%', opacity: 0.5 }}>
        <LinearProgress variant="determinate" value={0} />
        <Typography variant="caption" color="text.secondary">
          Locked
        </Typography>
      </Box>
    );
  }

  if (!progress) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="indeterminate" />
        <Typography variant="caption" color="text.secondary">
          Not started
        </Typography>
      </Box>
    );
  }

  const progressPercentage = progress.completed ? 100 : (progress.attempts * 20); // 20% per attempt

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <LinearProgress 
          variant="determinate" 
          value={progressPercentage} 
          sx={{ 
            flexGrow: 1, 
            mr: 1,
            '& .MuiLinearProgress-bar': {
              backgroundColor: progress.completed ? '#4CAF50' : '#2196F3'
            }
          }} 
        />
        {progress.completed && (
          <Chip 
            label="✓" 
            size="small" 
            color="success" 
            sx={{ minWidth: 24, height: 24 }}
          />
        )}
      </Box>
      
      {showDetails && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {progress.completed ? 'Completed' : `${progress.attempts} attempts`}
          </Typography>
          {progress.completed && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Score: {progress.score}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Time: {progress.bestTime}m
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Accuracy: {progress.accuracy}%
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProgressBar;
