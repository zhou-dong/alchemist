import createDpTable from "../algo";

const getLastCell = (table: boolean[][]): boolean => {
    const lastRow = table[table.length - 1];
    return lastRow[lastRow.length - 1];
}

test("subset-sum-problem one", () => {
    const total = 9;
    const array = [3, 34, 4, 12, 5, 2];

    const table = createDpTable(total, array);
    const distance = getLastCell(table);

    expect(distance).toBe(true);
});

test("subset-sum-problem two", () => {
    const total = 35;
    const array = [3, 34, 4, 12, 5, 2];

    const table = createDpTable(total, array);
    const distance = getLastCell(table);

    expect(distance).toBe(false);
});
