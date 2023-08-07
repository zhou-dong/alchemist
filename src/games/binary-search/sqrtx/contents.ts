export const title = 'Sqrt(x)';

export const formula = `function mySqrt(x: number): number {

  let [left, right, answer] = [0, x, -1];

  while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (mid * mid <= x) {
          answer = mid;
          left = mid + 1;
      } else {
          right = mid - 1;
      }
  }

  return answer;
};`;

export const description = `
Given a non-negative integer **x**, return the ***square root of*** **x** ***rounded down to the nearest integer***. The returned integer should be non-negative as well.

You must **not** use any built-in exponent function or operator.

> For example, do not use ***pow(x, 0.5)*** in c++ or ***x ** 0.5*** in python.
`;

export const usecases = '';

export const example = `
### Example 1

- Input: x = 4
- Output: 2
- Explanation: The square root of 4 is 2, so we return 2.

### Example 2

- Input: x = 8
- Output: 2
- Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
`;
