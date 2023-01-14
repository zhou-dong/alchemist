export const title = "Convert Sorted List to Binary Search Tree";

export const formula = `/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function sortedListToBST(head: ListNode | null): TreeNode | null {

    function preorder(left: ListNode | null, right: ListNode | null): TreeNode | null {
        if (left === right) {
            return null;
        }
        const mid = findMedian(left, right);
        const node = new TreeNode(mid.val);
        node.left = preorder(left, mid);
        node.right = preorder(mid.next, right);
        return node;
    }

    function findMedian(left: ListNode | null, right: ListNode | null): ListNode | null {
        let slow = left;
        let fast = left;
        while (fast !== right && fast.next !== right) {
            fast = fast.next;
            fast = fast.next;
            slow = slow.next;
        }
        return slow;
    }

    return preorder(head, null);
};`;

export const description = `
Given the **head** of a singly linked list where elements are sorted in **ascending order**, convert it to a 
**height-balanced** binary search tree.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;
