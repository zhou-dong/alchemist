export const title = "Verify Preorder Serialization of a Binary Tree";

export const formula = `function isValidSerialization(preorder: string): boolean {

    const stack: string[] = [];

    function eliminate() {
        while (
            stack.length >= 3 &&
            stack[stack.length - 1] === "#" &&
            stack[stack.length - 2] === "#" &&
            stack[stack.length - 3] !== "#"
        ) {
            stack.pop();
            stack.pop();
            stack.pop();
            stack.push("#");
        }
    }

    preorder.split(",").forEach(node => {
        stack.push(node);
        eliminate();
    })

    return stack.length === 1 && stack.pop() === "#";
};`

export const description = `
One way to serialize a binary tree is to use **preorder traversal**. 
When we encounter a non-null node, we record the node's value. If it is a null node, we record using a sentinel value such as ***'#'***.

Given a string of comma-separated values **preorder**, return **true** if it is a correct preorder traversal serialization of a binary tree.
`;

export const solution = ``;

export const usecases = '';

export const example = ``;
