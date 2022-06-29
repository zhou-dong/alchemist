export const title = 'Is Subsequence';

export const formula = `
if (ch1 === ch2 && table[row - 1][col - 1]) {
    table[row][col] = true;
} else {
    table[row][col] = table[row][col - 1];
}

OR

if (table[row][col - 1]) {
    table[row][col] = true;
} else if (ch1 === ch2 && table[row - 1][col - 1]) {
    table[row][col] = true;
} else {
    table[row][col] = false;
}
`;

export const description = `Given two strings s1 and s2, find if s1 is a subsequence of s2.`;

export const usecases = '';

export const example = `
Example 1:

- Input: s1 = che, s2 = alchemist
- Output: ***true***

Example 2:

- Input: s1 = chm, s2 = alchemist
- Output: ***true***

Example 3:

- Input: s1 = mch, s2 = alchemist
- Output: ***false***
`;
