export const title = "Course Schedule";

export const formula = `function canFinish(numCourses: number, prerequisites: number[][]): boolean {

    const adjacency: Map<number, number[]> = new Map();

    for (let i = 0; i < numCourses; i++) {
        adjacency.set(i, []);
    }

    prerequisites.forEach(prerequisite => {
        const [a, b] = prerequisite;
        adjacency.get(b).push(a);
    });

    const visited: Set<number> = new Set();

    const dfs = (current: number): boolean => {
        if (visited.has(current)) {
            return false;
        }
        if (adjacency.get(current).length === 0) {
            return true;
        }
        visited.add(current);
        const children = adjacency.get(current);
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (!dfs(child)) {
                return false;
            }
        }
        visited.delete(current);
        adjacency.set(current, []);
        return true;
    }

    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) return false;
    }

    return true;
};`;

export const description = `
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. 

You are given an array prerequisites where prerequisites[i] = [a_i, b_i] indicates that 

you must take course b_i first if you want to take course a_i.

> For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.

Return **true** if you can finish all courses. Otherwise, return **false**.
`;

export const tips = `This is a **Detect Cycle in a Directed Graph** problem.

We could use **hashSet** to find whehter there is a cycle in a graph.`;

export const usecases = '';

export const example = ``;
