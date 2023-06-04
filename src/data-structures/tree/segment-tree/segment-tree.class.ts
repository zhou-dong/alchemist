import SegmentTreeNode from "./segment-tree-node";
import ISegmentTree from "./segment-tree.interface";
import { wait } from "../../_commons/utils";

export default class SegmentTree implements ISegmentTree {

    private root?: SegmentTreeNode;

    private normalSphereColor;
    private enabledSphereColor;

    constructor(
        normalSphereColor: string,
        enabledSphereColor: string,
    ) {
        this.normalSphereColor = normalSphereColor;
        this.enabledSphereColor = enabledSphereColor;
    }

    async build(nums: number[], duration: number): Promise<void> {
        this.root = await this.buildTree(nums, 0, nums.length - 1);
    }

    // TODO
    private async buildTree(nums: number[], start: number, end: number): Promise<SegmentTreeNode> {
        if (start === end) {

        }

        const mid = Math.floor((start + end) / 2);
        const left = await this.buildTree(nums, start, mid);
        const right = await this.buildTree(nums, mid + 1, end);

        return Promise.resolve({} as any);
    }

    update(index: number, value: number, duration: number): Promise<void> {
        return this.updateTree(this.root, index, value, duration);
    }

    private async updateTree(node: SegmentTreeNode | undefined, index: number, value: number, duration: number): Promise<void> {
        if (node === undefined) {
            return;
        }

        node.value.sphereColor.setColor(this.enabledSphereColor);
        await wait(duration);

        if (node.start === index && node.end === index) {
            node.value.value = value;
            node.value.sphereColor.setColor(this.normalSphereColor);
            return;
        }

        const mid = Math.floor((node.start + node.end) / 2);
        if (index <= mid) {
            await this.updateTree(node.left, index, value, duration);
        } else {
            await this.updateTree(node.right, index, value, duration);
        }

        node.value.value = (node.left?.value.value || 0) + (node.right?.value.value || 0);
        node.value.sphereColor.setColor(this.normalSphereColor);

        return wait(duration);
    }

    query(left: number, right: number, duration: number): Promise<number | undefined> {
        return this.queryRange(this.root, left, right, duration);
    }

    private async queryRange(node: SegmentTreeNode | undefined, left: number, right: number, duration: number): Promise<number | undefined> {
        if (node === undefined) {
            return;
        }

        node.value.sphereColor.setColor(this.enabledSphereColor);
        await wait(duration);

        if (node.start === left && node.end === right) {
            node.value.sphereColor.setColor(this.normalSphereColor);
            return node.value.value;
        }

        const mid = Math.floor((node.start + node.end) / 2);
        let value: number | undefined = undefined;

        if (right <= mid) {
            value = await this.queryRange(node.left, left, right, duration);
        } else if (left > mid) {
            value = await this.queryRange(node.right, left, right, duration);
        } else {
            const a = await this.queryRange(node.left, left, mid, duration) || 0;
            const b = await this.queryRange(node.right, mid + 1, right, duration) || 0;
            value = a + b;
        }

        node.value.sphereColor.setColor(this.normalSphereColor);
        await wait(duration);
        return value;
    }
}
