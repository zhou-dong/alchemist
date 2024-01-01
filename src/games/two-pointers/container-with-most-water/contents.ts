export const title = "Container With Most Water";

export const formula = `function maxArea(heights: number[]): number {
    let left = 0;
    let right = heights.length - 1;
    let max = 0;

    while (left < right) {
        const height = Math.min(heights[left], heights[right]);
        const width = right - left;

        max = Math.max(max, height * width);

        if (heights[left] < heights[right]) {
            left++;
        } else {
            right--
        }
    }

    return max;
};`;

export const description = `
You are given an integer array **height** of length **n**. 
There are **n** vertical lines drawn such that the two endpoints of the **i^th** line are **(i, 0)** and **(i, height[i])**.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

*Return the maximum amount of water a container can store*.

**Notice that:** you may ***not*** slant the container.
`;

export const usecases = '';

export const example = `
Example 1:

- Input: height = [1,8,6,2,5,4,8,3,7]
- Output: 49

Example 2:

- Input: height = [1,1]
- Output: 1
`;
