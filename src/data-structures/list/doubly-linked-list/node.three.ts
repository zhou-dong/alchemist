import { DoublyLinkedListNode as ILinkedListNode } from "./node.interface";
import { Link } from '../link.three';
import { LinkedListBaseNode } from '../list-node-base';

export class DoublyLinkedListNode<T> extends LinkedListBaseNode<T> implements ILinkedListNode<T> {

    next?: DoublyLinkedListNode<T>;
    prev?: DoublyLinkedListNode<T>;

    linkToNext?: Link<T>;
    linkToPrev?: Link<T>;
}
