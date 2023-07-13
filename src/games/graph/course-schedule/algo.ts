export interface Step {
    visited: number[];
    current?: number;
    canFinish?: boolean;
}

const calculateNumCourses = (prerequisites: number[][]): number => {
    let numCourses: number = prerequisites
        .map(array => Math.max(...array))
        .reduce((prev, curr) => Math.max(prev, curr), 0);

    numCourses += 1;
    return numCourses;
}

export function canFinish(prerequisites: number[][]): Step[] {

    let numCourses: number = calculateNumCourses(prerequisites);

    const steps: Step[] = [];

    const adjacency: Map<number, number[]> = new Map();

    for (let i = 0; i < numCourses; i++) {
        adjacency.set(i, []);
    }

    prerequisites.forEach(prerequisite => {
        const [a, b] = prerequisite;
        adjacency.get(b)?.push(a);
    });

    const visited: Set<number> = new Set();

    const dfs = (current: number): boolean => {

        const returnEarly: boolean = visited.has(current) || adjacency.get(current)!.length === 0;
        if (returnEarly) { // only add new step if return-early to avoid add same node multple times.
            steps.push({ visited: Array.from(visited), current });
        }

        if (visited.has(current)) {
            return false;
        }

        if (adjacency.get(current)!.length === 0) {
            return true;
        }

        visited.add(current);
        steps.push({ visited: Array.from(visited), current });

        const children = adjacency.get(current)!;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (!dfs(child)) {
                return false;
            }
        }

        visited.delete(current);
        adjacency.set(current, []);
        steps.push({ visited: Array.from(visited), current });
        return true;
    }

    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) {
            steps.push({ visited: Array.from(visited), current: i, canFinish: false });
            return steps;
        }
    }

    steps.push({ visited: Array.from(visited), canFinish: true });

    return steps;
};
