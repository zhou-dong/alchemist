export function removeElement(nums: number[], val: number): number {

    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== val) {
            nums[left] = nums[right];
            left++;
        }
    }

    return left;
};
