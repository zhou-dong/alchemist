export interface Item {
    index: number;
    sign: number;
    num: number;
    linesToHighlight: number[]
}

export function plusOne(digits: number[]): number[] {

    let carrier = 1;

    for (let i = digits.length - 1; i >= 0; i--) {
        const temp = digits[i] + carrier;
        digits[i] = temp % 10;
        carrier = Math.floor(temp / 10);
        if (carrier === 0) {
            return digits;
        }
    }

    digits.unshift(1);
    return digits;
};
