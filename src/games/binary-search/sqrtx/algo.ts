export interface Step {
    left: number;
    right: number;
    answer: number;
    mid?: number;
}

export function mySqrt(x: number): Step[] {

    const steps: Step[] = [];

    let [left, right, answer] = [0, x, -1];
    steps.push({ left, right, answer });

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (mid * mid <= x) {
            answer = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }

        steps.push({ left, right, answer, mid });
    }

    return steps;
};
