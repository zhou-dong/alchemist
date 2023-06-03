import { TextSphere } from "../../_commons/sphere/text-sphere.interface";
import TreeNode from "../nodes/v2/node";

export default class SegmentTreeNode extends TreeNode<number> {
    lower: number;
    upper: number;

    constructor(
        value: TextSphere<number>,
        lower: number,
        upper: number,
        index?: number
    ) {
        super(value, index);
        this.lower = lower;
        this.upper = upper;
    }

}
