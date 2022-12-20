interface Roman {
    value: number;
    symbol: string;
}

export interface Item {
    prev: Roman;
    current?: Roman;
    sum: number;
}

export function romanToInt(s: string): Item[] {

    const getValue = (ch: string): number => {
        switch (ch) {
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            case 'M': return 1000;
            default: return 0;
        }
    }

    const items: Item[] = [];

    let sum = 0;
    let prev = getValue(s.charAt(0));

    let prevRoman: Roman = { value: getValue(s.charAt(0)), symbol: s.charAt(0) }

    for (let i = 1; i < s.length; i++) {
        const symbol = s.charAt(i);
        const value = getValue(symbol);

        if (prev < value) {
            sum -= prev;
        } else {
            sum += prev;
        }

        const currentRoman: Roman = { value, symbol }
        items.push({
            prev: prevRoman,
            current: currentRoman,
            sum
        });

        prev = value;
        prevRoman = currentRoman;
    }

    sum += prev;

    items.push({
        prev: prevRoman,
        sum
    });

    return items;
};
