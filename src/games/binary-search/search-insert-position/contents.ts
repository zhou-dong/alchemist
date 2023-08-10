export const title = 'Search Insert Position';

export const formula = `function searchInsert(nums: number[], target: number): number {

    let [left, right] = [0, nums.length - 1];

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
};`;

export const description = `
Given a **sorted** array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with ***O(log n)*** runtime complexity.
`;

export const usecases = '';

export const example = `
### Example 1:

- Input: nums = [1,3,5,6], target = 5
- Output: 2

### Example 2:

- Input: nums = [1,3,5,6], target = 2
- Output: 1

### Example 3:

- Input: nums = [1,3,5,6], target = 7
- Output: 4
`;
