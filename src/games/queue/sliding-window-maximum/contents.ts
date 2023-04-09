export const title = "Sliding Window Maximum";

export const formula = `function maxSlidingWindow(nums: number[], k: number): number[] {

    interface Item {
        value: number;
        index: number;
    }

    const deque: Item[] = [];

    for (let i = 0; i < k; i++) {
        const item: Item = { value: nums[i], index: i};
        while (deque.length > 0 && item.value >= deque[deque.length - 1].value) {
            deque.pop();
        }
        deque.push(item);
    }

    const result: number[] = [deque[0].value];
    for (let i = k; i < nums.length; i++) {
        const item: Item = { value: nums[i], index: i};
        while (deque.length > 0 &&  item.value >= deque[deque.length - 1].value) {
            deque.pop();
        }
        deque.push(item);
        while (deque[0].index <= i -k) {
            deque.shift();
        }
        result.push(deque[0].value);
    }

    return result;
};`;

export const description = `You are given an array of integers **nums**, 
there is a sliding window of size **k** which is moving from the very left of the array to the very right. 
You can only see the **k** numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.`;

export const solution = ``;

export const usecases = '';

export const example = ``;
