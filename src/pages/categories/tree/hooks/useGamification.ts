import { useState, useEffect, useCallback } from 'react';
import { GamificationState, TreeProgress, TreeAchievement, TreeStats, TreeLevel } from '../types/gamification';
import { treeConcepts } from '../data/concepts';
import { treeAchievements } from '../data/achievements';
import { treeLevels, getCurrentLevel, getProgressToNextLevel } from '../data/levels';

const GAMIFICATION_STORAGE_KEY = 'tree-gamification-state';

const initialStats: TreeStats = {
  totalScore: 0,
  currentLevel: 1,
  totalCompleted: 0,
  totalAttempts: 0,
  averageAccuracy: 0,
  averageEfficiency: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalTimeSpent: 0
};

const initialGamificationState: GamificationState = {
  progress: new Map(),
  achievements: new Map(),
  stats: initialStats,
  currentLevel: treeLevels[0],
  unlockedConcepts: new Set(['basics-of-trees'])
};

export const useGamification = () => {
  const [state, setState] = useState<GamificationState>(() => {
    const saved = localStorage.getItem(GAMIFICATION_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          progress: new Map(parsed.progress),
          achievements: new Map(parsed.achievements),
          unlockedConcepts: new Set(parsed.unlockedConcepts)
        };
      } catch {
        return initialGamificationState;
      }
    }
    return initialGamificationState;
  });

  // Save to localStorage whenever state changes (excluding level updates)
  useEffect(() => {
    const stateToSave = {
      ...state,
      progress: Array.from(state.progress.entries()),
      achievements: Array.from(state.achievements.entries()),
      unlockedConcepts: Array.from(state.unlockedConcepts)
    };
    localStorage.setItem(GAMIFICATION_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [state.progress, state.achievements, state.stats, state.unlockedConcepts]);

  // Update current level based on total score
  const currentLevel = getCurrentLevel(state.stats.totalScore);
  const levelChanged = currentLevel.level !== state.currentLevel.level;

  const completeConcept = useCallback((
    conceptId: string, 
    score: number, 
    timeSpent: number, 
    accuracy: number, 
    efficiency: number
  ) => {
    setState(prev => {
      const newProgress = new Map(prev.progress);
      const existingProgress = newProgress.get(conceptId);
      
      const newProgressData: TreeProgress = {
        conceptId,
        completed: true,
        score: Math.max(score, existingProgress?.score || 0),
        bestTime: existingProgress ? Math.min(timeSpent, existingProgress.bestTime) : timeSpent,
        attempts: (existingProgress?.attempts || 0) + 1,
        accuracy,
        efficiency,
        completedAt: new Date(),
        unlockedAt: existingProgress?.unlockedAt || new Date()
      };
      
      newProgress.set(conceptId, newProgressData);
      
      // Update stats
      const newStats: TreeStats = {
        ...prev.stats,
        totalScore: prev.stats.totalScore + score,
        totalCompleted: prev.stats.totalCompleted + (existingProgress?.completed ? 0 : 1),
        totalAttempts: prev.stats.totalAttempts + 1,
        averageAccuracy: calculateAverageAccuracy(newProgress),
        averageEfficiency: calculateAverageEfficiency(newProgress),
        currentStreak: calculateCurrentStreak(newProgress),
        longestStreak: Math.max(prev.stats.longestStreak, calculateCurrentStreak(newProgress)),
        totalTimeSpent: prev.stats.totalTimeSpent + timeSpent
      };
      
      // Unlock new concepts
      const newUnlockedConcepts = new Set(prev.unlockedConcepts);
      const concept = treeConcepts.find(c => c.id === conceptId);
      if (concept) {
        concept.prerequisites.forEach(prereq => {
          if (newProgress.get(prereq)?.completed) {
            newUnlockedConcepts.add(conceptId);
          }
        });
      }
      
      // Check and update achievements
      const newAchievements = checkAchievements(newProgress, newStats);
      
      return {
        ...prev,
        progress: newProgress,
        achievements: newAchievements,
        stats: newStats,
        unlockedConcepts: newUnlockedConcepts
      };
    });
  }, []);

  const attemptConcept = useCallback((conceptId: string) => {
    setState(prev => {
      const newProgress = new Map(prev.progress);
      const existingProgress = newProgress.get(conceptId);
      
      if (!existingProgress) {
        newProgress.set(conceptId, {
          conceptId,
          completed: false,
          score: 0,
          bestTime: 0,
          attempts: 1,
          accuracy: 0,
          efficiency: 0,
          unlockedAt: new Date()
        });
      } else {
        newProgress.set(conceptId, {
          ...existingProgress,
          attempts: existingProgress.attempts + 1
        });
      }
      
      return {
        ...prev,
        progress: newProgress,
        stats: {
          ...prev.stats,
          totalAttempts: prev.stats.totalAttempts + 1
        }
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState(initialGamificationState);
    localStorage.removeItem(GAMIFICATION_STORAGE_KEY);
  }, []);

  const getProgressToNextLevelValue = useCallback(() => {
    return getProgressToNextLevel(state.stats.totalScore, currentLevel.level);
  }, [state.stats.totalScore, currentLevel.level]);

  return {
    state: {
      ...state,
      currentLevel
    },
    completeConcept,
    attemptConcept,
    resetProgress,
    getProgressToNextLevel: getProgressToNextLevelValue
  };
};

// Helper functions
const calculateAverageAccuracy = (progress: Map<string, TreeProgress>): number => {
  const completedConcepts = Array.from(progress.values()).filter(p => p.completed);
  if (completedConcepts.length === 0) return 0;
  
  const totalAccuracy = completedConcepts.reduce((sum, p) => sum + p.accuracy, 0);
  return totalAccuracy / completedConcepts.length;
};

const calculateAverageEfficiency = (progress: Map<string, TreeProgress>): number => {
  const completedConcepts = Array.from(progress.values()).filter(p => p.completed);
  if (completedConcepts.length === 0) return 0;
  
  const totalEfficiency = completedConcepts.reduce((sum, p) => sum + p.efficiency, 0);
  return totalEfficiency / completedConcepts.length;
};

const calculateCurrentStreak = (progress: Map<string, TreeProgress>): number => {
  const completedConcepts = Array.from(progress.values())
    .filter(p => p.completed)
    .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));
  
  let streak = 0;
  for (const concept of completedConcepts) {
    if (concept.completedAt) {
      const daysSinceCompletion = Math.floor(
        (Date.now() - concept.completedAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceCompletion <= 1) {
        streak++;
      } else {
        break;
      }
    }
  }
  
  return streak;
};

const checkAchievements = (
  progress: Map<string, TreeProgress>, 
  stats: TreeStats
): Map<string, TreeAchievement> => {
  const newAchievements = new Map();
  
  treeAchievements.forEach(achievement => {
    let progressValue = 0;
    let shouldUnlock = false;
    
    switch (achievement.id) {
      case 'first-steps':
        progressValue = stats.totalCompleted >= 1 ? 1 : 0;
        shouldUnlock = stats.totalCompleted >= 1;
        break;
      case 'tree-master':
        progressValue = Math.min(stats.totalCompleted, 8);
        shouldUnlock = stats.totalCompleted >= 8;
        break;
      case 'traversal-expert':
        const traversalConcepts = ['tree-traversals'];
        progressValue = traversalConcepts.filter(id => progress.get(id)?.completed).length;
        shouldUnlock = progressValue >= 1;
        break;
      case 'bst-specialist':
        const bstConcepts = ['binary-search-tree'];
        progressValue = bstConcepts.filter(id => progress.get(id)?.completed).length;
        shouldUnlock = progressValue >= 1;
        break;
      case 'speed-demon':
        const fastCompletions = Array.from(progress.values())
          .filter(p => p.completed && p.bestTime < 5).length;
        progressValue = fastCompletions >= 1 ? 1 : 0;
        shouldUnlock = fastCompletions >= 1;
        break;
      case 'lightning-fast':
        const veryFastCompletions = Array.from(progress.values())
          .filter(p => p.completed && p.bestTime < 10).length;
        progressValue = Math.min(veryFastCompletions, 5);
        shouldUnlock = veryFastCompletions >= 5;
        break;
      case 'perfectionist':
        const perfectCompletions = Array.from(progress.values())
          .filter(p => p.completed && p.accuracy >= 100).length;
        progressValue = perfectCompletions >= 1 ? 1 : 0;
        shouldUnlock = perfectCompletions >= 1;
        break;
      case 'consistently-accurate':
        const accurateConcepts = Array.from(progress.values())
          .filter(p => p.completed && p.accuracy >= 90).length;
        progressValue = Math.min(accurateConcepts, 5);
        shouldUnlock = accurateConcepts >= 5;
        break;
      case 'efficient-solver':
        const efficientCompletions = Array.from(progress.values())
          .filter(p => p.completed && p.efficiency >= 95).length;
        progressValue = efficientCompletions >= 1 ? 1 : 0;
        shouldUnlock = efficientCompletions >= 1;
        break;
      case 'optimization-master':
        const veryEfficientCompletions = Array.from(progress.values())
          .filter(p => p.completed && p.efficiency >= 90).length;
        progressValue = Math.min(veryEfficientCompletions, 3);
        shouldUnlock = veryEfficientCompletions >= 3;
        break;
      case 'dedicated-learner':
        progressValue = Math.min(stats.currentStreak, 3);
        shouldUnlock = stats.currentStreak >= 3;
        break;
      case 'unstoppable':
        progressValue = Math.min(stats.currentStreak, 7);
        shouldUnlock = stats.currentStreak >= 7;
        break;
      case 'early-bird':
        const earlyCompletions = Array.from(progress.values())
          .filter(p => p.completed && p.bestTime < 15).length; // Assuming 15 min estimated time
        progressValue = earlyCompletions >= 1 ? 1 : 0;
        shouldUnlock = earlyCompletions >= 1;
        break;
      case 'persistent-learner':
        const persistentConcepts = Array.from(progress.values())
          .filter(p => p.attempts >= 5 && p.completed).length;
        progressValue = persistentConcepts >= 1 ? 1 : 0;
        shouldUnlock = persistentConcepts >= 1;
        break;
      case 'tree-whisperer':
        const advancedConcepts = ['tree-balancing', 'advanced-topics'];
        progressValue = advancedConcepts.filter(id => progress.get(id)?.completed).length;
        shouldUnlock = progressValue >= 2;
        break;
    }
    
    newAchievements.set(achievement.id, {
      ...achievement,
      unlocked: shouldUnlock,
      progress: progressValue,
      unlockedAt: shouldUnlock && !achievement.unlocked ? new Date() : achievement.unlockedAt
    });
  });
  
  return newAchievements;
};
