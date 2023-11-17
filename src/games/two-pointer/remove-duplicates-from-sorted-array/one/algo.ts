export type Action = "Update" | "Next" | "Start" | "Finish";

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
    let right = 0;

    actions.push({
        val, left: -1, right: -1, nums: [...nums], linesToHighlight: [3], action: "Start"
    });

    for (; right < nums.length;) {
        if (nums[right] !== val) {

            actions.push({
                val, left, right, action: "Update", nums: [...nums], linesToHighlight: [6]
            });

            nums[left] = nums[right];
            left++;
            right++;

            // handle the last action
            if (right === nums.length) {
                actions.push({
                    val, left, right, action: "Finish", nums: [...nums], linesToHighlight: [6]
                });
            }
        } else {

            actions.push({
                val, left, right, action: "Next", nums: [...nums], linesToHighlight: [5]
            });

            right++;

            // handle the last action
            if (right === nums.length) {
                actions.push({
                    val, left, right, action: "Finish", nums: [...nums], linesToHighlight: [5]
                });
            }
        }
    }

    return actions;
};
