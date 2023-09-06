export const title = "Plus One";


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
You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.


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
