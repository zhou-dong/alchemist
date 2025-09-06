import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Tabs, 
  Tab, 
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { Close, EmojiEvents } from '@mui/icons-material';
import { useGamification } from '../hooks/useGamification';
import AchievementBadge from './AchievementBadge';
import { getAchievementsByCategory } from '../data/achievements';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`achievement-tabpanel-${index}`}
      aria-labelledby={`achievement-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

const AchievementPanel: React.FC = () => {
  const { state } = useGamification();
  const [tabValue, setTabValue] = useState(0);
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);

  const categories = [
    { id: 'completion', label: 'Completion', icon: '🏆' },
    { id: 'speed', label: 'Speed', icon: '⚡' },
    { id: 'accuracy', label: 'Accuracy', icon: '🎯' },
    { id: 'efficiency', label: 'Efficiency', icon: '⚙️' },
    { id: 'streak', label: 'Streak', icon: '🔥' },
    { id: 'special', label: 'Special', icon: '⭐' }
  ];

  const unlockedAchievements = Array.from(state.achievements.values()).filter(a => a.unlocked);
  const totalAchievements = state.achievements.size;
  const unlockedCount = unlockedAchievements.length;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAchievementClick = (achievementId: string) => {
    setSelectedAchievement(achievementId);
  };

  const selectedAchievementData = selectedAchievement 
    ? state.achievements.get(selectedAchievement)
    : null;

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmojiEvents sx={{ mr: 1, color: '#FFD700' }} />
            <Typography variant="h6" component="div">
              Achievements
            </Typography>
            <Chip 
              label={`${unlockedCount}/${totalAchievements}`}
              color="primary"
              size="small"
              sx={{ ml: 2 }}
            />
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
              {categories.map((category, index) => (
                <Tab 
                  key={category.id}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <span>{category.icon}</span>
                      <span>{category.label}</span>
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>

          {categories.map((category, index) => (
            <TabPanel key={category.id} value={tabValue} index={index}>
              <Grid container spacing={2}>
                {getAchievementsByCategory(category.id).map(achievement => {
                  const achievementData = state.achievements.get(achievement.id) || achievement;
                  return (
                    <Grid item xs={6} sm={4} md={3} key={achievement.id}>
                      <Box onClick={() => handleAchievementClick(achievement.id)}>
                        <AchievementBadge 
                          achievement={achievementData} 
                          size="medium"
                          showProgress={true}
                        />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </TabPanel>
          ))}
        </CardContent>
      </Card>

      <Dialog 
        open={!!selectedAchievement} 
        onClose={() => setSelectedAchievement(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontSize: 24, mr: 1 }}>
              {selectedAchievementData?.icon}
            </Typography>
            <Typography variant="h6">
              {selectedAchievementData?.name}
            </Typography>
          </Box>
          <IconButton onClick={() => setSelectedAchievement(null)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedAchievementData?.description}
          </Typography>
          {selectedAchievementData && !selectedAchievementData.unlocked && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Progress: {selectedAchievementData.progress}/{selectedAchievementData.maxProgress}
              </Typography>
              <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, height: 8 }}>
                <Box 
                  sx={{ 
                    width: `${(selectedAchievementData.progress / selectedAchievementData.maxProgress) * 100}%`,
                    bgcolor: 'primary.main',
                    height: '100%',
                    borderRadius: 1,
                    transition: 'width 0.3s ease'
                  }}
                />
              </Box>
            </Box>
          )}
          {selectedAchievementData?.unlocked && selectedAchievementData.unlockedAt && (
            <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
              Unlocked on {selectedAchievementData.unlockedAt.toLocaleDateString()}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedAchievement(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AchievementPanel;
