export enum Action {
    Left, Right
}

export interface Item {
    action: Action;
    left: number;
    right: number;
    area: number;
    max: number;
}

export function maxArea(height: number[]): Item[] {

    const items: Item[] = [];

    let left = 0;
    let right = height.length - 1;
    let max = 0;

    while (left < right) {

        const area = Math.min(height[left], height[right]) * (right - left);

        max = Math.max(max, area);

        if (height[left] < height[right]) {
            items.push({ left, right, area, max, action: Action.Left });
            left++;
        } else {
            items.push({ left, right, area, max, action: Action.Right });
            right--
        }
    }

    items.push({ left, right, area: 0, max, action: Action.Right });

    return items;
};
