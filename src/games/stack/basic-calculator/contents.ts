export const title = "Basic Calculator";

export const shortFormula = `function calculate(s: string): number {
    let result = 0;
    let sign = 1;
    const stack: number[] = [];
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if (isNumeric(c)) {
            let current: number = +c;
            while (i + 1 < s.length && isNumeric(s.charAt(i + 1))) {
                current = current * 10 + (+s.charAt(i + 1));
                i++;
            }
            result += current * sign;
        } else if (c === "+") {
            sign = 1;
        } else if (c === "-") {
            sign = -1;
        } else if (c === "(") {
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
        } else if (c === ")") {
            const previousSign = stack.pop();
            const previousResult = stack.pop();
            result = previousSign * result + previousResult;
        }
    }
    return result;
}`

export const formula = `function isNumeric(n: string) {
    const value = parseInt(n);
    return !isNaN(value) && isFinite(value);
}

function calculate(s: string): number {
    let sign = 1;
    let result = 0;
    const stack: number[] = [];

    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if (isNumeric(c)) {
            let current: number = +c;
            while (i + 1 < s.length && isNumeric(s.charAt(i + 1))) {
                current = current * 10 + (+s.charAt(i + 1));
                i++;
            }
            result += current * sign;
        } else if (c === "+") {
            sign = 1;
        } else if (c === "-") {
            sign = -1;
        } else if (c === "(") {
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
        } else if (c === ")") {
            const previousSign = stack.pop();
            const previousResult = stack.pop();
            result = previousSign * result + previousResult;
        }
    }

    return result;
};`;

export const description = `## ${title}

---

Given a string s representing a valid expression, 
implement a basic calculator to evaluate it, and return the result of the evaluation.

Note: You are **not** allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().


### Constraints

+ 1 <= s.length <= 3 * 105
+ s consists of digits, '+', '-', '(', ')', and ' '.
+ s represents a valid expression.
+ '+' is not used as a unary operation (i.e., "+1" and "+(2 + 3)" is invalid).
+ '-' could be used as a unary operation (i.e., "-1" and "-(2 + 3)" is valid).
+ There will be no two consecutive operators in the input.
+ Every number and running calculation will fit in a signed 32-bit integer.

### Exmaple

##### Example 1:

- Input: s = "1 + 1"
- Output: 2

##### Example 2:

- Input: s = "12 - 3 + 8 + 6"
- Output: 23

##### Example 3:

- Input: s = "11 + (12 - (3 - (6 + 5 + 2) - 1) + 4)"
- Output: 38
`;
