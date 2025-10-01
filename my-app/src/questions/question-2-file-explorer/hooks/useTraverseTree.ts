import {type ExplorerNode } from "../types";

function useTraverseTree() {
  const insertNode = (
    tree: ExplorerNode,
    folderId: string | number,
    item: string,
    isFolder: boolean
  ): ExplorerNode => {
    if (tree.id === folderId && tree.isFolder) {
      return {
        ...tree,
        items: [
          ...tree.items,
          {
            id: new Date().getTime(),
            name: item,
            isFolder,
            items: [],
          },
        ],
      };
    }

    return {
      ...tree,
      items: tree.items.map((child) =>
        insertNode(child, folderId, item, isFolder)
      ),
    };
  };

  return { insertNode };
}

export default useTraverseTree;
