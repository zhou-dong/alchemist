export interface Step {
    left: number;
    right: number;
    mid: number;
}

export const isBadVersion = (num: number, n: number, bad: number): boolean => num >= bad && num <= n;

export const solution = function (n: number, bad: number): Step[] {

    const steps: Step[] = [];

    let [left, right] = [1, n];

    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);

        steps.push({ left, right, mid });

        if (isBadVersion(mid, n, bad)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return steps;

};
