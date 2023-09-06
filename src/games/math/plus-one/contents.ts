export const title = "Plus One";

export const formulaOne = `function plusOne(digits: number[]): number[] {

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
};`;

export const formulaTwo = `function plusOne(digits: number[]): number[] {

    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] !== 9) {
            digits[i] += 1;
            for (let j = i + 1; j < digits.length; j++) {
                digits[j] = 0;
            }
            return digits;
        }
    }

    const ans = new Array(digits.length + 1).fill(0);
    ans[0] = 1;
    return ans;
};`;

export const description = `#### Description
You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.


`;

export const solution = ``;

export const usecases = '';

export const examples = `

---

#### Example 1:

- Input: x = "121"
- Output: 121

#### Example 2:

- Input: x = " -121"
- Output: 121

#### Example 3:

- Input: x = " 123 alchemist"
- Output: 121
`;
