export const title = "Basic Calculator II";

export const shortFormula = `function calculate(s: string): number {
    let previousSign = '+';
    const stack: number[] = [];
    for (let i = 0; i < s.length; i++) {
        const character = s.charAt(i);
        if (isNumeric(character)) {
            let current = +character;
            while (i + 1 < s.length && isNumeric(s.charAt(i + 1))) {
                current = current * 10 + (+s.charAt(i + 1));
                i++;
            }
            if (previousSign === "+") {
                stack.push(current);
            } else if (previousSign === "-") {
                stack.push(current * -1);
            } else if (previousSign === "*") {
                stack.push(stack.pop() * current);
            } else if (previousSign === "/") {
                stack.push((stack.pop() / current) | 0);
            }
        } else if (character !== " ") {
            previousSign = character;
        }
    }
    return stack.reduce((a, b) => a + b);
};`

export const formula = `function isNumeric(str: string) {
    const num = parseInt(str);
    return !isNaN(num);
}

function calculate(s: string): number {
    let previousSign = '+';
    const stack: number[] = [];
    for (let i = 0; i < s.length; i++) {
        const character = s.charAt(i);
        if (isNumeric(character)) {
            let current = +character;
            while (i + 1 < s.length && isNumeric(s.charAt(i + 1))) {
                current = current * 10 + (+s.charAt(i + 1));
                i++;
            }
            if (previousSign === "+") {
                stack.push(current);
            } else if (previousSign === "-") {
                stack.push(current * -1);
            } else if (previousSign === "*") {
                stack.push(stack.pop() * current);
            } else if (previousSign === "/") {
                stack.push((stack.pop() / current) | 0);
            }
        } else if (character !== " ") {
            previousSign = character;
        }
    }
    return stack.reduce((a, b) => a + b);
};`;

export const description = `## ${title}

---

Given a string s which represents an expression, evaluate this expression and return its value. 

The integer division should truncate toward zero. You may assume that the given expression is always valid.

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

### Constraints

+ 1 <= s.length <= 3 * 10^5
+ s consists of integers and operators ('+', '-', '*', '/') separated by some number of spaces.
+ s represents a valid expression.
+ All the integers in the expression are non-negative integers in the range [0, 2^31 - 1].
+ Every number and running calculation will fit in a signed 32-bit integer.

### Exmaple

##### Example 1:

- Input: s = "1 + 2 * 3"
- Output: 7

##### Example 2:

- Input: s = "1 + 2 * 3 / 4"
- Output: 2

##### Example 3:

- Input: s = "1 + 2 - 3 * 4 * 5 / 6 + 7 - 8"
- Output: -8
`;
