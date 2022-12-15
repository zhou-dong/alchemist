export interface Result {
    reversed: number;
    items: ResultItem[];
}

interface ResultItem {
    reversed: number;
    x: number;
}

export const defaultResult: Result = { items: [], reversed: 0 };

export function reverse(x: number): Result {

    const items: ResultItem[] = [];

    const max = Math.pow(2, 31) - 1;
    const min = Math.pow(-2, 31);

    let reversed = 0;
    while (x != 0) {
        if (reversed > ~~(max / 10) || reversed < ~~(min / 10)) {
            return { items, reversed };
        }
        const digit = x % 10;
        reversed = reversed * 10 + digit;
        x = ~~(x / 10);

        items.push({ reversed, x })
    }
    return { reversed, items };
};
