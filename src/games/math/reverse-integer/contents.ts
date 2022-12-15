export const title = "Palindrome Number";

export const formula = `function isPalindrome(x: number): boolean {
    
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    let reverted: number = 0;
    while (x > reverted) {
        reverted = reverted * 10 + x % 10;
        x = Math.floor(x / 10);
    }

    return x === reverted || x === Math.floor(reverted / 10);
};`;

export const description = `#### Description

Given an integer x, return ***true*** if x is a palindrome, and ***false*** otherwise.
`;

export const solution = ``;

export const usecases = '';

export const examples = `

---

#### Example 1:

- Input: x = 121
- Output: true

#### Example 2:

- Input: x = -121
- Output: false

#### Example 3:

- Input: x = 20
- Output: false
`;
