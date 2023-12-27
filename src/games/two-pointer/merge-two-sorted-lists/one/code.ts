import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";

export enum Connection {
    None, One, Two
}

export enum Order {
    PreOrder, PostOrder
}

export interface Action {
    order: Order;
    node1?: LinkedListNode<number>;
    node2?: LinkedListNode<number>;
    connection: Connection,
    linesToHighlight: number[]
}

export function buildActions(node1?: LinkedListNode<number>, node2?: LinkedListNode<number>): Action[] {
    const actions: Action[] = [];

    function mergeTwoLists(node1?: LinkedListNode<number>, node2?: LinkedListNode<number>): LinkedListNode<number> | undefined {

        if (!node1) {
            actions.push({ node1, node2, connection: Connection.None, order: Order.PostOrder, linesToHighlight: [3] });
            return node2;
        }

        if (!node2) {
            actions.push({ node1, node2, connection: Connection.None, order: Order.PostOrder, linesToHighlight: [7] });
            return node1;
        }

        if (node1.data < node2.data) {

            actions.push({ node1, node2, connection: Connection.None, order: Order.PreOrder, linesToHighlight: [11] });

            node1.next = mergeTwoLists(node1.next, node2);

            actions.push({ node1, node2, connection: Connection.One, order: Order.PostOrder, linesToHighlight: [12] });

            return node1;
        }

        actions.push({ node1, node2, connection: Connection.None, order: Order.PreOrder, linesToHighlight: [16] });

        node2.next = mergeTwoLists(node1, node2.next);

        actions.push({ node1, node2, connection: Connection.Two, order: Order.PostOrder, linesToHighlight: [17] });
        return node2;
    };

    mergeTwoLists(node1, node2);
    return actions;
}


// Definition for singly-linked list.
class ListNode {
    val: number
    next?: ListNode
    constructor(val?: number, next?: ListNode) {
        this.val = (val === undefined ? 0 : val)
        this.next = next;
    }
}

// two pointers solution
export function mergeTwoLists(
    list1?: ListNode, list2?: ListNode
): ListNode | undefined {

    if (!list1) {
        return list2;
    }

    if (!list2) {
        return list1;
    }

    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    }

    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
};