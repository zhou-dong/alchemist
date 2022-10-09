export const title = "Valid Parentheses";

export const formula = `function isValid(s: string): boolean {

    const map: Map<string, string> = new Map([
        [")", "("],
        ["]", "["],
        ["}", "{"]
    ]);

    const stack:string[] = [];
    
    for(let ch of s) {
        if(!map.has(ch)){
            stack.push(ch);
        } else if(stack.pop() !== map.get(ch)){
            return false;
        }
    }

    return stack.length === 0;
};`;

export const description = `
Given a string containing '(', ')', '{', '}', '[' and ']', check whether if it is valid.

The brackets must close in the correct order.
`;

export const solution = `
### Solution

---

We are going to use **stack** and **hash-table** to solve this problem.

#### Steps:

1. Add **)** **]** **}** to hash-table.
2. Create an empty stack.
3. For-each all the characters of the input string.
    - If a character is not in hash-table, push this character into stack.
    - ElseIf a character is in hash-table, compare the result between stack.pop() and map.get(character).
        + return false if stack.pop() != map.get(character).
4. The stack should be empty after the for-loop, otherwise return false.
`

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
