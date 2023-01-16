export const formula = `
function levelOrder(root: TreeNode | null): number[][] {

    const result: number[][] = [];

    function dfs(node: TreeNode | null, level: number) {
        if (node === null) {
            return;
        }
        if (result.length === level) {
            result.push([]);
        }
        result[level].push(node.val);
        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }

    dfs(root, 0);
    return result;
};`
