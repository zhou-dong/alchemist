export const title = "Kth Largest Element in an Array";

export const formula = `function findKthLargest(nums: number[], k: number): number {

    const heapify = () => {
        for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
            bubbleDown(i);
        }
    }

    const bubbleDown = (index: number) => {
        let biggest = index;
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;
        if (leftIndex < nums.length && nums[leftIndex] > nums[biggest]) {
            biggest = leftIndex;
        }
        if (rightIndex < nums.length && nums[rightIndex] > nums[biggest]) {
            biggest = rightIndex;
        }
        if (biggest === index) {
            return;
        }
        swap(biggest, index);
        bubbleDown(biggest);
    }

    const swap = (i: number, j: number) => {
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    const pop = () => {
        const root = this.items.shift();
        const last = this.items.pop();
        if (last) {
            this.items.unshift(last);
            this.bubbleDown(0);
        }
        return root;
    }

    heapify();

    for (let i = 0; i < k - 1; i++) {
        pop();
    }

    return pop();
};`;

export const description = `
Given an integer array **nums** and an integer **k**, return the **kth** largest element in the array.

Note that it is the **kth** largest element in the sorted order, **not** the **kth** distinct element.

You must solve it in **O(n)** time complexity.
`;

export const solution = ``;

export const usecases = '';

export const example = `
---

**Example 1**:

- Input: nums = [1,2,3,6,5,4], k = 3
- Output: 4

**Example 2**:

- Input: nums = [7,4,1,1,2,2,2,3,4,5], k = 5
- Output: 3
`;
