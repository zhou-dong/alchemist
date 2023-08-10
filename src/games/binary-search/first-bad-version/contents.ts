export const title = 'First Bad Version';

export const formula = `/**
* The knows API is defined in the parent class Relation.
* isBadVersion(version: number): boolean {
*     ...
* };
*/

var solution = function (isBadVersion: any) {

   return function (n: number): number {
       let [left, right] = [1, n];

       while (left < right) {
           const mid = left + Math.floor((right - left) / 2);
           if (isBadVersion(mid)) {
               right = mid;
           } else {
               left = mid + 1;
           }
       }

       return left;
   };
};`;

export const description = `
You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
`;

export const usecases = '';
