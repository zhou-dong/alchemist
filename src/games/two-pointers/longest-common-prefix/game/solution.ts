export enum Solution {
    HorizontalScanning = "Horizontal Scanning",
    VerticalScanning = "Vertical Scanning",
    DivideAndConquer = "Divide and Conquer",
    BinarySearch = "Binary Search"
}

export const getRandomeSolution = () => {
    const solutions = [
        Solution.HorizontalScanning,
        Solution.VerticalScanning,
        Solution.DivideAndConquer,
        Solution.BinarySearch
    ];

    const index = Math.floor(Math.random() * solutions.length);
    return solutions[index];
}

export const HorizontalScanningSolution = `function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
        return "";
    }

    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        prefix = lcp(prefix, strs[i]);
        if (prefix.length === 0) {
            return "";
        }
    }
    return prefix;
}

function lcp(str1: string, str2: string): string {
    let index = 0;
    while (
        index < str1.length &&
        index < str2.length &&
        str1.charAt(index) === str2.charAt(index)
    ) {
        index++;
    }
    return str1.substring(0, index);
}`;

export const VerticalScanningSolution = `function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
        return "";
    }

    let prefix = "";
    for (let i = 0; i < strs[0].length; i++) {
        for (let j = 0; j < strs.length; j++) {
            if (strs[0].charAt(i) !== strs[j].charAt(i)) {
                return prefix;
            }
        }
        prefix += strs[0].charAt(i);
    }
    return prefix;
};`

export const DivideAndConquerSolution = `function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
        return "";
    }
    return recurse(strs, 0, strs.length - 1);
}

function recurse(strs: string[], start: number, end: number): string {
    if (start === end) {
        return strs[start];
    }
    const mid = start + Math.floor((end - start) / 2);
    const lcpLeft = recurse(strs, start, mid);
    const lcpRight = recurse(strs, mid + 1, end);
    return lcp(lcpLeft, lcpRight);
}

function lcp(str1: string, str2: string): string {
    let index = 0;
    while (
        index < str1.length &&
        index < str2.length &&
        str1.charAt(index) === str2.charAt(index)
    ) {
        index++;
    }
    return str1.substring(0, index);
}`;

export const BinarySearchSolution = `function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
        return "";
    }

    const minLength = strs.reduce(
        (accumulator, current) => Math.min(accumulator, current.length),
        strs[0].length
    );

    let low = 0, high = minLength;
    while (low < high) {
        const mid = low + Math.floor((high - low + 1) / 2);
        if (isCommonPrefix(strs, mid)) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }

    return strs[0].substring(0, low);
}

function isCommonPrefix(strs: string[], length: number): boolean {
    for (let i = 1; i < strs.length; i++) {
        for (let j = 0; j < length; j++) {
            if (strs[0].charAt(j) !== strs[i].charAt(j)) {
                return false;
            }
        }
    }
    return true;
}`;
