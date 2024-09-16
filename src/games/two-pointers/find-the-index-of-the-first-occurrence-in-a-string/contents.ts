export const title = 'Find the Index of the First Occurrence in a String';

export const formula = `function strStr(haystack: string, needle: string): number {

    for (let i = 0; i <= haystack.length - needle.length; i++) {
        for (let j = 0; j < needle.length; j++) {
            if (haystack.charAt(i + j) !== needle.charAt(j)) {
                break;
            }
            if (j === needle.length - 1) {
                return i;
            }
        }
    }

    return -1;
};`;

export const description = `
Given two strings *needle* and *haystack*, return the index of the first occurrence of *needle* in *haystack*, or *-1* if *needle* is not part of *haystack*.
`;

export const usecases = `
`;

export const example = `
`;
