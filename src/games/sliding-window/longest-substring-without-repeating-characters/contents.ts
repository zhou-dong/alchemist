export const title = "Longest Substring Without Repeating Characters";

export const formula = `function lengthOfLongestSubstring(s: string): number {
    if (s.length === 0) return 0;

    let max = 1;
    let left = 0;

    const map: Map<string, number> = new Map();
    for (let i = 0; i < s.length; i++) {
        const character = s.charAt(i);
        if (map.has(character)) {
            left = Math.max(left, map.get(character) + 1);
        }
        map.set(character, i);
        max = Math.max(max, i - left + 1);
    }

    return max;
};`;

export const description = `
Given a string **s**, find the length of the longest substring without repeating characters.

\\- From Leetcode.
`;

export const usecases = '';
export const example = `
Example 1:

- Input: s = "abcabcbb"
- Output: 3
- Explanation: The answer is "abc", with the length of 3.

Example 2:

- Input: s = "bbbbb"
- Output: 1
- Explanation: The answer is "b", with the length of 1.

Example 3:

- Input: s = "pwwkew"
- Output: 3
- Explanation: The answer is "wke", with the length of 3.
- Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
`;
