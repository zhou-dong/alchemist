import createDpTable from "../algo";

const getLastCell = (table: number[][]): number => {
    const lastRow = table[table.length - 1];
    return lastRow[lastRow.length - 1];
}

test("rod-cutting-problem one", () => {
    const items = [
        { price: 1, length: 1 },
        { price: 5, length: 2 },
        { price: 8, length: 3 },
        { price: 9, length: 4 },
        { price: 10, length: 5 },
        { price: 17, length: 6 },
        { price: 17, length: 7 },
        { price: 20, length: 8 },
    ];
    const totalLength = 8;

    const table = createDpTable(items, totalLength);
    const distance = getLastCell(table);

    expect(distance).toBe(22);
});

test("rod-cutting-problem two", () => {
    const items = [
        { price: 3, length: 1 },
        { price: 5, length: 2 },
        { price: 8, length: 3 },
        { price: 9, length: 4 },
        { price: 10, length: 5 },
        { price: 17, length: 6 },
        { price: 17, length: 7 },
        { price: 20, length: 8 },
    ];
    const totalLength = 8;

    const table = createDpTable(items, totalLength);
    const distance = getLastCell(table);

    expect(distance).toBe(24);
});
