export interface Step {
    left: number;
    right: number;
    answer: number;
    mid: number;
    square: number;
}

export interface Result {
    steps: Step[];
    sqrt: number;
}

const calculateMid = (left: number, right: number): number => {
    return left + Math.floor((right - left) / 2);
}

export function mySqrt(x: number): Result {

    const steps: Step[] = [];

    let [left, right, answer] = [0, x, -1];
    const mid = calculateMid(left, right);
    steps.push({ left, right, mid, square: mid * mid, answer });

    while (left <= right) {
        const mid = calculateMid(left, right);

        if (mid * mid <= x) {
            answer = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }

        const nextMid = calculateMid(left, right);
        steps.push({ left, right, answer, mid: nextMid, square: nextMid * nextMid });
    }

    steps.pop();

    return { steps, sqrt: answer };
};
