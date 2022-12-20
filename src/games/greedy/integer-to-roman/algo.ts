export interface Roman {
    value: number;
    symbol: string;
}

export interface Data {
    num: number;
    roman: string;
}

export interface Item {
    index: number;
    current: Data;
    roman: Roman;
    next: Data;
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

            const current: Data = { num, roman };

            roman += symbol;
            num -= (+value);

            const next: Data = { num, roman };

            items.push({ index: i, current, roman: { value: +value, symbol: symbol + "" }, next });
        }
    }

    return items;
};
