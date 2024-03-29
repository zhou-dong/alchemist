export const title = "Rod Cutting Problem";

export const formula = `
if (rodLength > currentLength) {
    table[row][col] = table[row - 1][col];
} else {
    table[row][col] = Math.max(
        table[row - 1][col], 
        table[row][currentLength - rodLength] + rodPrice
    );
}
`;

export const description = `Assume a company buys long steel rods and cuts them into shorter rods 
  for sale to its customers. If each cut is free and rods of different 
  lengths can be sold for different amounts, we wish to determine 
  how to best cut the original rods to maximize the revenue.
  P: price, L: length
  `;

export const usecases = '';

export const example = `

### 1

If length of the rod is 8 and the values of different pieces are 
  given as following, then the maximum obtainable value is ***22***.

| length | 1 | 2 | 3 | 4 | 5  | 6  | 7  | 8  |
|--------|---|---|---|---|----|----|----|----|
| price  | 1 | 5 | 8 | 9 | 10 | 17 | 17 | 20 |

By cutting in two pieces of lengths 2 and 6.

### 2

And if the prices are as following, then the maximum obtainable value is ***24***.

| length | 1 | 2 | 3 | 4 | 5  | 6  | 7  | 8  |
|--------|---|---|---|---|----|----|----|----|
| price  | 3 | 5 | 8 | 9 | 10 | 17 | 17 | 20 |

By cutting in 8 pieces of length 1.
`
