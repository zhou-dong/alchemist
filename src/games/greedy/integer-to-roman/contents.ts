export const title = "Integer to Roman";

export const formula = ``;

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
