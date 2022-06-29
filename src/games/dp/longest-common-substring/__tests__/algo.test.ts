import createDpTable from "../algo";

const getBiggestNumber = (table: number[][]): number => {
    let result = 0;

    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            result = Math.max(result, table[i][j]);
        }
    }

    return result;
}

test("longest-common-substring one", () => {
    const str1 = "algorithms";
    const str2 = "alchemist";

    const table = createDpTable(str1, str2);
    const result = getBiggestNumber(table);

    expect(result).toBe(2);
});

test("longest-common-substring two", () => {
    const str1 = "abcdxyz";
    const str2 = "xyzabcd";

    const table = createDpTable(str1, str2);
    const result = getBiggestNumber(table);

    expect(result).toBe(4);
});
