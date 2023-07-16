import createDpTable from "../algo";

const getLastCell = (table: number[][]): number => {
    const lastRow = table[table.length - 1];
    return lastRow[lastRow.length - 1];
}

test("longest-common-subsequence", () => {
    const str1 = "algorithms";
    const str2 = "alchemist";

    const table = createDpTable(str1, str2);
    const distance = getLastCell(table);

    expect(distance).toBe(5);
});
