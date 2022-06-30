import createDpTable from "../algo";

const getLastCell = (table: boolean[][]): boolean => {
    const lastRow = table[table.length - 1];
    return lastRow[lastRow.length - 1];
}

test("Wildcard-matching 1", () => {
    const pattern = "?";
    const text = "a";

    const table = createDpTable(pattern, text);
    const distance = getLastCell(table);

    expect(distance).toBe(true);
});

test("Wildcard-matching 2", () => {
    const pattern = "a?";
    const text = "ab";

    const table = createDpTable(pattern, text);
    const distance = getLastCell(table);

    expect(distance).toBe(true);
});

test("Wildcard-matching 3", () => {
    const pattern = "a*b";
    const text = "ab";

    const table = createDpTable(pattern, text);
    const distance = getLastCell(table);

    expect(distance).toBe(true);
});


test("Wildcard-matching 4", () => {
    const pattern = "a?b";
    const text = "ab";

    const table = createDpTable(pattern, text);
    const distance = getLastCell(table);

    expect(distance).toBe(false);
});
