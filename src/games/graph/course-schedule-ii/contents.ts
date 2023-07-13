export const title = "Course Schedule II";

export const formula = `function findOrder(numCourses: number, prerequisites: number[][]): number[] {

    const adjacency: Map<number, number[]> = new Map();
    for (let i = 0; i < numCourses; i++) {
        adjacency.set(i, []);
    }
    prerequisites.forEach(prerequisite => {
        const [a, b] = prerequisite;
        adjacency.get(b).push(a);
    });

    const stack: number[] = [];

    let hasCycle = false;
    const visited: Set<number> = new Set();
    const dfs = (current: number) => {
        if (visited.has(current)) {
            hasCycle = true;
            return;
        }
        if (stack.indexOf(current) >= 0) {
            return;
        }
        visited.add(current);
        const children = adjacency.get(current);
        for (let i = 0; i < children.length; i++) {
            dfs(children[i]);
            if (hasCycle) {
                return;
            }
        }
        visited.delete(current);
        stack.push(current);
    }

    for (let i = 0; i < numCourses; i++) {
        dfs(i);
        if (hasCycle) {
            return [];
        }
    }

    return stack.reverse();
};`;

export const description = `
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. 

You are given an array prerequisites where prerequisites[i] = [a_i, b_i] indicates that 

you must take course b_i first if you want to take course a_i.

> For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.

Return the ordering of courses you should take to finish all courses. 

If there are many valid answers, return any of them. 

If it is impossible to finish all courses, return an empty array.
`;

export const usecases = '';

export const example = ``;
