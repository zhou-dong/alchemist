import { TextSphere } from "../../_commons/sphere/text-sphere.interface";
import TreeNode from "../nodes/v2/node";

export default class SegmentTreeNode<T> extends TreeNode<T> {
    lower: T;
    upper: T;

    constructor(
        value: TextSphere<T>,
        lower: T,
        upper: T,
        index?: number
    ) {
        super(value, index);
        this.lower = lower;
        this.upper = upper;
    }

}
