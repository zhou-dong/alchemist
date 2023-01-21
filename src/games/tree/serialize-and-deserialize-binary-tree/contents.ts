export const title = "Serialize and Deserialize Binary Tree";

export const formula = `function serialize(root: TreeNode | null): string {

    const result: string[] = [];
    function preorder (node: TreeNode | null) {
        if(!node) {
            result.push("#");
            return;
        }
        result.push(node.val + "");
        preorder(node.left);
        preorder(node.right);
    }
    
    preorder(root);
    return result.join(",");
};

function deserialize(data: string): TreeNode | null {
    
    let index = 0;
    function preorder(array: string[]) : TreeNode | null {
        const value = array[index];
        index += 1;
        if (!value || value === "#") {
            return null;
        }
        const node = new TreeNode(+value);
        node.left = preorder(array);
        node.right = preorder(array);
        return node;
    }

    return preorder(data.split(","));
};`;

export const description = `
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, 
or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. 
There is no restriction on how your serialization/deserialization algorithm should work. 
You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;
