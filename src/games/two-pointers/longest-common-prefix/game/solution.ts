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
