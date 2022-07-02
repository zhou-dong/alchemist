import { Node } from "../_components/binary-tree";

const random = (max: number) => Math.floor(Math.random() * max);

const tree1 = (): Node => {
    const root = new Node("F", true);
    root.left = new Node("B");
    root.left.left = new Node("A");
    root.left.right = new Node("D");
    root.left.right.left = new Node("C");
    root.left.right.right = new Node("E");

    root.right = new Node("G");
    root.right.right = new Node("I");
    root.right.right.left = new Node("H");

    return root;
};

const tree2 = (): Node => {
    const root = new Node("6", true);
    root.left = new Node("2");
    root.left.left = new Node("1");
    root.left.right = new Node("4");
    root.left.right.left = new Node("3");
    root.left.right.right = new Node("5");

    root.right = new Node("7");
    root.right.right = new Node("9");
    root.right.right.left = new Node("8");

    return root;
};

const tree3 = (): Node => {
    const root = new Node("G", true);
    root.left = new Node("D");
    root.left.left = new Node("B");
    root.left.left.left = new Node("A");
    root.left.left.right = new Node("C");
    root.left.right = new Node("F");
    root.left.right.left = new Node("E");
    // root.left.right.right = new Node("F");

    root.right = new Node("J");
    root.right.left = new Node("I");
    root.right.left.left = new Node("H");
    root.right.right = new Node("L");
    root.right.right.left = new Node("K");
    root.right.right.right = new Node("M");

    return root;
};

export const createTree = (): Node => {
    const trees: Node[] = [tree1(), tree2(), tree3()];
    const index = random(trees.length);
    return trees[index];
};
