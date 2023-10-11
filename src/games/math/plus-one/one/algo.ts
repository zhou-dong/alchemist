export interface Action {
    digits: number[];
    i: number;
    carrier: number;
    temp?: number;
    digit?: number;
    linesToHighlight: number[]
}

export function plusOne(digits: number[]): Action[] {

    const actions: Action[] = [];

    let carrier = 1;

    actions.push({ digits: [...digits], i: digits.length - 1, carrier, linesToHighlight: [3] });

    for (let i = digits.length - 1; i >= 0; i--) {
        const temp = digits[i] + carrier;

        actions.push({ digits: [...digits], i, carrier, temp, linesToHighlight: [6] });

        digits[i] = temp % 10;

        actions.push({ digits: [...digits], i, carrier, temp, digit: digits[i], linesToHighlight: [7] });

        carrier = Math.floor(temp / 10);

        actions.push({ digits: [...digits], i, carrier, temp, digit: digits[i], linesToHighlight: [8] });

        if (carrier === 0) {
            actions.push({ digits: [...digits], i, carrier, temp, digit: digits[i], linesToHighlight: [10] });

            return actions;
        }
    }

    digits.unshift(1);
    actions.push({ digits: [...digits], i: -1, carrier, linesToHighlight: [14] });

    actions.push({ digits: [...digits], i: -1, carrier, linesToHighlight: [15] });
    return actions;
};
