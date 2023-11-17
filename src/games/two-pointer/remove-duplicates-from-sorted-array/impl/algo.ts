export type Action = "Update" | "Next" | "Start" | "Finish";

export interface Step {
    left: number;
    right: number;
    action: Action;
    nums: number[];
    linesToHighlight: number[];
}

export function removeElement(nums: number[]): Step[] {

    const steps: Step[] = [];

    steps.push({
        left: -1, right: -1, nums: [...nums], linesToHighlight: [3], action: "Start"
    });

    let left = 0;
    let right = 1;

    for (; right < nums.length;) {
        if (nums[left] !== nums[right]) {

            steps.push({
                left, right, action: "Update", nums: [...nums], linesToHighlight: [6]
            });

            nums[left + 1] = nums[right];
            left++;
            right++;
        } else {

            steps.push({
                left, right, action: "Next", nums: [...nums], linesToHighlight: [5]
            });

            right++;
        }
    }

    steps.push({
        left: left + 1, right, action: "Finish", nums: [...nums], linesToHighlight: [12]
    });

    return steps;
};
