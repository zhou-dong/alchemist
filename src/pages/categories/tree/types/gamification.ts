export interface TreeProgress {
  conceptId: string;
  completed: boolean;
  score: number;
  bestTime: number;
  attempts: number;
  accuracy: number;
  efficiency: number;
  completedAt?: Date;
  unlockedAt: Date;
}

export interface TreeAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  category: 'completion' | 'speed' | 'accuracy' | 'efficiency' | 'streak' | 'special';
}

export interface TreeLevel {
  level: number;
  name: string;
  requiredScore: number;
  unlocked: boolean;
  rewards: string[];
  color: string;
}

export interface TreeStats {
  totalScore: number;
  currentLevel: number;
  totalCompleted: number;
  totalAttempts: number;
  averageAccuracy: number;
  averageEfficiency: number;
  currentStreak: number;
  longestStreak: number;
  totalTimeSpent: number; // in minutes
}

export interface TreeConcept {
  id: string;
  name: string;
  description: string;
  emoji: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  prerequisites: string[];
  estimatedTime: number; // in minutes
  maxScore: number;
  games: string[]; // game paths
}

export interface GamificationState {
  progress: Map<string, TreeProgress>;
  achievements: Map<string, TreeAchievement>;
  stats: TreeStats;
  currentLevel: TreeLevel;
  unlockedConcepts: Set<string>;
}
