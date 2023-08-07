export interface Step {
    left: number;
    right: number;
    mid: number;
}

export function searchInsert(nums: number[], target: number): Step[] {
    const steps: Step[] = [];

    let [left, right] = [0, nums.length - 1];

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        steps.push({ left, right, mid });

        if (nums[mid] === target) {
            // return mid;
            return steps;
        }
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    // return left;

    return steps;
};
