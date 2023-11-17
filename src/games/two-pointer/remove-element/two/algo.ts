export type Action = "Update" | "Next" | "Start";

export interface Step {
    val: number;
    left: number;
    right: number;
    action: Action;
    nums: number[];
    linesToHighlight: number[];
}

export function removeElement(nums: number[], val: number): Step[] {

    const actions: Step[] = [];

    let left = 0;
    let right = nums.length - 1;

    actions.push({
        val, left: -1, right: -1, nums: [...nums], linesToHighlight: [3], action: "Start"
    });

    while (left <= right) {
        if (nums[left] === val) {

            actions.push({
                val, left, right, action: "Update", nums: [...nums], linesToHighlight: [7]
            });

            nums[left] = nums[right];
            right--;

            if (left > right) {
                actions.push({
                    val, left, right, action: "Update", nums: [...nums], linesToHighlight: [7]
                });
            }
        } else {

            actions.push({
                val, left, right, action: "Next", nums: [...nums], linesToHighlight: [10]
            });

            left++;

            if (left > right) {
                actions.push({
                    val, left, right, action: "Next", nums: [...nums], linesToHighlight: [10]
                });
            }
        }
    }

    return actions;
};
