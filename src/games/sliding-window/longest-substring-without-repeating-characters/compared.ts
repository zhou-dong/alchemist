export interface Range {
    left: number;
    right: number;
}

export interface LeftProps {
    value: number;
    show: boolean;
}

export interface MaxProps {
    value: number;
    show: boolean;
}

export interface Compared {
    chars: string[];
    indices: number[];
    lefts: LeftProps[];
    maxs: MaxProps[];
    ranges: Range[];
    maps: (Map<string, number>)[];
}

export const emptyCompared: Compared = {
    chars: [],
    indices: [],
    lefts: [],
    maxs: [],
    ranges: [],
    maps: []
}

export const buildCompared = (input: string): Compared => {

    const chars: string[] = [];
    const indices: number[] = [];
    const lefts: LeftProps[] = [];
    const maxs: MaxProps[] = [];
    const ranges: Range[] = [];
    const maps: (Map<string, number>)[] = [];

    let max = 1;
    let left = 0;
    const map: Map<string, number> = new Map();
    for (let i = 0; i < input.length; i++) {
        indices.push(i);

        const character = input.charAt(i);
        chars.push(character);

        const mapValue: number | undefined = map.get(character);
        if (mapValue !== undefined) {
            left = Math.max(left, mapValue + 1);
        }

        lefts.push({ value: left, show: false });
        map.set(character, i);
        maps.push(new Map(map));

        const newMax = i - left + 1;
        if (newMax > max) {
            max = newMax;
            ranges.push({ left, right: i });
        } else {
            if (ranges.length === 0) {
                ranges.push({ left: 0, right: 0 });
            } else {
                const previous = ranges[ranges.length - 1];
                ranges.push(previous);
            }
        }

        max = Math.max(max, i - left + 1);
        maxs.push({ value: max, show: false });
    }

    return {
        chars,
        indices,
        lefts,
        maxs,
        ranges,
        maps
    };
}
