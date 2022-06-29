import createDpTable from "../algo";

const getLastCell = (table: boolean[][]): boolean => {
    const lastRow = table[table.length - 1];
    return lastRow[lastRow.length - 1];
}

test("is-subsequence one", () => {
    const str1 = "alchemist";
    const str2 = "che";

    const table = createDpTable(str1, str2);
    const result = getLastCell(table);

    expect(result).toBe(true);
});

test("is-subsequence two", () => {
    const str1 = "alchemist";
    const str2 = "chm";

    const table = createDpTable(str1, str2);
    const result = getLastCell(table);

    expect(result).toBe(true);
});

test("is-subsequence two", () => {
    const str1 = "alchemist";
    const str2 = "mch";

    const table = createDpTable(str1, str2);
    const result = getLastCell(table);

    expect(result).toBe(false);
});
