import createDpTable from "../algo";

const getResult = (table: boolean[][]): boolean => {
    const lastRow = table[table.length - 1];
    return lastRow.includes(true);
}

test("is-substring one", () => {
    const str1 = "alchemist";
    const str2 = "che";

    const table = createDpTable(str1, str2);
    const result = getResult(table);
    expect(result).toBe(true);
});

test("is-substring two", () => {
    const str1 = "alchemist";
    const str2 = "chm";

    const table = createDpTable(str1, str2);
    const result = getResult(table);

    expect(result).toBe(false);
});

test("is-substring three", () => {
    const str1 = "alchemist";
    const str2 = "mist";

    const table = createDpTable(str1, str2);
    const result = getResult(table);

    expect(result).toBe(true);
});

test("is-substring three", () => {
    const str1 = "alchemist";
    const str2 = "chis";

    const table = createDpTable(str1, str2);
    const result = getResult(table);

    expect(result).toBe(false);
});
