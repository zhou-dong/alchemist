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
    connection: Connection
}

export function buildActions(node1?: LinkedListNode<number>, node2?: LinkedListNode<number>): Action[] {
    const actions: Action[] = [];

    function mergeTwoLists(node1?: LinkedListNode<number>, node2?: LinkedListNode<number>): LinkedListNode<number> | undefined {

        if (!node1) {
            actions.push({ node1, node2, connection: Connection.None, order: Order.PostOrder });
            return node2;
        }

        if (!node2) {
            actions.push({ node1, node2, connection: Connection.None, order: Order.PostOrder });
            return node1;
        }

        actions.push({ node1, node2, connection: Connection.None, order: Order.PreOrder });

        if (node1.data < node2.data) {
            node1.next = mergeTwoLists(node1.next, node2);
            actions.push({ node1, node2, connection: Connection.One, order: Order.PostOrder });
            return node1;
        }

        node2.next = mergeTwoLists(node1, node2.next);
        actions.push({ node1, node2, connection: Connection.Two, order: Order.PostOrder });
        return node2;
    };

    mergeTwoLists(node1, node2);
    return actions;
}
