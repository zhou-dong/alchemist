export const title = "Reverse Integer";

export const formula1 = `// Solution 1
function reverse(x: number): number {
    const max = Math.pow(2, 31) - 1; //  2147483647
    const min = Math.pow(-2, 31);    // -2147483648

    let reversed = 0;
    while (x != 0) {
        const digit = x % 10;
        if (reversed > ~~(max / 10) || (reversed === ~~(max / 10) && digit > max % 10)) {
            return 0;
        }
        if (reversed < ~~(min / 10) || (reversed === ~~(min / 10) && digit < min % 10)) {
            return 0;
        }
        reversed = reversed * 10 + digit;
        x = ~~(x / 10);
    }
    return reversed;
};`;

export const formula2 = `// Solution 2
function reverse(x: number): number {
    const max = Math.pow(2, 31) - 1; //  2147483647
    const min = Math.pow(-2, 31);    // -2147483648

    let reversed = 0;
    while (x != 0) {
        if (reversed > ~~(max / 10)) {
            return 0;
        }
        if (reversed < ~~(min / 10)) {
            return 0;
        }
        const digit = x % 10;
        reversed = reversed * 10 + digit;
        x = ~~(x / 10);
    }
    return reversed;
};`;

export const formula3 = `function reverse(x: number): number {
    const max = Math.pow(2, 31) - 1;
    const min = Math.pow(-2, 31);

    let reversed = 0;
    while (x != 0) {
        if (reversed > ~~(max / 10) || reversed < ~~(min / 10)) {
            return 0;
        }
        reversed = reversed * 10 + x % 10;
        x = ~~(x / 10);
    }
    return reversed;
};`;

export const description = `#### Description

Given a signed 32-bit integer **x**, return **x** with its digits reversed. 
If reversing **x** causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], 
then return **0**.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
`;

export const solution = ``;

export const usecases = '';

export const examples = `

---

#### Example 1:

- Input: x = 123
- Output: 321

#### Example 2:

- Input: x = -123
- Output: -321

#### Example 3:

- Input: x = 120
- Output: 21
`;
