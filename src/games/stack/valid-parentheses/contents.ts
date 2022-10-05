export const title = "Valid Parentheses";

export const formula = `function isValid(s: string): boolean {

    const map: Map<string, string> = new Map([
        [")", "("], ["]", "["], ["}", "{"]
    ]);

    const stack: string[] = [];
    const chars = Array.from(s);

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        if (!map.has(char)) {
            stack.push(char);
        } else if (stack.pop() !== map.get(char)) {
            return false;
        }
    }

    return stack.length === 0;

};
`;

export const description = `
Given a string containing '(', ')', '{', '}', '[' and ']', check whether if it is valid.

The brackets must close in the correct order.
`;

export const usecases = '';

export const example = `
Example 1:

- Input: s = "()"
- Output: true

Example 2:

- Input: s = "()[]{}"
- Output: true

Example 3:

- Input: s = "(]"
- Output: false
`;
