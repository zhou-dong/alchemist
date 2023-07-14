export interface Step {
    adjacency: Map<number, number[]>;
    current?: number;
    hasCycle: boolean;
    stack: number[];
    visited: number[];
    numCourses: number;
}

const calculateNumCourses = (prerequisites: number[][]): number => {
    let numCourses: number = prerequisites
        .map(array => Math.max(...array))
        .reduce((prev, curr) => Math.max(prev, curr), 0);

    numCourses += 1;
    return numCourses;
}

const buildAdjacency = (numCourses: number, prerequisites: number[][]): Map<number, number[]> => {
    const adjacency: Map<number, number[]> = new Map();
    for (let i = 0; i < numCourses; i++) {
        adjacency.set(i, []);
    }
    prerequisites.forEach(prerequisite => {
        const [a, b] = prerequisite;
        adjacency.get(b)?.push(a);
    });
    return adjacency;
}

export function findOrder(prerequisites: number[][]): Step[] {

    const steps: Step[] = [];

    const numCourses: number = calculateNumCourses(prerequisites);
    const adjacency: Map<number, number[]> = buildAdjacency(numCourses, prerequisites);
    const stack: number[] = [];
    let hasCycle = false;

    const visited: Set<number> = new Set();
    const dfs = (current: number) => {

        const returnEarly: boolean = visited.has(current) || stack.indexOf(current) >= 0;
        if (returnEarly) { // only add new step if return-early to avoid add same node multple times.
            steps.push({ current, adjacency, hasCycle, stack: [...stack], visited: Array.from(visited), numCourses });
        }

        if (visited.has(current)) {
            hasCycle = true;
            return;
        }

        if (stack.indexOf(current) >= 0) {
            return;
        }

        visited.add(current);
        steps.push({ current, adjacency, hasCycle, stack: [...stack], visited: Array.from(visited), numCourses });

        const children = adjacency.get(current) || [];
        for (let i = 0; i < children.length; i++) {
            dfs(children[i]);
            if (hasCycle) {
                return;
            }
        }

        visited.delete(current);
        stack.push(current);
        steps.push({ current, adjacency, hasCycle, stack: [...stack], visited: Array.from(visited), numCourses });
    }

    for (let i = 0; i < numCourses; i++) {
        dfs(i);
        if (hasCycle) {
            steps.push({ current: i, adjacency, hasCycle, stack: [], visited: Array.from(visited), numCourses });
            return steps;
        }
    }

    steps.push({ adjacency, hasCycle, stack: [...stack], visited: Array.from(visited), numCourses });
    return steps;
};
