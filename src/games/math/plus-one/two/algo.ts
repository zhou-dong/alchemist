export interface Action {
    digits: number[];
    i: number;
    j?: number;
    linesToHighlight: number[]
}

export function plusOne(digits: number[]): Action[] {

    const actions: Action[] = [];

    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] !== 9) {
            digits[i] += 1;
            actions.push({ digits: [...digits], i, linesToHighlight: [5] });
            for (let j = i + 1; j < digits.length; j++) {
                digits[j] = 0;
                actions.push({ digits: [...digits], i, j, linesToHighlight: [7] });
            }
            actions.push({ digits: [...digits], i: -1, linesToHighlight: [9] });
            return actions;
        } else {
            actions.push({ digits: [...digits], i, linesToHighlight: [3] });
        }
    }

    const ans = new Array(digits.length + 1).fill(0);
    ans[0] = 1;
    actions.push({ digits: [...ans], i: -1, linesToHighlight: [15] });

    return actions;
};
