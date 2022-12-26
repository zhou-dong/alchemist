import { wait } from '../_commons/utils';

interface TreeNode<T> {
    val: Promise<T>;
    left: Promise<TreeNode<T> | undefined>;
    right: Promise<TreeNode<T> | undefined>;
}

export default class TreeNodeImpl<T> implements TreeNode<T> {

    _val: T;
    _left?: TreeNode<T>;
    _right?: TreeNode<T>;

    constructor(val: T) {
        this._val = val;
    }

    get val() {
        return this.implGetVal();
    }

    get left() {
        return this.implGetLeft();
    }

    get right() {
        return this.implGetRight();
    }

    private async implGetVal(): Promise<T> {
        return Promise.resolve(this._val);
    }

    private async implGetLeft(): Promise<TreeNode<T> | undefined> {
        return;
    }

    private async implGetRight(): Promise<TreeNode<T> | undefined> {
        return;
    }
}

