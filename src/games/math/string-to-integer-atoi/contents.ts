export const title = "String to Integer (atoi)";


export const formula = `function myAtoi(s: string): number {
    function isNumeric(str: string) {
        const num = parseInt(str);
        return !isNaN(num);
    }
    const max = Math.pow(2, 31) - 1;
    const min = Math.pow(-2, 31);

    let index = 0;
    while (s.charAt(index) === ' ') {
        index++;
    }

    let sign = 1;
    if (s.charAt(index) === "+" || s.charAt(index) === "-") {
        if (s.charAt(index) === "-")
            sign = -1;
        index++;
    }

    let num = 0;
    for (; index < s.length; index++) {
        if (!isNumeric(s.charAt(index)))
            return num * sign;
        if (num > ~~(max / 10))
            return sign === 1 ? max : min;

        const digit: number = +s.charAt(index);
        if (num === ~~(max / 10)) {
            if (sign === 1 && digit > (max % 10)) {
                return max;
            } else if (sign === -1 && (digit * -1) < (min % 10)) {
                return min;
            }
        }

        num = num * 10 + digit;
    }

    return sign * num;
};`;

export const description = `#### Description

Implement the **myAtoi(string s)** function, which converts a string to a 32-bit signed integer (similar to C/C++'s **atoi** function).

The algorithm for **myAtoi(string s)** is as follows:

Read in and ignore any leading whitespace.

Check if the next character (if not already at the end of the string) is **'-'** or **'+'**. 
Read this character in if it is either. This determines if the final result is negative or positive respectively. 
Assume the result is positive if neither is present.

Convert these digits into an integer (i.e. **"123" -> 123**, **"0032" -> 32**). If no digits were read, then the integer is **0**. 
Change the sign as necessary (from step 2).

If the integer is out of the 32-bit signed integer range **[-2^31, 2^31 - 1]**, then clamp the integer so that it remains in the range. 
Specifically, integers less than **-2^31** should be clamped to **-2^31**, and integers greater than **2^31 - 1** should be clamped to **2^31 - 1**.

Return the integer as the final result.

#### Note:

- Only the space character ' ' is considered a whitespace character.
- Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.
`;

export const solution = ``;

export const usecases = '';

export const examples = `

---

#### Example 1:

- Input: x = "121"
- Output: 121

#### Example 2:

- Input: x = " -121"
- Output: 121

#### Example 3:

- Input: x = " 123 alchemist"
- Output: 121
`;
