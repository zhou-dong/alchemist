export enum Action {
    RemoveSpace,
    AssignSign,
    NonDigitCharacter,
    BiggerThanMax,
    LessThanMin,
    Accumulate,
    NumMultiplySign
}

interface Data {
    index: number;
    sign: number;
    num: number;
    linesToHighlight: number[]
}

export interface Item {
    action: Action;
    data: Data;
}

export function myAtoi(s: string): Item[] {

    const items: Item[] = [];

    const max = Math.pow(2, 31) - 1;
    const min = Math.pow(-2, 31);

    function isNumeric(str: string) {
        const num = parseInt(str);
        return !isNaN(num);
    }

    let index = 0;
    let sign = 1;
    let num = 0;

    while (s.charAt(index) === ' ') {
        items.push({
            data: { index, sign, num, linesToHighlight: [10] },
            action: Action.RemoveSpace
        });
        index++;
    }

    if (s.charAt(index) === "+" || s.charAt(index) === "-") {
        if (s.charAt(index) === "-") {
            sign = -1;
        }
        items.push({
            data: { index, sign, num, linesToHighlight: [15] },
            action: Action.AssignSign
        });
        index++;
    }

    for (; index < s.length; index++) {
        if (!isNumeric(s.charAt(index))) {
            items.push({
                data: { index, sign, num: num * sign, linesToHighlight: [23] },
                action: Action.NonDigitCharacter
            });
            return items;
        }

        const digit: number = +s.charAt(index);
        if (num > ~~(max / 10)) {
            const value = (sign === 1) ? max : min;
            const action = (sign === 1) ? Action.BiggerThanMax : Action.LessThanMin;
            items.push({
                data: { index, sign, num: value, linesToHighlight: [25] },
                action
            });
            return items;
        }

        if (num === ~~(max / 10)) {
            if (sign === 1) {
                if (digit > (max % 10)) {
                    items.push({
                        data: { index, sign, num: max, linesToHighlight: [30] },
                        action: Action.BiggerThanMax
                    });
                    return items;
                }
            } else if (sign === -1) {
                if (digit * -1 < (min % 10)) {
                    items.push({
                        data: { index, sign, num: min, linesToHighlight: [32] },
                        action: Action.LessThanMin
                    });
                    return items;
                }
            }
        }

        num = num * 10 + digit;

        items.push({
            data: { index, sign, num, linesToHighlight: [37] },
            action: Action.Accumulate
        });
    }

    items.push({
        data: { index, sign, num: num * sign, linesToHighlight: [40] },
        action: Action.NumMultiplySign
    });

    return items;
};
