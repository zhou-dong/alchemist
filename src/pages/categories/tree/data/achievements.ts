import { TreeAchievement } from '../types/gamification';

export const treeAchievements: TreeAchievement[] = [
  // Completion achievements
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first tree concept',
    icon: '👶',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'completion'
  },
  {
    id: 'tree-master',
    name: 'Tree Master',
    description: 'Complete all tree concepts',
    icon: '👑',
    unlocked: false,
    progress: 0,
    maxProgress: 8,
    category: 'completion'
  },
  {
    id: 'traversal-expert',
    name: 'Traversal Expert',
    description: 'Complete all tree traversal concepts',
    icon: '🔄',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: 'completion'
  },
  {
    id: 'bst-specialist',
    name: 'BST Specialist',
    description: 'Master all Binary Search Tree concepts',
    icon: '🔍',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: 'completion'
  },

  // Speed achievements
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete a concept in under 5 minutes',
    icon: '⚡',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'speed'
  },
  {
    id: 'lightning-fast',
    name: 'Lightning Fast',
    description: 'Complete 5 concepts in under 10 minutes each',
    icon: '⚡⚡',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: 'speed'
  },

  // Accuracy achievements
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Achieve 100% accuracy on a concept',
    icon: '💯',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'accuracy'
  },
  {
    id: 'consistently-accurate',
    name: 'Consistently Accurate',
    description: 'Maintain 90%+ accuracy across 5 concepts',
    icon: '🎯',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: 'accuracy'
  },

  // Efficiency achievements
  {
    id: 'efficient-solver',
    name: 'Efficient Solver',
    description: 'Achieve 95%+ efficiency on a concept',
    icon: '⚙️',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'efficiency'
  },
  {
    id: 'optimization-master',
    name: 'Optimization Master',
    description: 'Achieve 90%+ efficiency on 3 concepts',
    icon: '🔧',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: 'efficiency'
  },

  // Streak achievements
  {
    id: 'dedicated-learner',
    name: 'Dedicated Learner',
    description: 'Complete 3 concepts in a row',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: 'streak'
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Complete 7 concepts in a row',
    icon: '🔥🔥🔥',
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    category: 'streak'
  },

  // Special achievements
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete a concept before the estimated time',
    icon: '🐦',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'special'
  },
  {
    id: 'persistent-learner',
    name: 'Persistent Learner',
    description: 'Attempt a concept 5 times before completing it',
    icon: '💪',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'special'
  },
  {
    id: 'tree-whisperer',
    name: 'Tree Whisperer',
    description: 'Complete all advanced and expert concepts',
    icon: '🌲',
    unlocked: false,
    progress: 0,
    maxProgress: 2,
    category: 'special'
  }
];

export const getAchievementsByCategory = (category: string): TreeAchievement[] => {
  return treeAchievements.filter(achievement => achievement.category === category);
};

export const getUnlockedAchievements = (): TreeAchievement[] => {
  return treeAchievements.filter(achievement => achievement.unlocked);
};

export const getAchievementById = (id: string): TreeAchievement | undefined => {
  return treeAchievements.find(achievement => achievement.id === id);
};
