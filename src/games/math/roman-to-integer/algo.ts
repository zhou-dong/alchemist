export enum Action {
    Add, Subtract
}

interface Roman {
    value: number;
    symbol: string;
}

interface Sum {
    previous: number;
    current: number;
}

export interface Item {
    action: Action;
    prev: Roman;
    current?: Roman;
    sum: Sum;
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

        let action = Action.Add;
        const previousSum = sum;

        if (prev < value) {
            sum -= prev;
            action = Action.Subtract;
        } else {
            sum += prev;
        }

        const currentRoman: Roman = { value, symbol }
        items.push({
            prev: prevRoman,
            current: currentRoman,
            sum: { previous: previousSum, current: sum },
            action
        });

        prev = value;
        prevRoman = currentRoman;
    }

    const previousSum = sum;
    sum += prev;

    items.push({
        prev: prevRoman,
        sum: { previous: previousSum, current: sum },
        action: Action.Add
    });

    return items;
};
