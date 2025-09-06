import { TreeLevel } from '../types/gamification';

export const treeLevels: TreeLevel[] = [
  {
    level: 1,
    name: 'Seedling',
    requiredScore: 0,
    unlocked: true,
    rewards: ['Basic tree concepts unlocked'],
    color: '#4CAF50'
  },
  {
    level: 2,
    name: 'Sprout',
    requiredScore: 200,
    unlocked: false,
    rewards: ['Tree traversal concepts unlocked', 'Speed tracking enabled'],
    color: '#8BC34A'
  },
  {
    level: 3,
    name: 'Sapling',
    requiredScore: 500,
    unlocked: false,
    rewards: ['BST concepts unlocked', 'Achievement system enabled'],
    color: '#CDDC39'
  },
  {
    level: 4,
    name: 'Young Tree',
    requiredScore: 900,
    unlocked: false,
    rewards: ['Tree height concepts unlocked', 'Efficiency tracking enabled'],
    color: '#FFEB3B'
  },
  {
    level: 5,
    name: 'Mature Tree',
    requiredScore: 1400,
    unlocked: false,
    rewards: ['Tree diameter concepts unlocked', 'Streak tracking enabled'],
    color: '#FFC107'
  },
  {
    level: 6,
    name: 'Ancient Tree',
    requiredScore: 2000,
    unlocked: false,
    rewards: ['Tree balancing concepts unlocked', 'Advanced analytics enabled'],
    color: '#FF9800'
  },
  {
    level: 7,
    name: 'Forest Guardian',
    requiredScore: 2700,
    unlocked: false,
    rewards: ['LCA concepts unlocked', 'Leaderboard access enabled'],
    color: '#FF5722'
  },
  {
    level: 8,
    name: 'Tree Sage',
    requiredScore: 3500,
    unlocked: false,
    rewards: ['Advanced topics unlocked', 'Master challenges unlocked'],
    color: '#9C27B0'
  },
  {
    level: 9,
    name: 'Tree Deity',
    requiredScore: 4500,
    unlocked: false,
    rewards: ['All concepts mastered', 'Legendary status achieved'],
    color: '#673AB7'
  },
  {
    level: 10,
    name: 'Forest Creator',
    requiredScore: 6000,
    unlocked: false,
    rewards: ['Ultimate mastery', 'Create custom challenges'],
    color: '#E91E63'
  }
];

export const getLevelByNumber = (level: number): TreeLevel | undefined => {
  return treeLevels.find(l => l.level === level);
};

export const getCurrentLevel = (totalScore: number): TreeLevel => {
  const sortedLevels = [...treeLevels].sort((a, b) => b.level - a.level);
  return sortedLevels.find(level => totalScore >= level.requiredScore) || treeLevels[0];
};

export const getNextLevel = (currentLevel: number): TreeLevel | undefined => {
  return treeLevels.find(level => level.level === currentLevel + 1);
};

export const getProgressToNextLevel = (currentScore: number, currentLevel: number): number => {
  const nextLevel = getNextLevel(currentLevel);
  if (!nextLevel) return 100; // Max level reached
  
  const currentLevelData = getLevelByNumber(currentLevel);
  if (!currentLevelData) return 0;
  
  const progress = (currentScore - currentLevelData.requiredScore) / 
                  (nextLevel.requiredScore - currentLevelData.requiredScore);
  return Math.min(100, Math.max(0, progress * 100));
};
