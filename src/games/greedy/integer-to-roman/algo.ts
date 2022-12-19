export interface Roman {
    value: number | string;
    symbol: number | string;
}

export interface Item {
    i: number;
    roman: Roman;
    current: number;
    next: number;
}

export function intToRoman(num: number): Item[] {

    const items: Item[] = [];

    const valueSymbols = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"]
    ];

    let roman = "";

    for (let i = 0; i < valueSymbols.length; i++) {
        const [value, symbol] = valueSymbols[i];
        while (num >= value) {

            const current = num;
            const next = num - (+value);

            roman += symbol;
            num -= (+value);

            items.push({ i, roman: { value, symbol }, current, next });
        }
    }

    return items;
};
