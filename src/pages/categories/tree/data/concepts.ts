import { TreeConcept } from '../types/gamification';

export const treeConcepts: TreeConcept[] = [
  {
    id: 'basics-of-trees',
    name: 'Basics of Trees',
    description: 'Learn the fundamental concepts of tree data structures',
    emoji: '🌳',
    difficulty: 'beginner',
    prerequisites: [],
    estimatedTime: 15,
    maxScore: 100,
    games: []
  },
  {
    id: 'tree-traversals',
    name: 'Tree Traversals',
    description: 'Master inorder, preorder, and postorder traversals',
    emoji: '🔄',
    difficulty: 'beginner',
    prerequisites: ['basics-of-trees'],
    estimatedTime: 25,
    maxScore: 150,
    games: [
      '/algorithms/binary-tree-inorder-traversal',
      '/algorithms/binary-tree-preorder-traversal',
      '/algorithms/binary-tree-postorder-traversal'
    ]
  },
  {
    id: 'binary-search-tree',
    name: 'Binary Search Tree',
    description: 'Understand BST properties and operations',
    emoji: '🔍',
    difficulty: 'intermediate',
    prerequisites: ['tree-traversals'],
    estimatedTime: 30,
    maxScore: 200,
    games: [
      '/algorithms/validate-binary-search-tree',
      '/algorithms/convert-sorted-array-to-binary-search-tree',
      '/algorithms/kth-smallest-element-in-a-bst'
    ]
  },
  {
    id: 'tree-height',
    name: 'Tree Height',
    description: 'Calculate and understand tree height concepts',
    emoji: '📏',
    difficulty: 'beginner',
    prerequisites: ['basics-of-trees'],
    estimatedTime: 20,
    maxScore: 120,
    games: [
      '/algorithms/maximum-depth-of-binary-tree',
      '/algorithms/minimum-depth-of-binary-tree'
    ]
  },
  {
    id: 'tree-diameter',
    name: 'Tree Diameter',
    description: 'Find the longest path between any two nodes',
    emoji: '📐',
    difficulty: 'intermediate',
    prerequisites: ['tree-height'],
    estimatedTime: 25,
    maxScore: 180,
    games: []
  },
  {
    id: 'tree-balancing',
    name: 'Tree Balancing',
    description: 'Learn about balanced trees and AVL concepts',
    emoji: '⚖️',
    difficulty: 'advanced',
    prerequisites: ['binary-search-tree', 'tree-height'],
    estimatedTime: 35,
    maxScore: 250,
    games: [
      '/algorithms/balanced-binary-tree'
    ]
  },
  {
    id: 'lowest-common-ancestor',
    name: 'Lowest Common Ancestor',
    description: 'Find the LCA of two nodes in a tree',
    emoji: '👥',
    difficulty: 'intermediate',
    prerequisites: ['tree-traversals'],
    estimatedTime: 30,
    maxScore: 200,
    games: [
      '/algorithms/lowest-common-ancestor-of-a-binary-tree',
      '/algorithms/lowest-common-ancestor-of-a-binary-search-tree'
    ]
  },
  {
    id: 'advanced-topics',
    name: 'Advanced Topics',
    description: 'Complex tree algorithms and data structures',
    emoji: '🚀',
    difficulty: 'expert',
    prerequisites: ['tree-balancing', 'lowest-common-ancestor'],
    estimatedTime: 45,
    maxScore: 300,
    games: [
      '/algorithms/serialize-and-deserialize-binary-tree',
      '/algorithms/construct-binary-tree-from-preorder-and-inorder-traversal',
      '/algorithms/construct-binary-tree-from-inorder-and-postorder-traversal'
    ]
  }
];

export const getConceptById = (id: string): TreeConcept | undefined => {
  return treeConcepts.find(concept => concept.id === id);
};

export const getConceptsByDifficulty = (difficulty: string): TreeConcept[] => {
  return treeConcepts.filter(concept => concept.difficulty === difficulty);
};

export const getUnlockedConcepts = (completedConcepts: string[]): TreeConcept[] => {
  return treeConcepts.filter(concept => 
    concept.prerequisites.every(prereq => completedConcepts.includes(prereq))
  );
};
