export const title = "Word Break";

export const description = `
Given an input string and a dictionary of words, 
find out if the input string can be segmented 
into a space-separated sequence of dictionary 
words.`;

export const usecases = '';

export const formula = `
const sub = s.substring(start, end + 1);

if (wordDictSet.has(sub)) {
    table[start][end] = true;
    continue;
}

for (let i = start; i < end; i++) {
    if (table[start][i] && table[i + 1][end]) {
        table[start][end] = true;
        break;
    }
}
`;

export const example = `
Example 1:

- Input: s = "helloworld", wordDict = \\["hello", "world"]
- Output: true
- Explanation: Return true because "helloworld" can be segmented as "hello world".

Example 2:

- Input: s = "itisanice", wordDict = \\["a", "an", "i", "ice", "is", "it", "nice"]
- Output: true
- Explanation: Return true because "itisanice" can be segmented as "it is an ice".
`;