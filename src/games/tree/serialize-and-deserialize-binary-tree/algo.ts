import TreeNode from "../../../data-structures/tree/node";

export enum Stage {
    Serialize, Deserialize
}

export enum Place {
    Pre, Post
}

export enum Direction {
    Left, Right
}

export interface Step {
    i?: number;
    stage: Stage;
    place: Place;
    direction?: Direction;
    node?: TreeNode<string>;
    values: string[];
}

export function buildSteps(root?: TreeNode<string>): Step[] {
    const steps: Step[] = [];
    const nodes: (TreeNode<string> | undefined)[] = [];

    function serialize(root: TreeNode<string>): string {

        const result: string[] = [];
        function preorder(node?: TreeNode<string>, direction?: Direction) {

            if (!node) {
                result.push("#");
                nodes.push(node);
                steps.push({ stage: Stage.Serialize, values: [...result], node, place: Place.Pre, direction, });
                return;
            }

            nodes.push(node);
            result.push(node.val.value + "");
            steps.push({ stage: Stage.Serialize, values: [...result], node, place: Place.Pre, direction, });

            preorder(node.left, Direction.Left);
            preorder(node.right, Direction.Right);
            steps.push({ stage: Stage.Serialize, values: [...result], node, place: Place.Post, direction, });
        }

        preorder(root);
        return result.join(",");
    };

    function deserialize(data: string): TreeNode<string> | undefined {

        let i = 0;
        function preorder(array: string[], direction?: Direction): TreeNode<string> | undefined {
            const node = nodes[i];
            steps.push({ stage: Stage.Deserialize, values: array, node, place: Place.Pre, i, direction });

            const value = array[i];
            i += 1;
            if (!value || value === "#") {
                return undefined;
            }


            preorder(array, Direction.Left); // left
            preorder(array, Direction.Right); // right
            return node;
        }

        return preorder(data.split(","));
    }

    if (root) {
        const str = serialize(root);
        deserialize(str);
    }

    return steps;
}
