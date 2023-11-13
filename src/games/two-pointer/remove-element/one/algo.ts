export interface Action {
    val: number;
    left: number;
    right: number;
    isUpdate: boolean;
    nums: number[];
    linesToHighlight: number[];
}

export function removeElement(nums: number[], val: number): Action[] {

    const actions: Action[] = [];

    let left = 0;
    let right = 0;

    actions.push({
        val, left, right, isUpdate: false, nums: [...nums], linesToHighlight: [3]
    });

    for (; right < nums.length;) {
        if (nums[right] !== val) {
            nums[left] = nums[right];
            left++;
            right++;

            actions.push({
                val, left, right, isUpdate: true, nums: [...nums], linesToHighlight: [6]
            });

        } else {
            right++;

            actions.push({
                val, left, right, isUpdate: false, nums: [...nums], linesToHighlight: [5]
            });
        }
    }


    return actions;
};
