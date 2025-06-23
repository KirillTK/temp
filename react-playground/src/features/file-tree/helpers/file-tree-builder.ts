export enum TreeType {
  FILE = 'file',
  FOLDER = 'folder',
}

export type TreeNode = {
  name: string;
  type: TreeType;
  children?: TreeNode[];
};

export function getFileTree(paths: string[]): TreeNode[] {
  const root: TreeNode[] = [];

  for (const path of paths) {
    const parts = path.split('/').filter(Boolean); // remove empty parts
    let currentLevel = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;

      let existingNode = currentLevel.find((node) => node.name === part);

      if (!existingNode) {
        existingNode = {
          name: part,
          type: isFile ? TreeType.FILE : TreeType.FOLDER,
          ...(isFile ? {} : { children: [] }),
        } as TreeNode;

        currentLevel.push(existingNode);
      }

      if (!isFile) {
        currentLevel = existingNode.children!;
      }
    });
  }

  return root;
}

export function sortTree(tree: TreeNode[]): TreeNode[] {
  return structuredClone(tree)
    .sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === TreeType.FOLDER ? -1 : 1;
      }

      return a.name.localeCompare(b.name);
    })
    .map((node) =>
      node.type === TreeType.FOLDER && node.children
        ? { ...node, children: sortTree(node.children) }
        : node
    );
}
