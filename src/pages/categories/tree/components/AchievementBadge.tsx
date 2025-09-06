import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip,
  LinearProgress,
  Tooltip,
  Badge
} from '@mui/material';
import { EmojiEvents, Lock } from '@mui/icons-material';
import { TreeAchievement } from '../types/gamification';

interface AchievementBadgeProps {
  achievement: TreeAchievement;
  size?: 'small' | 'medium' | 'large';
  showProgress?: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  achievement, 
  size = 'medium',
  showProgress = true 
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: 80, height: 80 };
      case 'large':
        return { width: 120, height: 120 };
      default:
        return { width: 100, height: 100 };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      default:
        return 32;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'caption';
      case 'large':
        return 'body1';
      default:
        return 'body2';
    }
  };

  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <Tooltip 
      title={
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {achievement.name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {achievement.description}
          </Typography>
          {!achievement.unlocked && showProgress && (
            <Box>
              <Typography variant="caption">
                Progress: {achievement.progress}/{achievement.maxProgress}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={progressPercentage} 
                sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
              />
            </Box>
          )}
        </Box>
      }
      arrow
    >
      <Card 
        sx={{ 
          ...getSizeStyles(),
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: achievement.unlocked ? 'scale(1)' : 'scale(0.9)',
          opacity: achievement.unlocked ? 1 : 0.7,
          background: achievement.unlocked 
            ? 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)'
            : 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
          '&:hover': {
            transform: achievement.unlocked ? 'scale(1.05)' : 'scale(0.95)',
            boxShadow: achievement.unlocked ? 4 : 1
          }
        }}
      >
        <CardContent 
          sx={{ 
            p: 1, 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          {achievement.unlocked ? (
            <Badge
              badgeContent={<EmojiEvents sx={{ fontSize: 12, color: '#FFD700' }} />}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Typography 
                sx={{ 
                  fontSize: getIconSize(),
                  mb: 0.5,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}
              >
                {achievement.icon}
              </Typography>
            </Badge>
          ) : (
            <Box sx={{ position: 'relative' }}>
              <Typography 
                sx={{ 
                  fontSize: getIconSize(),
                  mb: 0.5,
                  opacity: 0.5
                }}
              >
                {achievement.icon}
              </Typography>
              <Lock 
                sx={{ 
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  fontSize: 16,
                  color: '#666'
                }}
              />
            </Box>
          )}
          
          <Typography 
            variant={getTextSize() as any}
            sx={{ 
              fontWeight: 'bold',
              color: achievement.unlocked ? '#333' : '#666',
              lineHeight: 1.2,
              wordBreak: 'break-word'
            }}
          >
            {achievement.name}
          </Typography>
          
          {achievement.unlocked && achievement.unlockedAt && (
            <Chip 
              label="NEW" 
              size="small" 
              color="success" 
              sx={{ 
                position: 'absolute',
                top: 4,
                left: 4,
                fontSize: '0.6rem',
                height: 16
              }}
            />
          )}
        </CardContent>
      </Card>
    </Tooltip>
  );
};

export default AchievementBadge;
