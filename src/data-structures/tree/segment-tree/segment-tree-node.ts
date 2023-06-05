import { TextSphere } from "../../_commons/sphere/text-sphere.interface";
import TreeNode from "../nodes/v2/node";

export default class SegmentTreeNode extends TreeNode<number> {
    start: number;
    end: number;
    left?: SegmentTreeNode;
    right?: SegmentTreeNode;

    constructor(
        value: TextSphere<number>,
        start: number,
        end: number,
        index?: number
    ) {
        super(value, index);
        this.start = start;
        this.end = end;
    }
}
