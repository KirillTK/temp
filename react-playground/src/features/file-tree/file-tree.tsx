import { FC, ReactNode, useCallback } from 'react';
import { getFileTree, sortTree, TreeNode, TreeType } from './helpers/file-tree-builder';

const FileView = ({ name }: { name: string }) => {
  return <p style={{ color: 'red', textAlign: 'left' }}>{name}</p>;
};

enum Icons {
  FOLDER = '📁',
}

const FolderView = ({ folder }: { folder: TreeNode }) => {
  return (
    <div style={{ textAlign: 'left' }}>
      <p>
        {Icons.FOLDER}
        {folder.name}
      </p>
      <div style={{ marginLeft: 20 }}>
        {(folder.children || []).map((item) => {
       
          const key = `${folder.name}-${item.name}`;

          const paths =
            item.type === TreeType.FILE ? (
              <FileView name={item.name} key={key} />
            ) : (
              <FolderView folder={item} key={key} />
            );

          return paths;
        })}
      </div>
    </div>
  );
};

interface FileTreeProps {
  items: string[];
}

export const FileTree: FC<FileTreeProps> = ({ items }) => {
  const tree = sortTree(getFileTree(items));

  console.log(tree, 'tree');

  const renderTreeNode = useCallback((renderTree: TreeNode[]): ReactNode => {
    return renderTree.map((treeNode) => {
      return treeNode.type === TreeType.FILE ? (
        <FileView name={treeNode.name} />
      ) : (
        <FolderView folder={treeNode} />
      );
    });
  }, []);

  return <div>{renderTreeNode(tree)}</div>;
};
