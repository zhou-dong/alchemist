import createDpTable from "../algo";

const getLastCell = (table: number[][]): number => {
    const lastRow = table[table.length - 1];
    return lastRow[lastRow.length - 1];
}

test("coin-change-fewest-number should return optimal solution", () => {
    const coins = [1, 8, 13];
    const total = 16;

    const table = createDpTable(coins, total);
    const result = getLastCell(table);

    expect(result).toBe(2);
});

test("coin-change-fewest-number should return the right result", () => {
    const coins = [2, 8, 15];
    const total = 24;

    const table = createDpTable(coins, total);
    const result = getLastCell(table);

    expect(result).toBe(3);
});
