import createDpTable from "../algo";

const getLastCell = (table: number[][]): number => {
    const lastRow = table[table.length - 1];
    return lastRow[lastRow.length - 1];
}

test("edit-distance", () => {
    const str1 = "apple";
    const str2 = "oppo";

    const table = createDpTable(str1, str2);
    const distance = getLastCell(table);
    expect(distance === 3);
});
