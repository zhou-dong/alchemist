export const title = "Coin Change (How Many Ways)"

export const formula = `
if (coin > col) {
    table[row][col] = table[row - 1][col];
} else {
    table[row][col] = table[row][col - coin] + table[row - 1][col];
}
`;

export const description = `
You are given coins of different denominations and a total amount of money. 
Write a function to compute the number of combinations that make up that amount. 
You may assume that you have infinite number of each kind of coin.
`;

export const usecases = '';

export const example = '';
