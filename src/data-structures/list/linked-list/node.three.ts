import { LinkedListNode as ILinkedListNode } from "./node.interface";
import { Link } from '../link.three';
import { LinkedListBaseNode } from '../list-node-base';

export class LinkedListNode<T> extends LinkedListBaseNode<T> implements ILinkedListNode<T> {
    next?: LinkedListNode<T>;
    linkToNext?: Link<T>;
}
