import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Button,
  LinearProgress,
  Tooltip,
  Badge
} from '@mui/material';
import { 
  Lock, 
  PlayArrow, 
  CheckCircle, 
  Star,
  Timer,
  TrendingUp
} from '@mui/icons-material';
import { useGamification } from '../hooks/useGamification';
import { TreeConcept } from '../types/gamification';
import ProgressBar from './ProgressBar';

interface TreeConceptCardProps {
  concept: TreeConcept;
  onStart: (conceptId: string) => void;
}

const TreeConceptCard: React.FC<TreeConceptCardProps> = ({ concept, onStart }) => {
  const { state } = useGamification();
  const progress = state.progress.get(concept.id);
  const isUnlocked = state.unlockedConcepts.has(concept.id);
  const isCompleted = progress?.completed || false;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      case 'expert': return '#9C27B0';
      default: return '#757575';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '🟢';
      case 'intermediate': return '🟡';
      case 'advanced': return '🟠';
      case 'expert': return '🔴';
      default: return '⚪';
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return '#4CAF50';
    if (percentage >= 70) return '#FF9800';
    if (percentage >= 50) return '#FFC107';
    return '#F44336';
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        position: 'relative',
        transition: 'all 0.3s ease',
        transform: isUnlocked ? 'scale(1)' : 'scale(0.95)',
        opacity: isUnlocked ? 1 : 0.7,
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        '&:hover': isUnlocked ? {
          transform: 'scale(1.02)',
          boxShadow: 4
        } : {},
        background: isCompleted 
          ? 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)'
          : isUnlocked 
            ? 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)'
            : 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)'
      }}
      onClick={() => isUnlocked && onStart(concept.id)}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontSize: 32, mr: 1 }}>
              {concept.emoji}
            </Typography>
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {concept.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                  label={concept.difficulty}
                  size="small"
                  sx={{ 
                    bgcolor: getDifficultyColor(concept.difficulty),
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {getDifficultyIcon(concept.difficulty)}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {isCompleted && (
            <Badge
              badgeContent={<CheckCircle sx={{ fontSize: 16, color: '#4CAF50' }} />}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Star sx={{ fontSize: 24, color: '#FFD700' }} />
            </Badge>
          )}
          
          {!isUnlocked && (
            <Lock sx={{ fontSize: 24, color: '#666' }} />
          )}
        </Box>

        {/* Description */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 2, flexGrow: 1 }}
        >
          {concept.description}
        </Typography>

        {/* Progress */}
        {isUnlocked && (
          <Box sx={{ mb: 2 }}>
            <ProgressBar conceptId={concept.id} showDetails={true} />
          </Box>
        )}

        {/* Stats */}
        {isCompleted && progress && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: 16, color: getScoreColor(progress.score, concept.maxScore) }} />
              <Typography variant="caption" color="text.secondary">
                {progress.score}/{concept.maxScore}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Timer sx={{ fontSize: 16, color: '#2196F3' }} />
              <Typography variant="caption" color="text.secondary">
                {progress.bestTime}m
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUp sx={{ fontSize: 16, color: '#4CAF50' }} />
              <Typography variant="caption" color="text.secondary">
                {progress.accuracy}%
              </Typography>
            </Box>
          </Box>
        )}

        {/* Action Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Timer sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              ~{concept.estimatedTime}m
            </Typography>
          </Box>
          
          {isUnlocked && (
            <Button
              variant={isCompleted ? "outlined" : "contained"}
              color={isCompleted ? "success" : "primary"}
              startIcon={isCompleted ? <CheckCircle /> : <PlayArrow />}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onStart(concept.id);
              }}
            >
              {isCompleted ? 'Review' : 'Start'}
            </Button>
          )}
        </Box>

        {/* Prerequisites */}
        {!isUnlocked && concept.prerequisites.length > 0 && (
          <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Prerequisites:
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              {concept.prerequisites.join(', ')}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TreeConceptCard;
