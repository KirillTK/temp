export class TreeNode {
  value: number;
  leftNode: TreeNode | null;
  rightNode: TreeNode | null;


  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.value = (val===undefined ? 0 : val)
    this.leftNode = (left===undefined ? null : left)
    this.rightNode = (right===undefined ? null : right)
  }
}



// recursion
function maxDepth(root: TreeNode | null): number {
  if(root === null) return 0; 

  const leftNode = maxDepth(root.leftNode);
  const rightNode = maxDepth(root.rightNode);

  return Math.max(leftNode, rightNode) + 1;
};


// STACK
function maxDepth2(root: TreeNode | null): number {
  if (root === null) return 0;

  const stack: [TreeNode, number][] = [[root, 1]];
  let maxDepth = 0;

  while (stack.length > 0) {
      const [node, depth] = stack.pop()!;
      maxDepth = Math.max(maxDepth, depth);

      if (node.leftNode) stack.push([node.leftNode, depth + 1]);
      if (node.rightNode) stack.push([node.rightNode, depth + 1]);
  }

  return maxDepth;
}



const tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));

console.log(maxDepth(tree));