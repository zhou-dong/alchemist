export interface Result {
    items: ResultItem[];
    isPalindrome: boolean;
}

interface ResultItem {
    reverted: number;
    x: number;
}

export const defaultResult: Result = { items: [], isPalindrome: false };

export function calculatePalindrome(x: number): Result {

    const items: ResultItem[] = [];

    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return { items, isPalindrome: false }
    }

    let reverted: number = 0;
    while (x > reverted) {
        reverted = reverted * 10 + x % 10;
        x = Math.floor(x / 10);
        items.push({ reverted, x })
    }

    const isPalindrome: boolean = x === reverted || x === Math.floor(reverted / 10);

    return { items, isPalindrome };
};
