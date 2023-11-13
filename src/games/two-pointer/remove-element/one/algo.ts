export interface Action {
    left: number;
    right: number;
    update: boolean;
    nums: number[];
}

export function removeElement(nums: number[], val: number): Action[] {

    const actions: Action[] = [];

    let left = 0;
    let right = 0;

    actions.push({
        left, right, update: false, nums: [...nums]
    });

    for (; right < nums.length;) {
        if (nums[right] !== val) {
            nums[left] = nums[right];
            left++;
            right++;

            actions.push({
                left, right, update: true, nums: [...nums]
            });

        } else {
            right++;

            actions.push({
                left, right, update: false, nums: [...nums]
            });
        }
    }


    return actions;
};
